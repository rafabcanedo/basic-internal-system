import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { users } from '../../database/schema'
import { ilike, asc, type SQL, and } from 'drizzle-orm'

export const getUsersRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'Get all users',
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(['id', 'name']).optional().default('id'),
          // pagination => offset Pagination
          page: z.coerce.number().optional().default(1),
        }),
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
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query

      const conditions: SQL[] = []

      if (search) {
        conditions.push(ilike(users.name, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            password: users.password,
            phone: users.phone,
          })
          .from(users)
          .orderBy(asc(users[orderBy]))
          .offset((page - 1) * 2)
          .limit(10)
          .where(and(...conditions))
          .groupBy(users.id),
        db.$count(users, and(...conditions)),
      ])

      return reply.send({ users: result, total })
    },
  )
}
