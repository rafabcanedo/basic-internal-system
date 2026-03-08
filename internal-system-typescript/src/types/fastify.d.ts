import '@fastify/jwt'
import { FastifyRequest, FastifyReply } from 'fastify'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      name: string
    }
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>
  }
}
