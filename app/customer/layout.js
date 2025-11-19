'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function CustomerLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!loading && (!currentUser || currentUser.role !== 'customer')) {
      router.push('/login')
    }
  }, [currentUser, loading, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    )
  }

  if (!currentUser || currentUser.role !== 'customer') {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'My Orders', href: '/customer/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { name: 'Profile', href: '/customer/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Browse Shop', href: '/shop', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <div className="text-xl sm:text-2xl font-semibold text-brown-900 font-heading">Customer Portal</div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-sm text-gray-600 truncate max-w-[150px] md:max-w-none">
                Welcome, {currentUser.name || 'Customer'}!
              </div>
              <button 
                onClick={handleLogout}
                className="text-xs sm:text-sm text-brown-700 hover:text-brown-800 font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-brown-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-md min-h-screen pt-6">
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive
                      ? 'bg-brown-100 text-brown-800'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg 
                    className={`mr-3 h-6 w-6 ${isActive ? 'text-brown-600' : 'text-gray-400 group-hover:text-gray-500'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 pt-6 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                        isActive
                          ? 'bg-brown-100 text-brown-800'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <svg 
                        className={`mr-3 h-6 w-6 ${isActive ? 'text-brown-600' : 'text-gray-400 group-hover:text-gray-500'}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
