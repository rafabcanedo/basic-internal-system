import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { contacts, costs, users } from '../../database/schema'

export const getCostByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/costs/:id',
    {
      schema: {
        tags: ['costs'],
        summary: 'Get cost by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            cost: z.object({
              id: z.string().uuid(),
              userId: z.string().uuid(),
              contactId: z.string().uuid(),
              value: z.string(),
              category: z.enum(['Food', 'Payment', 'Entertainment', 'Travel']),
              userName: z.string(),
              contactName: z.string(),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const costId = request.params.id

      const result = await db
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
        .where(eq(costs.id, costId))

      const cost = result[0]

      if (!cost) {
        return reply.status(404).send({ error: 'Cost not found.' })
      }

      return reply.send({ cost })
    },
  )
}
