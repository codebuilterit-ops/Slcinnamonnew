'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading">About Us</h1>
            <p className="text-xl text-brown-100 max-w-3xl">
              Your trusted source for authentic Ceylon cinnamon from Sri Lanka
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  Welcome to SL Cinnamon, Sri Lanka's premier online marketplace connecting cinnamon producers 
                  directly with vendors and customers worldwide. We are passionate about bringing the world's 
                  finest Ceylon cinnamon from the verdant hills of Sri Lanka to your doorstep.
                </p>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  Founded with a vision to empower local cinnamon producers and make authentic Ceylon cinnamon 
                  accessible to everyone, we have created a platform that bridges tradition with technology.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our marketplace features carefully vetted producers and vendors who share our commitment to 
                  quality, authenticity, and sustainable farming practices.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl p-8 transform rotate-3">
                  <div className="bg-white rounded-xl p-8 transform -rotate-3">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 rounded-full p-4">
                          <span className="text-4xl">🌿</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">100% Authentic</h3>
                          <p className="text-gray-600">Pure Ceylon Cinnamon</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-4">
                          <span className="text-4xl">👨‍🌾</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Local Producers</h3>
                          <p className="text-gray-600">Supporting Sri Lankan Farmers</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-amber-100 rounded-full p-4">
                          <span className="text-4xl">🏪</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Trusted Vendors</h3>
                          <p className="text-gray-600">Verified Quality Sellers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ceylon Cinnamon */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Why Ceylon Cinnamon?</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Ceylon cinnamon, known as "true cinnamon," is prized worldwide for its delicate flavor and numerous health benefits
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-md hover:shadow-xl transition">
                <div className="text-5xl mb-4">💚</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Health Benefits</h3>
                <p className="text-gray-700">
                  Rich in antioxidants, helps regulate blood sugar, and supports heart health naturally.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 shadow-md hover:shadow-xl transition">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Superior Quality</h3>
                <p className="text-gray-700">
                  Softer, sweeter flavor profile compared to cassia cinnamon, with lower coumarin content.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-md hover:shadow-xl transition">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Geographic Origin</h3>
                <p className="text-gray-700">
                  Exclusively grown in Sri Lanka's unique climate and soil conditions for centuries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Mission & Values</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-brown-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Assurance</h3>
                    <p className="text-gray-700 text-lg">
                      We ensure every product meets the highest standards of quality and authenticity through 
                      rigorous verification processes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brown-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Empowering Producers</h3>
                    <p className="text-gray-700 text-lg">
                      We provide a direct marketplace for cinnamon producers to reach customers worldwide, 
                      ensuring fair prices and sustainable livelihoods.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brown-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Satisfaction</h3>
                    <p className="text-gray-700 text-lg">
                      Your trust and satisfaction are our top priorities. We're committed to providing excellent 
                      service and authentic products.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brown-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sustainable Practices</h3>
                    <p className="text-gray-700 text-lg">
                      We promote environmentally friendly farming methods that protect Sri Lanka's natural 
                      resources for future generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-brown-600 to-brown-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-brown-100 mb-8 max-w-2xl mx-auto">
              Whether you're a producer, vendor, or customer, we invite you to be part of our 
              mission to share authentic Ceylon cinnamon with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-brown-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-brown-50 transition shadow-lg"
              >
                Register Now
              </Link>
              <Link
                href="/shop"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition shadow-lg"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">SL Cinnamon</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted source for authentic Ceylon cinnamon from Sri Lanka. Connecting producers with the world.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link href="/shop" className="text-gray-400 hover:text-white transition">Shop</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* For Users */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">For Users</h4>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-gray-400 hover:text-white transition">Register</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
                <li><Link href="/vendor/dashboard" className="text-gray-400 hover:text-white transition">Vendor Dashboard</Link></li>
                <li><Link href="/producer/dashboard" className="text-gray-400 hover:text-white transition">Producer Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  <a href="tel:0767472935" className="hover:text-white transition">076 747 2935</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  <a href="mailto:info@slcinnamon.com" className="hover:text-white transition">info@slcinnamon.com</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>Colombo, Sri Lanka</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 SL Cinnamon. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">About</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact</Link>
                <Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">Blog</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
