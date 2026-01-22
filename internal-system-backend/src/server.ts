import fastify from 'fastify'
import { env } from './env'
import fastifyCors from '@fastify/cors'
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
import { getCostsRoute } from './routes/costs/get-costs'
import { createCostRoute } from './routes/costs/create-cost'
import { getCostByIdRoute } from './routes/costs/get-cost-by-id'
import { getContactsRoute } from './routes/contact/get-contacts'
import { createContactRoute } from './routes/contact/create-contact'
import { getContactByIdRoute } from './routes/contact/get-contact-by-id'

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

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
  credentials: true,
})

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

app.register(getCostsRoute)
app.register(createCostRoute)
app.register(getCostByIdRoute)

app.register(getContactsRoute)
app.register(createContactRoute)
app.register(getContactByIdRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ⚙️')
  })
