import fastify from 'fastify'
import { env } from './env'
import { getUsersRoute } from './routes/users/get-users'
import { createUserRoute } from './routes/users/create-user'
import { getUserByIdRoute } from './routes/users/get-user-by-id'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import scalarApiReference from '@scalar/fastify-api-reference'
import fastifySwagger from '@fastify/swagger'

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Internal System',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(scalarApiReference, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getUsersRoute)
app.register(createUserRoute)
app.register(getUserByIdRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ⚙️')
  })
