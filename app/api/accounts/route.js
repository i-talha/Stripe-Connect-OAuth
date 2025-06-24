import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value


  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const accounts = await db.stripeAccount.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

    console.log('userId from cookie:', userId)
    console.log('accounts found:', accounts)

  return NextResponse.json(accounts)
}
