import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email) return NextResponse.json({ error: 'No email provided' }, { status: 400 })

    let user = await db.user.findUnique({ where: { email } })

    if (!user) {
      user = await db.user.create({
        data: { email, password: 'demo' }
      })
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set('userId', user.id, {
      path: '/',
      httpOnly: true,
    })

    return res
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
