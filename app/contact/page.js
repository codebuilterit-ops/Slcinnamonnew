'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading">Contact Us</h1>
            <p className="text-xl text-brown-100 max-w-3xl">
              Get in touch with us - we're here to help with all your Ceylon cinnamon needs
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brown-100 text-brown-700 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                      <p className="text-gray-600 mb-1">Call us directly</p>
                      <a href="tel:0767472935" className="text-brown-600 font-semibold text-lg hover:text-brown-700">
                        076 747 2935
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-700 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600 mb-1">Send us an email</p>
                      <a href="mailto:info@slcinnamon.com" className="text-brown-600 font-semibold hover:text-brown-700">
                        info@slcinnamon.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-700 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600 mb-1">Visit us</p>
                      <p className="text-brown-600 font-semibold">
                        Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 text-amber-700 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
                      <p className="text-gray-600 mb-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  {submitted && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">Thank you! Your message has been sent successfully.</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                          placeholder="076 747 2935"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                          placeholder="Inquiry about products"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brown-600 hover:bg-brown-700 text-white font-bold py-4 px-6 rounded-lg transition shadow-lg text-lg"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How can I become a vendor?</h3>
                <p className="text-gray-700">
                  Register on our platform, provide your business details, and our team will verify your account 
                  within 24-48 hours. Once approved, you can start listing your products.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-700">
                  Yes! Our vendors ship authentic Ceylon cinnamon worldwide. Shipping options and costs vary by 
                  vendor and destination.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How do I verify product authenticity?</h3>
                <p className="text-gray-700">
                  All our vendors are verified and must meet strict quality standards. Look for the "Verified" 
                  badge on vendor profiles and check product certifications.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We support various payment methods including credit/debit cards, bank transfers, and digital 
                  wallets. Specific options may vary by vendor.
                </p>
              </div>
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
