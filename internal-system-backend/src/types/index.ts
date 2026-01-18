import type { Mock } from 'vitest'
export interface DbMocks {
  insertMock: Mock
  valuesMock: Mock
  returningMock: Mock

  selectMock: Mock
  fromMock: Mock
  innerJoinMock?: Mock // optional because we just use in get-costs
  whereMock: Mock

  orderByMock: Mock
  offsetMock: Mock
  limitMock: Mock
  groupByMock: Mock
  countMock: Mock
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  phone: string
}

export type ContactCategory = 'Family' | 'Friend' | 'Work'

export interface CreateContactPayload {
  userId: string
  name: string
  email: string
  phone: string
  category: ContactCategory
}

export type CostCategory = 'Food' | 'Payment' | 'Entertainment' | 'Travel'

export interface CreateCostPayload {
  userId: string
  contactId: string
  value: string
  category: CostCategory
}
