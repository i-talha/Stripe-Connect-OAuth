import stripe from '@/lib/stripe'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state') // userId

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    })

    const accountId = response.stripe_user_id

    const existing = await db.stripeAccount.findUnique({
      where: { stripeUserId: accountId },
    })

    if (existing) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/success?account=${accountId}&existing=true`
      )
    }

    // Optional: get display name for dashboard
    const stripeDetails = await stripe.accounts.retrieve(accountId)

    await db.stripeAccount.create({
      data: {
        stripeUserId: accountId,
        userId: state,
        displayName:
          stripeDetails.business_profile?.name ||
          stripeDetails.individual?.first_name ||
          'Stripe Account',
      },
    })

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/success?account=${accountId}`
    )
  } catch (err) {
    console.error('[OAuth Error]', err)
    return NextResponse.json({ error: 'OAuth failed' }, { status: 400 })
  }
}
