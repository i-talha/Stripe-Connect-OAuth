import Stripe from 'stripe'
import { db } from '@/lib/db'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function AccountPage({ params }) {
  const { id } = params

  const account = await db.stripeAccount.findUnique({ where: { id } })
  if (!account) {
    return <div className="p-10 text-red-500">Account not found</div>
  }

  const stripeAcc = await stripe.accounts.retrieve(account.stripeUserId)

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Stripe Account Overview</h1>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <InfoRow label="Account ID" value={stripeAcc.id} />
        <InfoRow label="Email" value={stripeAcc.email || 'N/A'} />
        <InfoRow label="Country" value={stripeAcc.country} />
        <InfoRow label="Type" value={stripeAcc.business_type} />
        <InfoRow label="Charges Enabled" value={stripeAcc.charges_enabled ? '✅ Yes' : '❌ No'} />
        <InfoRow label="Payouts Enabled" value={stripeAcc.payouts_enabled ? '✅ Yes' : '❌ No'} />
        <InfoRow label="Business Name" value={stripeAcc.business_profile?.name || 'N/A'} />
        <InfoRow label="Support Phone" value={stripeAcc.business_profile?.support_phone || 'N/A'} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Raw Stripe Data</h2>
        <pre className="bg-gray-900 text-green-200 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(stripeAcc, null, 2)}
        </pre>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center">
      <div className="w-48 font-medium text-gray-600">{label}:</div>
      <div className="text-gray-900">{value}</div>
    </div>
  )
}
