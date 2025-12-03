import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client'

import z from 'zod'
import { users } from '../../database/schema'
import bcrypt from 'bcrypt'

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'Create a user',
        body: z.object({
          name: z.string().min(5, 'Name must have at least 5 characters.'),
          email: z.string().email('Invalid email address'),
          password: z
            .string()
            .min(5, 'Password must be at least 5 characters long'),
          phone: z.string().min(8, 'Phone number must be at least 8 digits'),
        }),
        response: {
          201: z.object({ userId: z.uuid() }).describe('User created success!'),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, phone } = request.body

      const hashedPassword = await bcrypt.hash(password, 10)

      const [user] = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
          phone,
        })
        .returning()

      if (!user) {
        throw new Error('Insert did not return a user')
      }

      return reply.status(201).send({ userId: user.id })
    },
  )
}
