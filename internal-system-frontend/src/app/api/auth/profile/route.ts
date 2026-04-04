import { NextRequest, NextResponse } from 'next/server'
import { API_BASE_URL } from '../../constants'

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value

    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET /api/auth/profile] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value
    const body = await request.json()

    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[PUT /api/auth/profile] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
