import type { Mock } from 'vitest'

export interface DbMocks {
  insertMock: Mock
  valuesMock: Mock
  returningMock: Mock

  selectMock: Mock
  fromMock: Mock
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
