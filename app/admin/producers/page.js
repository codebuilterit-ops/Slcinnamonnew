'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminProducersPage() {
  const [producers, setProducers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [selectedProducer, setSelectedProducer] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    district: '',
    province: '',
    country: 'Sri Lanka',
    isActive: true,
  })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchProducers()
  }, [])

  const fetchProducers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users?role=producer')
      if (response.data.success) {
        setProducers(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching producers:', error)
      alert('Failed to fetch producers')
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
      phone: '',
      city: '',
      district: '',
      province: '',
      country: 'Sri Lanka',
      isActive: true,
    })
    setShowModal(true)
  }

  const handleEdit = (producer) => {
    setModalMode('edit')
    setSelectedProducer(producer)
    setFormData({
      name: producer.name,
      email: producer.email,
      password: '',
      phone: producer.phone || '',
      city: producer.address?.city || '',
      district: producer.address?.district || '',
      province: producer.address?.province || '',
      country: producer.address?.country || 'Sri Lanka',
      isActive: producer.isActive,
    })
    setShowModal(true)
  }

  const handleDelete = async (producerId) => {
    if (!deleteConfirm) {
      setDeleteConfirm(producerId)
      return
    }

    try {
      await axios.delete(`/api/users/${producerId}`)
      alert('Producer deleted successfully')
      fetchProducers()
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting producer:', error)
      alert('Failed to delete producer')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userData = {
      name: formData.name,
      email: formData.email,
      role: 'producer',
      phone: formData.phone,
      isActive: formData.isActive,
      address: {
        city: formData.city,
        district: formData.district,
        province: formData.province,
        country: formData.country,
      }
    }

    if (formData.password) {
      userData.password = formData.password
    }

    try {
      if (modalMode === 'add') {
        await axios.post('/api/users', userData)
        alert('Producer created successfully')
      } else {
        await axios.put(`/api/users/${selectedProducer._id}`, userData)
        alert('Producer updated successfully')
      }
      
      setShowModal(false)
      fetchProducers()
    } catch (error) {
      console.error('Error saving producer:', error)
      alert(error.response?.data?.error || 'Failed to save producer')
    }
  }

  const filteredProducers = producers.filter(producer => {
    const searchLower = searchTerm.toLowerCase()
    return (
      producer.name.toLowerCase().includes(searchLower) ||
      producer.email.toLowerCase().includes(searchLower) ||
      (producer.address?.city && producer.address.city.toLowerCase().includes(searchLower)) ||
      (producer.address?.district && producer.address.district.toLowerCase().includes(searchLower))
    )
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
          <h1 className="text-3xl font-bold text-gray-900">Producers Management</h1>
          <p className="text-gray-500 mt-1">Manage cinnamon producers</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          🌿 Add New Producer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <input
          type="text"
          placeholder="Search producers by name, email, city, or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
        />
      </div>

      {/* Producers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducers.map((producer) => (
                <tr key={producer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {producer.profileImage ? (
                        <img src={producer.profileImage} alt={producer.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                          {producer.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{producer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producer.phone || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {producer.address?.city && producer.address?.district ? (
                      <span>{producer.address.city}, {producer.address.district}</span>
                    ) : (
                      <span className="text-gray-400">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      producer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {producer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(producer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(producer)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      ✏️ Edit
                    </button>
                    {deleteConfirm === producer._id ? (
                      <span className="space-x-2">
                        <button
                          onClick={() => handleDelete(producer._id)}
                          className="text-red-600 hover:text-red-900 font-bold"
                        >
                          ✓ Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          ✕ Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(producer._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Producers Found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new producer.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'add' ? '🌿 Add New Producer' : '✏️ Edit Producer'}
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
                    
                    <div>
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

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                      Producer Account is Active
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
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                >
                  {modalMode === 'add' ? 'Create Producer' : 'Update Producer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
