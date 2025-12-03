import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { users } from '../../database/schema'

export const getUserByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Get users by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              phone: z.string(),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.params.id

      const result = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          phone: users.phone,
        })
        .from(users)
        .where(eq(users.id, userId))

      const user = result[0]

      if (!user) {
        return reply.status(404).send({ error: 'User not found.' })
      }

      return reply.send({ user })
    },
  )
}
