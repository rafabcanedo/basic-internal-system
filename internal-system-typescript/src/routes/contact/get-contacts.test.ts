import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { getContactsRoute } from './get-contacts'
import * as dbClient from '../../database/client'
import { contacts } from '../../database/schema'
import { MOCK_CONTACT } from '../../mocks'
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

const getContacts = async (
  app: ReturnType<typeof Fastify>,
  query: Record<string, string | number | undefined> = {},
) => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()
  const url = queryString ? `/contacts?${queryString}` : '/contacts'

  return app.inject({
    method: 'GET',
    url,
  })
}

describe('Get Contacts Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getContactsRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('should list contacts with default query params', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_CONTACT])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getContacts(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      contacts: [MOCK_CONTACT],
      total: 1,
    })

    expect(dbMocks.selectMock).toHaveBeenCalledWith({
      id: contacts.id,
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
      category: contacts.category,
    })
    expect(dbMocks.fromMock).toHaveBeenCalledWith(contacts)
  })

  test('should filter contacts by search term', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_CONTACT])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getContacts(app, { search: 'Jane' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      contacts: [MOCK_CONTACT],
      total: 1,
    })

    expect(dbMocks.whereMock).toHaveBeenCalled()
  })

  test('should order contacts by name', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_CONTACT])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getContacts(app, { orderBy: 'name' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      contacts: [MOCK_CONTACT],
      total: 1,
    })

    expect(dbMocks.orderByMock).toHaveBeenCalled()
  })

  test('should paginate contacts with page param', async () => {
    dbMocks.groupByMock.mockResolvedValue([MOCK_CONTACT])
    dbMocks.countMock.mockResolvedValue(1)

    const response = await getContacts(app, { page: 2 })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      contacts: [MOCK_CONTACT],
      total: 1,
    })

    expect(dbMocks.offsetMock).toHaveBeenCalled()
  })

  test('should return empty list when no contacts found', async () => {
    dbMocks.groupByMock.mockResolvedValue([])
    dbMocks.countMock.mockResolvedValue(0)

    const response = await getContacts(app)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      contacts: [],
      total: 0,
    })
  })
})
