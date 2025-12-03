import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { users } from '../../database/schema'

export const getUsersRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'Get all users',
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          password: users.password,
          phone: users.phone,
        })
        .from(users)

      return reply.send({ users: result })
    },
  )
}
