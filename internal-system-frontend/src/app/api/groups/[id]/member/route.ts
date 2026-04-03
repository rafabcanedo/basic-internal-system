import { NextRequest, NextResponse } from 'next/server'
import { API_BASE_URL } from '../../../constants'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const accessToken = request.cookies.get('access_token')?.value

    const res = await fetch(`${API_BASE_URL}/group/${id}/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to add member' },
        { status: res.status }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('[POST /api/groups/:id/member] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
