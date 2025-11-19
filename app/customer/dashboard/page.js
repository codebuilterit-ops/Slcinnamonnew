'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/contexts/AuthContext'
import axios from 'axios'

export default function CustomerDashboard() {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser?._id) {
      fetchCustomerStats()
    }
  }, [currentUser])

  const fetchCustomerStats = async () => {
    try {
      setLoading(true)
      // This would fetch actual orders from your API
      // For now, using placeholder data
      setStats({
        totalOrders: 12,
        pendingOrders: 2,
        completedOrders: 10,
      })
      
      // Placeholder recent orders
      setRecentOrders([
        { id: 'ORD-001', date: '2025-11-15', status: 'Delivered', total: 'Rs. 2,500' },
        { id: 'ORD-002', date: '2025-11-10', status: 'Processing', total: 'Rs. 1,200' },
        { id: 'ORD-003', date: '2025-11-05', status: 'Delivered', total: 'Rs. 3,400' },
      ])
    } catch (error) {
      console.error('Error fetching customer stats:', error)
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
      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            {currentUser?.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt={currentUser.name}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-brown-500"
              />
            ) : (
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-brown-400 to-brown-600 flex items-center justify-center border-4 border-brown-500">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'C'}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentUser?.name || 'Customer'}</h2>
            <p className="text-sm text-gray-500 mt-2 break-all sm:break-normal">{currentUser?.email}</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Member since {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            <div className="mt-3">
              <Link href="/customer/profile" className="text-sm text-brown-600 hover:text-brown-700 font-medium inline-block">
                Edit Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 font-heading">My Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-brown-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.totalOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                  <dd className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.pendingOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-4 sm:p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.completedOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:col-span-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 font-heading">Quick Actions</h2>
          <div className="space-y-2 sm:space-y-3">
            <Link href="/shop" className="block w-full text-center px-4 py-2.5 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700 transition-colors">
              Browse Products
            </Link>
            <Link href="/customer/orders" className="block w-full text-center px-4 py-2.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              View My Orders
            </Link>
            <Link href="/customer/profile" className="block w-full text-center px-4 py-2.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Update Profile
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-heading">Recent Orders</h2>
            <Link href="/customer/orders" className="text-xs sm:text-sm text-brown-600 hover:text-brown-700 font-medium">
              View All →
            </Link>
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here!</p>
              <div className="mt-6">
                <Link href="/shop" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brown-600 hover:bg-brown-700">
                  Start Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Section */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-brown-600 to-brown-800 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-white">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Premium Ceylon Cinnamon</h2>
          <p className="text-brown-100 mb-4 text-sm sm:text-base">Discover authentic Ceylon cinnamon from trusted vendors</p>
          <Link href="/shop" className="inline-block bg-white text-brown-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-brown-50 transition-colors text-sm sm:text-base">
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  )
}
