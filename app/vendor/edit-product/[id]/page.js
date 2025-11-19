'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import axios from 'axios'

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${params.id}`)
      if (response.data.success) {
        const product = response.data.data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          stock: product.stock || '',
          image: '',
          imageUrl: product.images?.[0] || ''
        })
        if (product.images?.[0]) {
          setImagePreview(product.images[0])
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Failed to load product')
      router.push('/vendor/products')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imageUrl: ''
        }))
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imageUrl: ''
        }))
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      image: ''
    }))
    if (url) {
      setImagePreview(url)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: '',
      imageUrl: ''
    }))
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        vendor: currentUser._id,
        images: formData.image ? [formData.image] : (formData.imageUrl ? [formData.imageUrl] : [])
      }

      const response = await axios.put(`/api/products/${params.id}`, productData)

      if (response.data.success) {
        alert('Product updated successfully!')
        router.push('/vendor/products')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert(error.response?.data?.error || 'Failed to update product')
    } finally {
      setSubmitting(false)
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">Edit Product</h1>
        <p className="mt-2 text-sm text-gray-600">Update your product information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            placeholder="e.g., Ceylon Cinnamon Sticks"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            placeholder="Describe your product..."
          />
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
          >
            <option value="">Select a category</option>
            <option value="Cinnamon Sticks">Cinnamon Sticks</option>
            <option value="Cinnamon Powder">Cinnamon Powder</option>
            <option value="Cinnamon Oil">Cinnamon Oil</option>
            <option value="Cinnamon Tea">Cinnamon Tea</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Upload Area */}
          {!imagePreview && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
                dragActive ? 'border-brown-500 bg-brown-50' : 'border-gray-300'
              }`}
            >
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="text-brown-600 font-medium hover:underline">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </label>
            </div>
          )}

          {/* Image URL Input */}
          <div className="mt-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Or enter image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:flex-1 px-6 py-2.5 bg-brown-600 text-white rounded-md hover:bg-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/vendor/products')}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
