import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') || 'test_user'

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID,
    scope: 'read_write',
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/callback`,
    state: userId,
  })

  const redirectUrl = `https://connect.stripe.com/oauth/authorize?${params}`
  return NextResponse.redirect(redirectUrl)
}
