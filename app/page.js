'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-10">
      <h1 className="text-3xl font-bold text-white">Stripe Connect</h1>

      <div className="flex gap-4">
        <Link href="/api/stripe/redirect?userId=test_user">
          <button className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Connect with Stripe
          </button>

        </Link>

        <Link href="/dashboard">
          <button className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Go to Dashboard
          </button>

        </Link>
      </div>
    </main>
  )
}
