import { apiCall } from '@/lib/api-client'
import type { GetGroupsResponse, Group, GroupDetail, CreateGroupInput, AddMemberInput } from '@/types'

export const GroupService = {
  getAll: async () => {
    return apiCall<GetGroupsResponse>('/groups')
  },

  getById: async (id: string) => {
    return apiCall<GroupDetail>(`/groups/${id}`)
  },

  create: async (data: CreateGroupInput) => {
    return apiCall<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiCall<void>(`/groups/${id}`, {
      method: 'DELETE',
    })
  },

  addMember: async (groupId: string, data: AddMemberInput) => {
    return apiCall<void>(`/groups/${groupId}/member`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  removeMember: async (groupId: string, contactId: string) => {
    return apiCall<void>(`/groups/${groupId}/member/${contactId}`, {
      method: 'DELETE',
    })
  },
}
