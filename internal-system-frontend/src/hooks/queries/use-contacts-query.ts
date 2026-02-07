'use client'

import { useQuery } from '@tanstack/react-query'
import { ContactsService } from '@/services/contacts.service'
import type { GetContactsResponse } from '@/types'
import { ApiError } from '@/lib/errors/api.error'

export function useContactsQuery() {
  return useQuery<GetContactsResponse, ApiError>({
    queryKey: ['contacts'],
    queryFn: () => ContactsService.getAll(),
    staleTime: 1000 * 60 * 5,
  })
}
