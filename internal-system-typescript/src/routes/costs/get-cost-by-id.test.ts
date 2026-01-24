import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import * as dbClient from '../../database/client'
import { contacts, costs, users } from '../../database/schema'
import { MOCK_COST } from '../../mocks'
import type { DbMocks } from '../../types'
import { getCostByIdRoute } from './get-cost-by-id'

vi.mock('../../database/client', () => {
  const whereMock = vi.fn()
  const innerJoinMock = vi.fn()
  const fromMock = vi.fn().mockReturnValue({ innerJoin: innerJoinMock })
  const selectMock = vi.fn().mockReturnValue({ from: fromMock })

  innerJoinMock.mockReturnValue({
    innerJoin: innerJoinMock,
    where: whereMock,
  })

  return {
    db: {
      select: selectMock,
    },
    __mocks: {
      selectMock,
      fromMock,
      innerJoinMock,
      whereMock,
    },
  }
})

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const getCostById = async (app: ReturnType<typeof Fastify>, costId: string) => {
  return app.inject({
    method: 'GET',
    url: `/costs/${costId}`,
  })
}

describe('Get Cost By ID Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getCostByIdRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('get cost by id with success', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_COST])

    const response = await getCostById(app, MOCK_COST.id)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ cost: MOCK_COST })
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

  test('should return 404 when cost not found', async () => {
    dbMocks.whereMock.mockResolvedValue([])

    const response = await getCostById(app, MOCK_COST.id)

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'Cost not found.' })
  })

  test('should fail with invalid uuid', async () => {
    const response = await getCostById(app, 'invalid-uuid')

    expect(response.statusCode).toBe(400)
  })
})
