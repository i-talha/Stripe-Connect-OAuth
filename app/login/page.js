'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Login
      </button>
    </div>
  )
}
