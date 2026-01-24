import { describe, test, expect, beforeEach, vi, type Mock } from 'vitest'
import Fastify from 'fastify'
import bcrypt from 'bcrypt'

import { createUserRoute } from './create-user'
import * as dbClient from '../../database/client'
import { users } from '../../database/schema'
import { MOCK_USER, VALID_USER_PAYLOAD } from '../../mocks'
import type { CreateUserPayload, DbMocks } from '../../types'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

vi.mock('../../database/client', () => {
  const returningMock = vi.fn()
  const valuesMock = vi.fn().mockReturnValue({ returning: returningMock })
  const insertMock = vi.fn().mockReturnValue({ values: valuesMock })

  return {
    db: {
      insert: insertMock,
    },
    __mocks: {
      insertMock,
      valuesMock,
      returningMock,
    },
  }
})

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
  },
}))

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const createUser = async (
  app: ReturnType<typeof Fastify>,
  payload: Partial<CreateUserPayload>,
) => {
  return app.inject({
    method: 'POST',
    url: '/users',
    payload,
  })
}

describe('Create User Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(createUserRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('create user with success', async () => {
    const hashMock = bcrypt.hash as unknown as Mock
    hashMock.mockResolvedValue('hashed_password')
    dbMocks.returningMock.mockResolvedValue([MOCK_USER])

    const response = await createUser(app, VALID_USER_PAYLOAD)

    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual({ userId: MOCK_USER.id })
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(dbMocks.insertMock).toHaveBeenCalledWith(users)
  })

  test('should fail with invalid email', async () => {
    const response = await createUser(app, {
      ...VALID_USER_PAYLOAD,
      email: 'invalid-email',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with short name', async () => {
    const response = await createUser(app, {
      ...VALID_USER_PAYLOAD,
      name: 'John',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with short password', async () => {
    const response = await createUser(app, {
      ...VALID_USER_PAYLOAD,
      password: '123',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with short phone', async () => {
    const response = await createUser(app, {
      ...VALID_USER_PAYLOAD,
      phone: '123',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should handle database error', async () => {
    const hashMock = bcrypt.hash as unknown as Mock
    hashMock.mockResolvedValue('hashed_password')
    dbMocks.returningMock.mockResolvedValue([])

    const response = await createUser(app, VALID_USER_PAYLOAD)

    expect(response.statusCode).toBe(500)
  })
})
