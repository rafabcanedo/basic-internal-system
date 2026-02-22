import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import { users, refreshTokens } from '../../database/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/auth/login',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate user and get tokens',
        body: z.object({
          email: z.string().email('Invalid email address'),
          password: z.string().min(1, 'Password is required'),
        }),
        response: {
          200: z.object({
            message: z.string(),
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string(),
            }),
          }),
          401: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

      if (!user) {
        return reply.status(401).send({ message: 'Invalid credentials' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid credentials' })
      }

      const accessToken = await reply.jwtSign(
        { name: user.name },
        { sign: { sub: user.id, expiresIn: '15m' } },
      )

      const refreshToken = crypto.randomUUID()
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 2)

      await db.insert(refreshTokens).values({
        userId: user.id,
        hashedToken: hashedRefreshToken,
        expiresAt,
      })

      reply.setCookie('access_token', accessToken, {
        path: '/',
        httpOnly: true,
        secure: false, // Change for true in production (HTTPS)
        sameSite: 'lax',
      })

      reply.setCookie('refresh_token', refreshToken, {
        path: '/auth/refresh',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })

      return reply.status(200).send({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
    },
  )
}
