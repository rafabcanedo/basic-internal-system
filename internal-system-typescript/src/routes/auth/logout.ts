import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import { refreshTokens } from '../../database/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import bcrypt from 'bcrypt'

export const logoutRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/auth/logout',
    {
      schema: {
        tags: ['auth'],
        summary: 'Logout user (revoke refresh token and clear cookies)',
        response: {
          200: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const refreshTokenFromCookie = request.cookies.refresh_token

      if (refreshTokenFromCookie) {
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

        if (tokenRecord) {
          await db
            .delete(refreshTokens)
            .where(eq(refreshTokens.id, tokenRecord.id))
        }
      }

      reply.clearCookie('access_token', { path: '/' })
      reply.clearCookie('refresh_token', { path: '/auth/refresh' })

      return reply.status(200).send({ message: 'Logged out' })
    },
  )
}
