'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    province: '',
    zipCode: '',
    country: 'Sri Lanka',
    isActive: true,
  })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users?role=vendor')
      if (response.data.success) {
        setVendors(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
      alert('Failed to fetch vendors')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setModalMode('add')
    setFormData({
      name: '',
      email: '',
      password: '',
      businessName: '',
      phone: '',
      street: '',
      city: '',
      district: '',
      province: '',
      zipCode: '',
      country: 'Sri Lanka',
      isActive: true,
    })
    setShowModal(true)
  }

  const handleEdit = (vendor) => {
    setModalMode('edit')
    setSelectedVendor(vendor)
    setFormData({
      name: vendor.name,
      email: vendor.email,
      password: '',
      businessName: vendor.businessName || '',
      phone: vendor.phone || '',
      street: vendor.address?.street || '',
      city: vendor.address?.city || '',
      district: vendor.address?.district || '',
      province: vendor.address?.province || '',
      zipCode: vendor.address?.zipCode || '',
      country: vendor.address?.country || 'Sri Lanka',
      isActive: vendor.isActive,
    })
    setShowModal(true)
  }

  const handleDelete = async (vendorId) => {
    if (!deleteConfirm) {
      setDeleteConfirm(vendorId)
      return
    }

    try {
      await axios.delete(`/api/users/${vendorId}`)
      alert('Vendor deleted successfully')
      fetchVendors()
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting vendor:', error)
      alert('Failed to delete vendor')
    }
  }

  const handleApprovalToggle = async (vendor) => {
    try {
      const newStatus = !vendor.isApproved
      const newApprovalStatus = newStatus ? 'approved' : 'pending'
      
      const response = await axios.put(`/api/users/${vendor._id}`, {
        isApproved: newStatus,
        approvalStatus: newApprovalStatus
      })
      
      if (response.data.success) {
        alert(`Vendor ${newStatus ? 'approved' : 'unapproved'} successfully!`)
        fetchVendors()
      }
    } catch (error) {
      console.error('Error updating approval status:', error)
      alert('Failed to update approval status')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userData = {
      name: formData.name,
      email: formData.email,
      role: 'vendor',
      businessName: formData.businessName,
      phone: formData.phone,
      isActive: formData.isActive,
      address: {
        street: formData.street,
        city: formData.city,
        district: formData.district,
        province: formData.province,
        zipCode: formData.zipCode,
        country: formData.country,
      }
    }

    if (formData.password) {
      userData.password = formData.password
    }

    try {
      if (modalMode === 'add') {
        await axios.post('/api/users', userData)
        alert('Vendor created successfully')
      } else {
        await axios.put(`/api/users/${selectedVendor._id}`, userData)
        alert('Vendor updated successfully')
      }
      
      setShowModal(false)
      fetchVendors()
    } catch (error) {
      console.error('Error saving vendor:', error)
      alert(error.response?.data?.error || 'Failed to save vendor')
    }
  }

  const filteredVendors = vendors.filter(vendor => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = (
      vendor.name.toLowerCase().includes(searchLower) ||
      vendor.email.toLowerCase().includes(searchLower) ||
      (vendor.businessName && vendor.businessName.toLowerCase().includes(searchLower)) ||
      (vendor.address?.city && vendor.address.city.toLowerCase().includes(searchLower)) ||
      (vendor.address?.district && vendor.address.district.toLowerCase().includes(searchLower))
    )
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'approved' && vendor.isApproved) ||
      (filterStatus === 'pending' && !vendor.isApproved)
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendors Management</h1>
          <p className="text-gray-500 mt-1">Manage cinnamon shop vendors</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          🏪 Add New Vendor
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search vendors by name, email, business, city, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-24 flex items-center justify-center">
              {vendor.profileImage ? (
                <img src={vendor.profileImage} alt={vendor.name} className="h-20 w-20 rounded-full object-cover border-4 border-white" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-amber-600">
                  {vendor.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{vendor.businessName || vendor.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{vendor.email}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {vendor.phone && (
                  <div className="flex items-center">
                    <span className="mr-2">📞</span>
                    <span>{vendor.phone}</span>
                  </div>
                )}
                {vendor.address?.city && vendor.address?.district && (
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{vendor.address.city}, {vendor.address.district}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>Joined {new Date(vendor.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  vendor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {vendor.isActive ? '✓ Active' : '✕ Inactive'}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  vendor.isApproved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vendor.isApproved ? '✓ Approved' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="mb-3">
                <button
                  onClick={() => handleApprovalToggle(vendor)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
                    vendor.isApproved 
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' 
                      : 'bg-green-100 hover:bg-green-200 text-green-800'
                  }`}
                >
                  {vendor.isApproved ? '⏳ Unapprove' : '✓ Approve Vendor'}
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(vendor)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>
                {deleteConfirm === vendor._id ? (
                  <div className="flex-1 flex space-x-2">
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(vendor._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Vendors Found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new vendor.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'add' ? '🏪 Add New Vendor' : '✏️ Edit Vendor'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password {modalMode === 'edit' && '(leave blank to keep current)'}
                      </label>
                      <input
                        type="password"
                        required={modalMode === 'add'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                        placeholder={modalMode === 'edit' ? 'Leave blank to keep current password' : ''}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                      <input
                        type="text"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-900">
                      Vendor Account is Active
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3 border-t pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition"
                >
                  {modalMode === 'add' ? 'Create Vendor' : 'Update Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
