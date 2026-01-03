import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'

import * as dbClient from '../../database/client'
import { contacts } from '../../database/schema'
import { MOCK_CONTACT, VALID_CONTACT_PAYLOAD } from '../../mocks'
import type {
  ContactCategory,
  CreateContactPayload,
  DbMocks,
} from '../../types'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createContactRoute } from './create-contact'

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

const dbMocks = (dbClient as typeof dbClient & { __mocks: DbMocks }).__mocks

const createContact = async (
  app: ReturnType<typeof Fastify>,
  payload: Partial<CreateContactPayload>,
) => {
  return app.inject({
    method: 'POST',
    url: '/contacts',
    payload,
  })
}

describe('Create Contact Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(createContactRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('should create contact with success', async () => {
    dbMocks.returningMock.mockResolvedValue([MOCK_CONTACT])

    const response = await createContact(app, VALID_CONTACT_PAYLOAD)

    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual({ contactId: MOCK_CONTACT.id })
    expect(dbMocks.insertMock).toHaveBeenCalledWith(contacts)
  })

  test('should fail with invalid email', async () => {
    const response = await createContact(app, {
      ...VALID_CONTACT_PAYLOAD,
      email: 'invalid-email',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with short name', async () => {
    const response = await createContact(app, {
      ...VALID_CONTACT_PAYLOAD,
      name: 'John',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with short phone', async () => {
    const response = await createContact(app, {
      ...VALID_CONTACT_PAYLOAD,
      phone: '186',
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with invalid category', async () => {
    const response = await createContact(app, {
      ...VALID_CONTACT_PAYLOAD,
      category: 'InvalidCategory' as ContactCategory,
    })

    expect(response.statusCode).toBe(400)
  })

  test('should fail with missing category', async () => {
    const payloadWithoutCategory = {
      name: VALID_CONTACT_PAYLOAD.name,
      email: VALID_CONTACT_PAYLOAD.email,
      phone: VALID_CONTACT_PAYLOAD.phone,
    }

    const response = await createContact(app, payloadWithoutCategory)

    expect(response.statusCode).toBe(400)
  })

  test('should handle database error', async () => {
    dbMocks.returningMock.mockResolvedValue([])

    const response = await createContact(app, VALID_CONTACT_PAYLOAD)

    expect(response.statusCode).toBe(500)
  })
})
