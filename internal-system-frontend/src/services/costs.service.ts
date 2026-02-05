import { apiCall } from '@/lib/api-client'
import type { GetCostsResponse, Cost } from '@/types'

type CreateCostInput = Omit<Cost, 'id' | 'userName' | 'contactName' | 'percent'>

export const CostsService = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : ''
    return apiCall<GetCostsResponse>(`/costs${query}`)
  },

  getById: async (id: string) => {
    return apiCall<Cost>(`/costs/${id}`)
  },

  create: async (data: CreateCostInput) => {
    return apiCall<Cost>('/costs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Partial<CreateCostInput>) => {
    return apiCall<Cost>(`/costs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiCall<void>(`/costs/${id}`, {
      method: 'DELETE',
    })
  },
}
