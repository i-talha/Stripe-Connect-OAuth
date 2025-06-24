'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const params = useSearchParams()
  const account = params.get('account')
  const existing = params.get('existing') === 'true'

  useEffect(() => {
    if (existing) {
      alert('This Stripe account is already connected.')
    }
  }, [existing])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center p-8">
      <h1 className="text-3xl font-bold text-white">Stripe Connected Successfully</h1>

      <div className="text-gray-300 text-sm">
        Account ID:&nbsp;
        <span className="font-mono text-blue-300">{account}</span>
      </div>

      <Link href="/dashboard">
        <button className="cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go to Dashboard
        </button>
      </Link>
    </div>
  )
}
