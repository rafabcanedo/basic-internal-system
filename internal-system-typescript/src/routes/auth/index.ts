import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { loginRoute } from './login'
import { refreshTokenRoute } from './refresh'
import { logoutRoute } from './logout'

export const authRoutes: FastifyPluginAsyncZod = async (server) => {
  server.register(loginRoute)
  server.register(refreshTokenRoute)
  server.register(logoutRoute)
}
