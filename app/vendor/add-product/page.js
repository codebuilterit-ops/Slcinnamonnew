"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import axios from "axios";
export default function AddProduct() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cinnamon Sticks",
    stock: "",
    unit: "kg",
    images: [""],
    specifications: {
      origin: "",
      grade: "",
      moisture: "",
      oilContent: "",
    },
  });
  const categories = [
    "Cinnamon Sticks",
    "Cinnamon Powder",
    "Cinnamon Oil",
    "Cinnamon Tea",
    "Other",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("spec_")) {
      const specName = name.replace("spec_", "");
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };
  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };
  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newUploadedImages = [];
    
    for (const file of files) {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
          file: file,
          preview: event.target.result,
          name: file.name
        };
        setUploadedImages(prev => [...prev, imageData]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Collect all image URLs (from URL inputs)
      const imageUrls = formData.images.filter((img) => img.trim() !== "");
      
      // For uploaded images, convert to base64 or use the preview URLs
      const uploadedImageUrls = uploadedImages.map(img => img.preview);
      
      // Combine all images
      const allImages = [...imageUrls, ...uploadedImageUrls];

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: allImages,
        vendor: currentUser._id,
        vendorName: currentUser.businessName || currentUser.name,
        status: "active",
      };
      const response = await axios.post(`/api/products`, productData);
      if (response.data.success) {
        alert("Product added successfully!");
        router.push("/vendor/products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.error || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-heading">
        Add New Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
              placeholder="e.g., Ceylon Cinnamon Sticks"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
              placeholder="Describe your product in detail... Include information about quality, packaging, certifications, etc."
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stock Quantity *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="stock"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                placeholder="0"
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          
          {/* Image Upload Section */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image.preview} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image URL Section */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Or add image URLs:</p>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-sm text-brown-600 hover:text-brown-700"
            >
              + Add Another Image URL
            </button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="spec_origin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Origin
              </label>
              <input
                type="text"
                id="spec_origin"
                name="spec_origin"
                value={formData.specifications.origin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                placeholder="e.g., Sri Lanka"
              />
            </div>
            <div>
              <label
                htmlFor="spec_grade"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Grade
              </label>
              <input
                type="text"
                id="spec_grade"
                name="spec_grade"
                value={formData.specifications.grade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                placeholder="e.g., Premium A"
              />
            </div>
            <div>
              <label
                htmlFor="spec_moisture"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Moisture Content
              </label>
              <input
                type="text"
                id="spec_moisture"
                name="spec_moisture"
                value={formData.specifications.moisture}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                placeholder="e.g., 12%"
              />
            </div>
            <div>
              <label
                htmlFor="spec_oilContent"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Oil Content
              </label>
              <input
                type="text"
                id="spec_oilContent"
                name="spec_oilContent"
                value={formData.specifications.oilContent}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                placeholder="e.g., 2.5%"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-brown-600 text-white py-3 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
