"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import axios from "axios";

export default function ProducerProducts() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all active products
      const response = await axios.get("/api/products?status=active");
      
      if (response.data.success) {
        setProducts(response.data.data || []);
      } else {
        setError("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Available Products
        </h1>
        <p className="text-gray-600 mt-2">
          Browse Ceylon cinnamon products from our verified vendors
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No products available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new products from our vendors.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-lg font-bold text-brown-600">
                      ${product.price?.toFixed(2) || "0.00"}
                    </span>
                    {product.unit && (
                      <span className="text-sm text-gray-500 ml-1">
                        / {product.unit}
                      </span>
                    )}
                  </div>
                </div>

                {product.category && (
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 text-xs bg-brown-100 text-brown-700 rounded">
                      {product.category}
                    </span>
                  </div>
                )}

                {product.vendor && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Vendor:{" "}
                      <span className="font-medium text-gray-700">
                        {product.vendor.businessName || product.vendor.name}
                      </span>
                    </p>
                  </div>
                )}

                <button className="mt-4 w-full bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-700 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
