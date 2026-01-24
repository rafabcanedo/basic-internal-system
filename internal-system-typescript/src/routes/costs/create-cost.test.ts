import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'

import * as dbClient from '../../database/client'
import { costs } from '../../database/schema'
import { MOCK_COST, VALID_COST_PAYLOAD } from '../../mocks'
import type { CostCategory, CreateCostPayload, DbMocks } from '../../types'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createCostRoute } from './create-cost'

vi.mock('../../database/client', () => {
  const returningMock = vi.fn()
  const valuesMock = vi.fn().mockReturnValue({ returning: returningMock })
  const insertMock = vi.fn().mockReturnValue({ values: valuesMock })

  const findFirstMock = vi.fn()

  return {
    db: {
      insert: insertMock,
      query: {
        users: {
          findFirst: findFirstMock,
        },
        contacts: {
          findFirst: findFirstMock,
        },
      },
    },
    __mocks: {
      insertMock,
      valuesMock,
      returningMock,
      findFirstMock,
    },
  }
})

const dbMocks = (
  dbClient as typeof dbClient & {
    __mocks: DbMocks & { findFirstMock: ReturnType<typeof vi.fn> }
  }
).__mocks

const createCost = async (
  app: ReturnType<typeof Fastify>,
  payload: Partial<CreateCostPayload>,
) => {
  return app.inject({
    method: 'POST',
    url: '/costs',
    payload,
  })
}

describe('Create Cost Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(createCostRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('should create cost with success', async () => {
    dbMocks.findFirstMock
      .mockResolvedValueOnce({ id: VALID_COST_PAYLOAD.userId })
      .mockResolvedValueOnce({ id: VALID_COST_PAYLOAD.contactId })

    dbMocks.returningMock.mockResolvedValue([MOCK_COST])

    const response = await createCost(app, VALID_COST_PAYLOAD)

    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual({ costId: MOCK_COST.id })
    expect(dbMocks.insertMock).toHaveBeenCalledWith(costs)
  })

  test('should fail when user not found', async () => {
    dbMocks.findFirstMock.mockResolvedValueOnce(undefined)

    const response = await createCost(app, VALID_COST_PAYLOAD)

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'User not found' })
  })

  test('should fail when contact not found', async () => {
    dbMocks.findFirstMock
      .mockResolvedValueOnce({ id: VALID_COST_PAYLOAD.userId })
      .mockResolvedValueOnce(undefined)

    const response = await createCost(app, VALID_COST_PAYLOAD)

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'Contact not found' })
  })

  test('should fail with invalid userId', async () => {
    const response = await createCost(app, {
      ...VALID_COST_PAYLOAD,
      userId: 'invalid-uuid',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with invalid contactId', async () => {
    const response = await createCost(app, {
      ...VALID_COST_PAYLOAD,
      contactId: 'invalid-uuid',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with empty value', async () => {
    const response = await createCost(app, {
      ...VALID_COST_PAYLOAD,
      value: '',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with invalid category', async () => {
    const response = await createCost(app, {
      ...VALID_COST_PAYLOAD,
      category: 'InvalidCategory' as CostCategory,
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with missing category', async () => {
    const payloadWithoutCategory = {
      userId: VALID_COST_PAYLOAD.userId,
      contactId: VALID_COST_PAYLOAD.contactId,
      value: VALID_COST_PAYLOAD.value,
    }

    const response = await createCost(app, payloadWithoutCategory)

    expect(response.statusCode).toBe(400)
  })

  test('should handle database error', async () => {
    dbMocks.findFirstMock
      .mockResolvedValueOnce({ id: VALID_COST_PAYLOAD.userId })
      .mockResolvedValueOnce({ id: VALID_COST_PAYLOAD.contactId })

    dbMocks.returningMock.mockResolvedValue([])

    const response = await createCost(app, VALID_COST_PAYLOAD)

    expect(response.statusCode).toBe(500)
  })
})
