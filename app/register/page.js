"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getAllDistricts, getCitiesForDistrict, getProvinceForDistrict } from "@/lib/data/sriLankaLocations";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState("producer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    businessName: "",
    businessRegNo: "",
  });
  const [statusMessage, setStatusMessage] = useState({
    type: null,
    text: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    // Update available cities based on selected district
    if (district) {
      const cities = getCitiesForDistrict(district);
      setAvailableCities(cities);
      setFormData({
        ...formData,
        district: district,
        city: "", // Reset city when district changes
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: null, text: null });
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }
    try {
      // Save directly to MongoDB via API
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: accountType,
        phone: formData.phone || undefined,
        address: {
          street: formData.address || undefined,
          city: formData.city || undefined,
          district: formData.district || undefined,
          province: formData.district ? getProvinceForDistrict(formData.district) : undefined,
          country: "Sri Lanka"
        }
      };
      if (accountType === "vendor") {
        userData.businessName = formData.businessName;
      }
      console.log("Attempting to register user:", {
        ...userData,
        password: "***",
      });
      // Save to MongoDB
      const mongoResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("Response status:", mongoResponse.status);
      // Check if response is JSON
      const contentType = mongoResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await mongoResponse.text();
        console.error("Non-JSON response:", textResponse);

        // Try old auth system as fallback
        try {
          const oldAuthResponse = await register(userData, accountType);
          if (oldAuthResponse.success) {
            setStatusMessage({
              type: "success",
              text: "Registration successful! Redirecting to login...",
            });
            setTimeout(() => {
              router.push(
                `/login?message=${encodeURIComponent(
                  "Registration successful! Please login."
                )}`
              );
            }, 2000);
            return;
          }
        } catch (fallbackError) {
          console.error("Fallback registration also failed:", fallbackError);
        }

        throw new Error("Server error. Please try again later.");
      }
      const mongoData = await mongoResponse.json();
      console.log("MongoDB response:", mongoData);
      if (mongoData.success) {
        // Also register with old auth service for compatibility
        try {
          await register(userData, accountType);
        } catch (oldAuthError) {
          console.log("Old auth system error (can be ignored):", oldAuthError);
        }
        setStatusMessage({
          type: "success",
          text: "Registration successful! Redirecting to login...",
        });

        setTimeout(() => {
          router.push(
            `/login?message=${encodeURIComponent(
              "Registration successful! Please login with your credentials."
            )}`
          );
        }, 2000);
      } else {
        setStatusMessage({
          type: "error",
          text: mongoData.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatusMessage({
        type: "error",
        text: error.message || "An error occurred during registration.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-heading">
              Create Account
            </h1>
            <p className="text-gray-600 mt-2">Join our marketplace today</p>
          </div>
          {statusMessage.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setAccountType("producer")}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                accountType === "producer"
                  ? "border-brown-600 bg-brown-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div
                  className={`text-5xl mb-3 ${
                    accountType === "producer" ? "filter drop-shadow" : ""
                  }`}
                >
                  👤
                </div>
                <h3 className="font-semibold text-lg mb-2">Cinnamon Producer</h3>
                <p className="text-sm text-gray-600">
                  Browse and purchase Ceylon cinnamon products
                </p>
              </div>
              {accountType === "producer" && (
                <div className="absolute top-3 right-3">
                  <svg
                    className="w-6 h-6 text-brown-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAccountType("vendor")}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                accountType === "vendor"
                  ? "border-brown-600 bg-brown-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div
                  className={`text-5xl mb-3 ${
                    accountType === "vendor" ? "filter drop-shadow" : ""
                  }`}
                >
                  🏪
                </div>
                <h3 className="font-semibold text-lg mb-2">Shop</h3>
                <p className="text-sm text-gray-600">
                  Sell your Ceylon cinnamon products online
                </p>
              </div>
              {accountType === "vendor" && (
                <div className="absolute top-3 right-3">
                  <svg
                    className="w-6 h-6 text-brown-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  placeholder="+94 XX XXX XXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  placeholder="No. 123, Main Street"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  District {accountType === "vendor" && "*"}
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  required={accountType === "vendor"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
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
                  City/Town {accountType === "vendor" && "*"}
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  required={accountType === "vendor"}
                  disabled={!selectedDistrict || availableCities.length === 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            </div>
            {accountType === "vendor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Business Name *
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required={accountType === "vendor"}
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="businessRegNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Business Registration No
                  </label>
                  <input
                    id="businessRegNo"
                    name="businessRegNo"
                    type="text"
                    value={formData.businessRegNo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brown-600 text-white py-3 px-4 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-brown-600 hover:text-brown-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
