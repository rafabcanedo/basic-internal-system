import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { users } from '../database/schema'

export const getUserByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Get users by ID',
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.uuid(),
              name: z.string(),
              email: z.string().email(),
              phone: z.string(),
            }),
          }),
          404: z.null().describe('User not found'),
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

      if (result.length === 0) {
        return reply.status(404).send(null)
      }

      return { user: result[0]! }
    },
  )
}
