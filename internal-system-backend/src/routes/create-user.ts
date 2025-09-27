import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client'

import z from 'zod'
import { users } from '../database/schema.js'

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
            .min(5, 'Password must be at least 8 characters long'),
          phone: z.string().min(10, 'Phone number must be at least 10 digits'),
        }),
        response: {
          201: z.object({ userId: z.uuid() }).describe('User created success!'),
        },
      },
    },
    async (request, reply) => {
      const nameUser = request.body.name
      const emailUser = request.body.email
      const passwordUser = request.body.password
      const phoneUser = request.body.phone

      const result = await db
        .insert(users)
        .values({
          name: nameUser,
          email: emailUser,
          password: passwordUser,
          phone: phoneUser,
        })
        .returning()

      return reply.status(201).send({ userId: result[0]!.id })
    },
  )
}
