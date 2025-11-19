'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/contexts/AuthContext'
import axios from 'axios'

export default function VendorDashboard() {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser?._id) {
      fetchVendorStats()
    }
  }, [currentUser])

  const fetchVendorStats = async () => {
    try {
      setLoading(true)
      // Fetch products ONLY for this specific vendor
      const response = await axios.get(`/api/products?vendor=${currentUser._id}`)
      
      if (response.data.success) {
        const products = response.data.data
        const activeProducts = products.filter(p => p.status === 'active')
        const pendingProducts = products.filter(p => p.status === 'pending')
        
        setStats({
          totalProducts: activeProducts.length,
          pendingProducts: pendingProducts.length,
        })
      }
    } catch (error) {
      console.error('Error fetching vendor stats:', error)
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
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {currentUser?.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt={currentUser.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-amber-500"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center border-4 border-amber-500">
                <span className="text-3xl font-bold text-white">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'V'}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name || 'Vendor'}</h2>
            {currentUser?.businessName && (
              <p className="text-lg text-gray-600 mt-1">{currentUser.businessName}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">{currentUser?.email}</p>
            <div className="mt-3">
              <Link href="/vendor/profile" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                Edit Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 mb-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
          <div className="text-center">
            <div className="inline-block bg-brown-100 text-brown-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
              🎉 Your Shop Dashboard Access
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Shop Dashboard Registration
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-3">
              <div className="text-center">
                <p className="text-base text-gray-600 mb-2">English</p>
                <div className="bg-gradient-to-r from-brown-600 to-brown-800 text-white px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-xs opacity-90">Yearly Price</p>
                  <p className="text-3xl md:text-4xl font-bold">Rs. 5,000/-</p>
                  <p className="text-xs opacity-90 mt-1">Per Year</p>
                </div>
              </div>
              <div className="text-3xl text-gray-400 hidden md:block">•</div>
              <div className="text-center">
                <p className="text-base text-gray-600 mb-2">සිංහල</p>
                <div className="bg-gradient-to-r from-brown-600 to-brown-800 text-white px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-xs opacity-90">වාර්ෂික මිල</p>
                  <p className="text-3xl md:text-4xl font-bold">රු. 5,000/-</p>
                  <p className="text-xs opacity-90 mt-1">වසරකට</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Full access to shop dashboard, product management, and order tracking
            </p>
            <p className="text-gray-600 text-sm">
              වෙළඳසැල් උපකරණ පුවරුව, නිෂ්පාදන කළමනාකරණය සහ ඇණවුම් නිරීක්ෂණය සඳහා සම්පූර්ණ ප්‍රවේශය
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stats.totalProducts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Products</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stats.pendingProducts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-heading">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/vendor/add-product" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700">
              Add New Product
            </Link>
            <Link href="/vendor/products" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              View All Products
            </Link>
            <Link href="/vendor/profile" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-heading">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="ml-3 text-gray-600">New order received - Order #1234</p>
            </div>
            <div className="flex items-center text-sm">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="ml-3 text-gray-600">Product "Ceylon Cinnamon Sticks" updated</p>
            </div>
            <div className="flex items-center text-sm">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="ml-3 text-gray-600">Product "Cinnamon Powder" pending approval</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
