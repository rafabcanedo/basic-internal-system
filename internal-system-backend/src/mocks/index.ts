import type { CreateUserPayload } from '../types'

export const VALID_USER_PAYLOAD: CreateUserPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '12345678',
}

export const MOCK_USER = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '12345678',
}
