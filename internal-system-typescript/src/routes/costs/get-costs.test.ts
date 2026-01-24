import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import * as dbClient from '../../database/client'
import { costs, users, contacts } from '../../database/schema'
import { MOCK_COST } from '../../mocks'
import type { DbMocks } from '../../types'
import { getCostsRoute } from './get-costs'

vi.mock('../../database/client', () => {
  const whereMock = vi.fn()
  const limitMock = vi.fn()
  const offsetMock = vi.fn()
  const orderByMock = vi.fn()
  const innerJoinMock = vi.fn()
  const fromMock = vi.fn()
  const selectMock = vi.fn()
  const countMock = vi.fn()

  // Route chain:
  // db
  //   .select(...)
  //   .from(costs)
  //   .innerJoin(users, ...)
  //   .innerJoin(contacts, ...)
  //   .orderBy(...)
  //   .offset(...)
  //   .limit(...)
  //   .where(...)

  whereMock.mockResolvedValue([])

  limitMock.mockReturnValue({
    where: whereMock,
  })

  offsetMock.mockReturnValue({
    limit: limitMock,
  })

  orderByMock.mockReturnValue({
    offset: offsetMock,
  })

  innerJoinMock.mockReturnValue({
    innerJoin: innerJoinMock, // second innerJoin
    orderBy: orderByMock,
  })

  fromMock.mockReturnValue({
    innerJoin: innerJoinMock,
  })

  selectMock.mockReturnValue({
    from: fromMock,
  })

  countMock.mockResolvedValue(0)

  return {
    db: {
      select: selectMock,
      $count: countMock,
    },
    __mocks: {
      selectMock,
      fromMock,
      innerJoinMock,
      orderByMock,
      offsetMock,
      limitMock,
      whereMock,
      groupByMock: vi.fn(),
      countMock,
      insertMock: vi.fn(),
      valuesMock: vi.fn(),
      returningMock: vi.fn(),
    } satisfies DbMocks,
  }
})

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const getCosts = async (
  app: ReturnType<typeof Fastify>,
  query: Record<string, string | number | undefined> = {},
) => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()
  const url = queryString ? `/costs?${queryString}` : '/costs'

  return app.inject({
    method: 'GET',
    url,
  })
}

describe('Get Costs Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getCostsRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('should list costs with default query params', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_COST])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getCosts(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      costs: [MOCK_COST],
      total: 1,
    })

    expect(dbMocks.selectMock).toHaveBeenCalledWith({
      id: costs.id,
      userId: costs.userId,
      contactId: costs.contactId,
      value: costs.value,
      category: costs.category,
      userName: users.name,
      contactName: contacts.name,
    })
    expect(dbMocks.fromMock).toHaveBeenCalledWith(costs)
  })

  test('should filter costs by search term', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_COST])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getCosts(app, { search: 'Jane' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      costs: [MOCK_COST],
      total: 1,
    })

    expect(dbMocks.whereMock).toHaveBeenCalled()
  })

  test('should order costs by value', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_COST])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getCosts(app, { orderBy: 'value' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      costs: [MOCK_COST],
      total: 1,
    })

    expect(dbMocks.orderByMock).toHaveBeenCalled()
  })

  test('should paginate costs with page param', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_COST])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getCosts(app, { page: 2 })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      costs: [MOCK_COST],
      total: 1,
    })

    expect(dbMocks.offsetMock).toHaveBeenCalled()
  })

  test('should return empty list when no cost found', async () => {
    dbMocks.whereMock.mockResolvedValue([])
    dbMocks.countMock.mockResolvedValue(0)

    const response = await getCosts(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      costs: [],
      total: 0,
    })
  })
})
