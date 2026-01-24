import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { getUsersRoute } from './get-users'
import * as dbClient from '../../database/client'
import { users } from '../../database/schema'
import { MOCK_USER } from '../../mocks'
import type { DbMocks } from '../../types'

vi.mock('../../database/client', () => {
  const groupByMock = vi.fn()
  const whereMock = vi.fn().mockReturnValue({ groupBy: groupByMock })
  const limitMock = vi.fn().mockReturnValue({ where: whereMock })
  const offsetMock = vi.fn().mockReturnValue({ limit: limitMock })
  const orderByMock = vi.fn().mockReturnValue({ offset: offsetMock })
  const fromMock = vi.fn().mockReturnValue({ orderBy: orderByMock })
  const selectMock = vi.fn().mockReturnValue({ from: fromMock })
  const countMock = vi.fn()

  return {
    db: {
      select: selectMock,
      $count: countMock,
    },
    __mocks: {
      selectMock,
      fromMock,
      orderByMock,
      offsetMock,
      limitMock,
      whereMock,
      groupByMock,
      countMock,
      insertMock: vi.fn(),
      valuesMock: vi.fn(),
      returningMock: vi.fn(),
    } satisfies DbMocks,
  }
})

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const getUsers = async (
  app: ReturnType<typeof Fastify>,
  query: Record<string, string | number | undefined> = {},
) => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()
  const url = queryString ? `/users?${queryString}` : '/users'

  return app.inject({
    method: 'GET',
    url,
  })
}

describe('Get Users Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getUsersRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('should list users with default query params', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_USER])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getUsers(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      users: [MOCK_USER],
      total: 1,
    })

    expect(dbMocks.selectMock).toHaveBeenCalledWith({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      phone: users.phone,
    })
    expect(dbMocks.fromMock).toHaveBeenCalledWith(users)
  })

  test('should filter users by search term', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_USER])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getUsers(app, { search: 'John' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      users: [MOCK_USER],
      total: 1,
    })

    expect(dbMocks.whereMock).toHaveBeenCalled()
  })

  test('should order users by name', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_USER])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getUsers(app, { orderBy: 'name' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      users: [MOCK_USER],
      total: 1,
    })

    expect(dbMocks.orderByMock).toHaveBeenCalled()
  })

  test('should paginate users with page param', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_USER])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getUsers(app, { page: 2 })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      users: [MOCK_USER],
      total: 1,
    })

    expect(dbMocks.offsetMock).toHaveBeenCalled()
  })

  test('should return empty list when no users found', async () => {
    dbMocks.groupByMock.mockResolvedValue([])
    dbMocks.countMock.mockResolvedValue(0)

    const response = await getUsers(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      users: [],
      total: 0,
    })
  })
})
