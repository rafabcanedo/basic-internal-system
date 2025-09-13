import fastify from 'fastify'
import { knex } from './database.js'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const user = await knex('users').select('*')

  return user
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ⚙️')
  })
