import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { costs } from '../../database/schema'

export const createCostRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/costs',
    {
      schema: {
        tags: ['costs'],
        summary: 'Create a cost',
        body: z.object({
          userId: z.string().uuid('Invalid user ID'),
          contactId: z.string().uuid('Invalid contact ID'),
          value: z.string().min(1, 'Value is required'),
          category: z.enum(['Food', 'Payment', 'Entertainment', 'Travel']),
        }),
        response: {
          201: z.object({ costId: z.uuid() }).describe('Cost created success!'),
          404: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { userId, contactId, value, category } = request.body

      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }

      const contactExists = await db.query.contacts.findFirst({
        where: (contacts, { eq }) => eq(contacts.id, contactId),
      })

      if (!contactExists) {
        return reply.status(404).send({ error: 'Contact not found' })
      }

      const [cost] = await db
        .insert(costs)
        .values({
          userId,
          contactId,
          value,
          category,
        })
        .returning()

      if (!cost) {
        throw new Error('Insert did not return a cost')
      }

      return reply.status(201).send({ costId: cost.id })
    },
  )
}
