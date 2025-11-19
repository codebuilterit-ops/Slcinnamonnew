'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    vendors: 0,
    producers: 0,
    admins: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users')
      
      if (response.data.success) {
        const users = response.data.data
        
        // Calculate statistics
        const vendorCount = users.filter(u => u.role === 'vendor').length
        const producerCount = users.filter(u => u.role === 'producer').length
        const adminCount = users.filter(u => u.role === 'admin').length
        
        setStats({
          totalUsers: users.length,
          vendors: vendorCount,
          producers: producerCount,
          admins: adminCount,
        })
        
        // Get 5 most recent users
        const sorted = [...users].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
        setRecentUsers(sorted.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Super Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
            </div>
            <div className="text-5xl opacity-80">👥</div>
          </div>
          <Link href="/admin/users" className="mt-4 text-sm text-blue-100 hover:text-white inline-flex items-center">
            View All →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Vendors</p>
              <p className="text-4xl font-bold mt-2">{stats.vendors}</p>
            </div>
            <div className="text-5xl opacity-80">🏪</div>
          </div>
          <Link href="/admin/vendors" className="mt-4 text-sm text-amber-100 hover:text-white inline-flex items-center">
            Manage →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Producers</p>
              <p className="text-4xl font-bold mt-2">{stats.producers}</p>
            </div>
            <div className="text-5xl opacity-80">🌿</div>
          </div>
          <Link href="/admin/producers" className="mt-4 text-sm text-green-100 hover:text-white inline-flex items-center">
            Manage →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Admins</p>
              <p className="text-4xl font-bold mt-2">{stats.admins}</p>
            </div>
            <div className="text-5xl opacity-80">👑</div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          <Link href="/admin/users" className="text-sm text-brown-600 hover:text-brown-700 font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        {user.businessName && (
                          <div className="text-xs text-gray-500">{user.businessName}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'vendor' ? 'bg-amber-100 text-amber-800' :
                      user.role === 'producer' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/users" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Manage All Users</h3>
          <p className="text-sm text-gray-500">View, edit, and delete all user accounts</p>
          <span className="text-brown-600 text-sm font-medium mt-3 inline-block group-hover:translate-x-2 transition">
            Go to Users →
          </span>
        </Link>

        <Link href="/admin/vendors" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
          <div className="text-3xl mb-3">🏪</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Vendors</h3>
          <p className="text-sm text-gray-500">Oversee vendor shops and their products</p>
          <span className="text-brown-600 text-sm font-medium mt-3 inline-block group-hover:translate-x-2 transition">
            Go to Vendors →
          </span>
        </Link>

        <Link href="/admin/producers" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
          <div className="text-3xl mb-3">🌿</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Producers</h3>
          <p className="text-sm text-gray-500">Monitor cinnamon producer activities</p>
          <span className="text-brown-600 text-sm font-medium mt-3 inline-block group-hover:translate-x-2 transition">
            Go to Producers →
          </span>
        </Link>
      </div>
    </div>
  )
}
