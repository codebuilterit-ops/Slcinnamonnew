"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VendorCard from "@/components/VendorCard";
import Link from "next/link";
import axios from "axios";
import { getAllDistricts, getCitiesForDistrict } from "@/lib/data/sriLankaLocations";
export default function ShopPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users?role=vendor`);
      if (response.data.success && Array.isArray(response.data.data)) {
        // Filter only approved vendors
        const approvedVendors = response.data.data.filter(
          (vendor) => vendor.isApproved === true || vendor.approvalStatus === 'approved'
        );
        // Map MongoDB user data to shop format
        const mappedShops = approvedVendors.map((user) => ({
          _id: user._id,
          id: user._id,
          name: user.businessName || user.name,
          category: "Cinnamon Shop",
          logo:
            user.profileImage ||
            "https://via.placeholder.com/300x300?text=" +
              (user.businessName || user.name),
          profileImage: user.profileImage,
          image: user.profileImage,
          rating: 4.5,
          productCount: 0,
          email: user.email,
          phone: user.phone,
          address: user.address,
          description: user.description,
        }));
        setShops(mappedShops);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shop.description &&
        shop.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDistrict = !selectedDistrict || 
      (shop.address?.district && shop.address.district === selectedDistrict);
    
    const matchesCity = !selectedCity || 
      (shop.address?.city && shop.address.city === selectedCity);
    
    return matchesSearch && matchesDistrict && matchesCity;
  });
  
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCity("");
    
    if (district) {
      const cities = getCitiesForDistrict(district);
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }
  };
  
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDistrict("");
    setSelectedCity("");
    setAvailableCities([]);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Ceylon Cinnamon Shops
            </h1>
            <p className="text-xl text-brown-100 max-w-2xl">
              Discover trusted shops offering premium quality Ceylon cinnamon
              products from Sri Lanka
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Search Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-lg font-bold mb-4 font-heading">
                  Filter Shops
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Search shops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  />
                </div>

                {/* District Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500"
                  >
                    <option value="">All Districts</option>
                    {getAllDistricts().map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Town
                  </label>
                  <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!selectedDistrict || availableCities.length === 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedDistrict
                        ? "Select District First"
                        : availableCities.length === 0
                        ? "No cities available"
                        : "All Cities"}
                    </option>
                    {availableCities && availableCities.length > 0 && availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </aside>
            {/* Shops Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredShops.length} of {shops.length} shops
                </p>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
                </div>
              ) : filteredShops.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No shops found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search terms.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredShops.map((shop) => (
                    <VendorCard key={shop._id || shop.id} vendor={shop} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 SL Cinnamon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
