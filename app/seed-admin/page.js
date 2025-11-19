'use client'

import { useState } from 'react'
import axios from 'axios'

export default function SeedAdminPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const createAdmin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/seed-admin')
      setResult(response.data)
    } catch (error) {
      setResult({
        success: false,
        error: error.response?.data?.error || error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🔐 Create Admin Account</h1>
          <p className="text-gray-600">Click the button below to create your admin user</p>
        </div>

        <div className="mb-6">
          <button
            onClick={createAdmin}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition shadow-lg"
          >
            {loading ? '⏳ Creating Admin...' : '✨ Create Admin User'}
          </button>
        </div>

        {result && (
          <div className={`p-6 rounded-lg ${result.success ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            {result.success ? (
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                  ✅ Admin Created Successfully!
                </h2>
                <div className="space-y-3 text-gray-800">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-sm text-gray-600 mb-1">Email:</p>
                    <p className="text-xl font-mono text-purple-600">{result.data.email}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-sm text-gray-600 mb-1">Password:</p>
                    <p className="text-xl font-mono text-purple-600">{result.data.password}</p>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 p-4 rounded-lg mt-4">
                    <p className="text-sm font-bold text-yellow-800 mb-2">⚠️ IMPORTANT SECURITY NOTE:</p>
                    <p className="text-sm text-yellow-900">{result.data.note}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="/login"
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
                  >
                    Go to Login →
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                  ❌ Error
                </h2>
                <p className="text-red-700 mb-2">{result.message || 'Failed to create admin'}</p>
                {result.error && (
                  <p className="text-sm text-red-600 bg-red-100 p-3 rounded mt-2 font-mono">
                    {result.error}
                  </p>
                )}
                {result.note && (
                  <p className="text-sm text-gray-700 mt-3 bg-gray-100 p-3 rounded">
                    💡 {result.note}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">📝 Manual Creation (if button doesn't work):</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>1. Open MongoDB Compass or MongoDB shell</p>
            <p>2. Connect to your database</p>
            <p>3. Go to the "users" collection</p>
            <p>4. Insert this document:</p>
            <pre className="bg-white p-3 rounded mt-2 text-xs overflow-x-auto border border-blue-200">
{`{
  "name": "Super Admin",
  "email": "admin@slcinnamon.com",
  "password": "$2a$10$...", // Use bcrypt to hash "admin123456"
  "role": "admin",
  "isActive": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
