"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import axios from "axios";
import { getAllDistricts, getCitiesForDistrict, getProvinceForDistrict } from "@/lib/data/sriLankaLocations";
export default function VendorProfile() {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    street: "",
    district: "",
    city: "",
    profileImage: "",
    description: "",
  });
  useEffect(() => {
    if (currentUser) {
      const district = currentUser.address?.district || "";
      const city = currentUser.address?.city || "";
      
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        businessName: currentUser.businessName || "",
        phone: currentUser.phone || "",
        street: currentUser.address?.street || "",
        district: district,
        city: city,
        profileImage: currentUser.profileImage || "",
        description: currentUser.description || "",
      });
      
      if (district) {
        setSelectedDistrict(district);
        const cities = getCitiesForDistrict(district);
        setAvailableCities(cities);
      }
    }
  }, [currentUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    if (district) {
      const cities = getCitiesForDistrict(district);
      setAvailableCities(cities);
      setFormData({
        ...formData,
        district: district,
        city: "",
      });
    } else {
      setAvailableCities([]);
      setFormData({
        ...formData,
        district: "",
        city: "",
      });
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData({
      ...formData,
      city: city,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview("");
    setFormData({
      ...formData,
      profileImage: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = {
        ...formData,
        address: {
          street: formData.street || undefined,
          city: formData.city || undefined,
          district: formData.district || undefined,
          province: formData.district ? getProvinceForDistrict(formData.district) : undefined,
          country: "Sri Lanka"
        }
      };
      delete updateData.street;
      delete updateData.city;
      delete updateData.district;
      
      const response = await axios.put(
        `/api/users/${currentUser._id}`,
        updateData
      );
      if (response.data.success) {
        alert("Profile updated successfully!");
        setEditing(false);
        // Update context and local storage
        updateUser(response.data.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Profile
        </h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-brown-500 to-brown-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
            <div className="relative">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <svg
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.businessName || formData.name}
              </h2>
              <p className="text-gray-600">{formData.email}</p>
            </div>
          </div>
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                    placeholder="No. 123, Main Street"
                  />
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    District *
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  >
                    <option value="">Select District</option>
                    {getAllDistricts().map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City/Town *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleCityChange}
                    required
                    disabled={!selectedDistrict || availableCities.length === 0}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedDistrict
                        ? "Select District First"
                        : availableCities.length === 0
                        ? "Loading cities..."
                        : "Select City/Town"}
                    </option>
                    {availableCities && availableCities.length > 0 && availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  
                  {/* Image Preview */}
                  {(imagePreview || formData.profileImage) && (
                    <div className="mb-4 relative inline-block">
                      <img
                        src={imagePreview || formData.profileImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* File Upload */}
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
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  
                  <p className="mt-2 text-xs text-gray-500">Or enter image URL:</p>
                  <input
                    type="url"
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                    placeholder="Tell us about your business..."
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brown-600 text-white py-3 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    const district = currentUser.address?.district || "";
                    setFormData({
                      name: currentUser.name || "",
                      email: currentUser.email || "",
                      businessName: currentUser.businessName || "",
                      phone: currentUser.phone || "",
                      street: currentUser.address?.street || "",
                      district: district,
                      city: currentUser.address?.city || "",
                      profileImage: currentUser.profileImage || "",
                      description: currentUser.description || "",
                    });
                    if (district) {
                      setSelectedDistrict(district);
                      setAvailableCities(getCitiesForDistrict(district));
                    }
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Full Name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.name || "Not set"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Business Name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.businessName || "Not set"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.phone || "Not set"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {[formData.street, formData.city, formData.district]
                      .filter(Boolean)
                      .join(", ") || "Not set"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Business Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.description || "No description provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
