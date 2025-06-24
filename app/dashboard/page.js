'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    fetch('/api/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data))
  }, [])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Connected Stripe Accounts</h1>

      {accounts.length === 0 ? (
        <p className="text-gray-400">No connected accounts yet.</p>
      ) : (
        <div className="grid gap-4">
          {accounts.map(acc => (
            <Link
              key={acc.id}
              href={`/account/${acc.id}`}
              className="block bg-white rounded shadow p-4 hover:shadow-lg transition"
            >
              <div className="text-lg font-semibold text-gray-800">
                {acc.stripeUserId}
              </div>
              <div className="text-sm text-gray-500">
                Account ID: {acc.id}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
