import type { Contact, GetContactsResponse } from '@/types'

export type { Contact, GetContactsResponse }

export type CreateContactInput = Omit<Contact, 'id'>
