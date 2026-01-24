import { describe, test, expect, beforeEach, vi } from 'vitest'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import * as dbClient from '../../database/client'
import { contacts } from '../../database/schema'
import { MOCK_CONTACT } from '../../mocks'
import type { DbMocks } from '../../types'
import { getContactByIdRoute } from './get-contact-by-id'

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

const getContactById = async (
  app: ReturnType<typeof Fastify>,
  contactId: string,
) => {
  return app.inject({
    method: 'GET',
    url: `/contacts/${contactId}`,
  })
}

describe('Get Contact By ID Route', () => {
  let app: ReturnType<typeof Fastify>

  beforeEach(async () => {
    app = Fastify().withTypeProvider<ZodTypeProvider>()
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await app.register(getContactByIdRoute)
    await app.ready()
    vi.clearAllMocks()
  })

  test('get contact by id with success', async () => {
    dbMocks.whereMock.mockResolvedValue([MOCK_CONTACT])

    const response = await getContactById(app, MOCK_CONTACT.id)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ contact: MOCK_CONTACT })
    expect(dbMocks.selectMock).toHaveBeenCalledWith({
      id: contacts.id,
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
      category: contacts.category,
    })
    expect(dbMocks.fromMock).toHaveBeenCalledWith(contacts)
  })

  test('should return 404 when contact not found', async () => {
    dbMocks.whereMock.mockResolvedValue([])

    const response = await getContactById(app, MOCK_CONTACT.id)

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'Contact not found.' })
  })

  test('should fail with invalid uuid', async () => {
    const response = await getContactById(app, 'invalid-uuid')

    expect(response.statusCode).toBe(400)
  })
})
