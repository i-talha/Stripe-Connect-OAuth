import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await db.user.upsert({
    where: { id: 'test_user' },
    update: {},
    create: {
      id: 'test_user',
      email: 'test@example.com',
      password: 'demo',
    },
  })

  return NextResponse.json({ success: true, user })
}
