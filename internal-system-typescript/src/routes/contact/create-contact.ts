import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'

import z from 'zod'
import { contacts } from '../../database/schema'

export const createContactRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/contacts',
    {
      schema: {
        tags: ['contacts'],
        summary: 'Create a contact',
        body: z.object({
          userId: z.string().uuid('Invalid user ID'),
          name: z.string().min(5, 'Name must have at least 5 characters.'),
          email: z.string().email('Invalid email address'),
          phone: z.string().min(8, 'Phone number must be at least 8 digits'),
          category: z.enum(['Family', 'Friend', 'Work']),
        }),
        response: {
          201: z
            .object({ contactId: z.uuid() })
            .describe('Contact created success!'),
          409: z.object({ error: z.string() }).optional(),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { userId, name, email, phone, category } = request.body

      try {
        const [contact] = await db
          .insert(contacts)
          .values({
            userId,
            name,
            email,
            phone,
            category,
          })
          .returning()

        if (!contact) {
          throw new Error('Insert did not return a contact')
        }

        return reply.status(201).send({ contactId: contact.id })
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)

        if (
          message.includes('duplicate key value') &&
          message.includes('contacts_email_unique')
        ) {
          return reply
            .status(409)
            .send({ error: 'A contact with this email already exists' })
        }

        return reply.status(500).send({ error: 'Internal server error' })
      }
    },
  )
}
