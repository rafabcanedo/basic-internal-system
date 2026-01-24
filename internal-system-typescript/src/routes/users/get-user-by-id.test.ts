import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { getUserByIdRoute } from './get-user-by-id'
import * as dbClient from '../../database/client'
import { users } from '../../database/schema'
import { MOCK_USER } from '../../mocks'
import type { DbMocks } from '../../types'

vi.mock('../../database/client', () => {
  const whereMock = vi.fn()
  const fromMock = vi.fn().mockReturnValue({ where: whereMock })
  const selectMock = vi.fn().mockReturnValue({ from: fromMock })

  return {
    db: {
      select: selectMock,
    },
    __mocks: {
      selectMock,
      fromMock,
      whereMock,
    },
  }
})

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const getUserById = async (app: ReturnType<typeof Fastify>, userId: string) => {
  return app.inject({
    method: 'GET',
    url: `/users/${userId}`,
  })
}

describe('Get User By ID Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getUserByIdRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('get user by id with success', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_USER])

    const response = await getUserById(app, MOCK_USER.id)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ user: MOCK_USER })
    expect(dbMocks.selectMock).toHaveBeenCalledWith({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
    })
    expect(dbMocks.fromMock).toHaveBeenCalledWith(users)
  })

  test('should return 404 when user not found', async () => {
    dbMocks.whereMock.mockResolvedValue([])

    const response = await getUserById(app, MOCK_USER.id)

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'User not found.' })
  })

  test('should fail with invalid uuid', async () => {
    const response = await getUserById(app, 'invalid-uuid')

    expect(response.statusCode).toBe(400)
  })
})
