import { ApiError } from '../errors/api.error'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''

  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL
  if (envUrl) return envUrl.replace(/\/$/, '')

  return 'http://localhost:3000'
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}/api${endpoint}`

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      cache: 'no-store',
    })

    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
      throw new ApiError(res.status, data?.error || 'Unknown error', data)
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error instanceof TypeError) {
      throw new ApiError(0, 'Network error. Check your connection.', error)
    }
    throw new ApiError(500, 'Unknown error', error)
  }
}