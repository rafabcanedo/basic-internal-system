import fastify from 'fastify'
import { eq } from 'drizzle-orm'
import { env } from './env'
import { db } from './database/client'
import { users } from './database/schema'

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
})

app.get('/users', async (request, reply) => {
  const result = await db.select().from(users)

  return reply.send({ users: result })
})

app.get('/users/:id', async (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const userId = params.id

  const result = await db.select().from(users).where(eq(users.id, userId))

  if (result.length > 0) {
    return { user: result[0] }
  }

  return reply.status(404).send()
})

app.post('/users', async (request, reply) => {
  type Body = {
    name: string
    email: string
    password: string
    phone: string
  }

  const userId = crypto.randomUUID()

  const body = request.body as Body
  const nameUser = body.name
  const emailUser = body.email
  const passwordUser = body.password
  const phoneUser = body.phone

  if (!nameUser || !emailUser || !passwordUser || !phoneUser) {
    return reply.status(400).send({ message: 'Fields are required.' })
  }

  await db.insert(users).values({
    name: nameUser,
    email: emailUser,
    password: passwordUser,
    phone: phoneUser,
  })

  return reply.status(404).send({ userId })
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ⚙️')
  })
