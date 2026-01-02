import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { costs, users, contacts } from '../../database/schema'
import { ilike, asc, type SQL, and, eq } from 'drizzle-orm'

export const getCostsRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/costs',
    {
      schema: {
        tags: ['costs'],
        summary: 'Get all costs',
        querystring: z.object({
          search: z.string().optional(),
          category: z
            .enum(['Food', 'Payment', 'Entertainment', 'Travel'])
            .optional(),
          orderBy: z.enum(['id', 'value', 'category']).optional().default('id'),
          order: z.enum(['asc', 'desc']).optional().default('asc'),
          // pagination => offset Pagination
          page: z.coerce.number().min(1).optional().default(1),
          pageSize: z.coerce.number().min(1).max(100).optional().default(10),
        }),
        response: {
          200: z.object({
            costs: z.array(
              z.object({
                id: z.string().uuid(),
                userId: z.string().uuid(),
                contactId: z.string().uuid(),
                value: z.string(),
                category: z.enum([
                  'Food',
                  'Payment',
                  'Entertainment',
                  'Travel',
                ]),
                userName: z.string(),
                contactName: z.string(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page, pageSize } = request.query

      const conditions: SQL[] = []

      if (search) {
        conditions.push(ilike(costs.value, `%${search}%`))
        conditions.push(ilike(costs.category, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: costs.id,
            userId: costs.userId,
            contactId: costs.contactId,
            value: costs.value,
            category: costs.category,
            userName: users.name,
            contactName: contacts.name,
          })
          .from(costs)
          .innerJoin(users, eq(costs.userId, users.id))
          .innerJoin(contacts, eq(costs.contactId, contacts.id))
          .orderBy(asc(costs[orderBy]))
          .offset((page - 1) * pageSize)
          .limit(pageSize)
          .where(and(...conditions)),
        db.$count(costs, and(...conditions)),
      ])

      return reply.send({ costs: result, total })
    },
  )
}
