import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import { refreshTokens } from '../../database/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

export const refreshTokenRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/auth/refresh',
    {
      schema: {
        tags: ['auth'],
        summary: 'Refresh access token',
        response: {
          200: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const refreshTokenFromCookie = request.cookies.refresh_token

      if (!refreshTokenFromCookie) {
        return reply.status(401).send({ message: 'Refresh token not found' })
      }

      const allTokens = await db.select().from(refreshTokens)

      const tokenRecord = await Promise.all(
        allTokens.map(async (record) => {
          const isMatch = await bcrypt.compare(
            refreshTokenFromCookie,
            record.hashedToken,
          )
          return isMatch ? record : null
        }),
      ).then((results) => results.find((r) => r !== null))

      if (!tokenRecord) {
        return reply.status(401).send({ message: 'Invalid refresh token' })
      }

      if (new Date() > tokenRecord.expiresAt) {
        await db
          .delete(refreshTokens)
          .where(eq(refreshTokens.id, tokenRecord.id))
        return reply.status(401).send({ message: 'Refresh token expired' })
      }

      await db.delete(refreshTokens).where(eq(refreshTokens.id, tokenRecord.id))

      const newAccessToken = await reply.jwtSign(
        {},
        { sign: { sub: tokenRecord.userId, expiresIn: '15m' } },
      )

      const newRefreshToken = crypto.randomUUID()
      const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, 10)

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 2)

      await db.insert(refreshTokens).values({
        userId: tokenRecord.userId,
        hashedToken: newHashedRefreshToken,
        expiresAt,
      })

      reply.setCookie('access_token', newAccessToken, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })

      reply.setCookie('refresh_token', newRefreshToken, {
        path: '/auth/refresh',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })

      return reply
        .status(200)
        .send({ message: 'Tokens refreshed successfully' })
    },
  )
}
