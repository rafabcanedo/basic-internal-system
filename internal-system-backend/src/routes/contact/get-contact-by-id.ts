import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { contacts } from '../../database/schema'

export const getContactByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/contacts/:id',
    {
      schema: {
        tags: ['contacts'],
        summary: 'Get contact by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            contact: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              phone: z.string(),
              category: z.enum(['Family', 'Friend', 'Work']),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const contactId = request.params.id

      const result = await db
        .select({
          id: contacts.id,
          name: contacts.name,
          email: contacts.email,
          phone: contacts.phone,
          category: contacts.category,
        })
        .from(contacts)
        .where(eq(contacts.id, contactId))

      const contact = result[0]

      if (!contact) {
        return reply.status(404).send({ error: 'Contact not found.' })
      }

      return reply.send({ contact })
    },
  )
}
