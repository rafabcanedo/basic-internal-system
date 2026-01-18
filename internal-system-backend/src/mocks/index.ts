import type {
  CreateContactPayload,
  CreateCostPayload,
  CreateUserPayload,
} from '../types'

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

export const VALID_CONTACT_PAYLOAD: CreateContactPayload = {
  userId: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '87654321',
  category: 'Friend',
}

export const MOCK_CONTACT = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '87654321',
  category: 'Friend' as const,
}

export const VALID_COST_PAYLOAD: CreateCostPayload = {
  userId: '123e4567-e89b-12d3-a456-426614174000',
  contactId: '123e4567-e89b-12d3-a456-426614174001',
  value: '150.00',
  category: 'Food' as const,
}

export const MOCK_COST = {
  id: '123e4567-e89b-12d3-a456-426614174002',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  contactId: '123e4567-e89b-12d3-a456-426614174001',
  value: '150.00',
  category: 'Food' as const,
  userName: 'John Doe',
  contactName: 'Jane Smith',
}
