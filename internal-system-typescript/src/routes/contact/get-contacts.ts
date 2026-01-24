import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { contacts } from '../../database/schema'
import { ilike, asc, type SQL, and } from 'drizzle-orm'

export const getContactsRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/contacts',
    {
      schema: {
        tags: ['contacts'],
        summary: 'Get all contacts',
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(['id', 'name']).optional().default('id'),
          // pagination => offset Pagination
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            contacts: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                phone: z.string(),
                category: z.enum(['Family', 'Friend', 'Work']),
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
        conditions.push(ilike(contacts.name, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: contacts.id,
            name: contacts.name,
            email: contacts.email,
            phone: contacts.phone,
            category: contacts.category,
          })
          .from(contacts)
          .orderBy(asc(contacts[orderBy]))
          .offset((page - 1) * 2)
          .limit(10)
          .where(and(...conditions))
          .groupBy(contacts.id),
        db.$count(contacts, and(...conditions)),
      ])

      return reply.send({ contacts: result, total })
    },
  )
}
