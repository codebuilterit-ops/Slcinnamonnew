'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'All Users', href: '/admin/users', icon: '👥' },
    { name: 'Vendors', href: '/admin/vendors', icon: '🏪' },
    { name: 'Producers', href: '/admin/producers', icon: '🌿' },
  ]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-brown-700 to-brown-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">👤 {currentUser?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-8">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? 'bg-brown-600 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
