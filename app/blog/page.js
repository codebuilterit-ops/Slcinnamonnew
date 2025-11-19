'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

const blogPosts = [
  {
    id: 1,
    title: 'Health Benefits of Ceylon Cinnamon: What Science Says',
    excerpt: 'Discover the scientifically-proven health benefits of Ceylon cinnamon, from blood sugar regulation to heart health support.',
    image: 'https://images.unsplash.com/photo-1599909533061-4bb52a0f71d7?w=800',
    author: 'Dr. Nimal Fernando',
    date: 'November 15, 2025',
    category: 'Health',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Ceylon Cinnamon vs Cassia: Understanding the Difference',
    excerpt: 'Learn why Ceylon cinnamon is considered superior to Cassia cinnamon and how to identify authentic Ceylon cinnamon.',
    image: 'https://images.unsplash.com/photo-1575058752200-a9d3c4b6e629?w=800',
    author: 'Sarah Perera',
    date: 'November 10, 2025',
    category: 'Education',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Traditional Cinnamon Harvesting Methods in Sri Lanka',
    excerpt: 'Explore the ancient techniques passed down through generations of Sri Lankan cinnamon farmers.',
    image: 'https://images.unsplash.com/photo-1543158181-e6f8a7302871?w=800',
    author: 'Ravi Jayasuriya',
    date: 'November 5, 2025',
    category: 'Culture',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: '10 Delicious Recipes Using Ceylon Cinnamon',
    excerpt: 'From breakfast to dessert, discover creative ways to incorporate Ceylon cinnamon into your daily meals.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    author: 'Chef Anushka Silva',
    date: 'November 1, 2025',
    category: 'Recipes',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'The Economic Impact of Ceylon Cinnamon in Sri Lanka',
    excerpt: 'Understanding how the cinnamon industry supports thousands of Sri Lankan families and the national economy.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    author: 'Prof. Kumara Bandara',
    date: 'October 28, 2025',
    category: 'Business',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'Sustainable Farming Practices for Cinnamon Cultivation',
    excerpt: 'How modern Sri Lankan farmers are adopting eco-friendly methods while preserving traditional knowledge.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    author: 'Chaminda Dias',
    date: 'October 22, 2025',
    category: 'Sustainability',
    readTime: '7 min read',
  },
]

const categories = ['All', 'Health', 'Education', 'Culture', 'Recipes', 'Business', 'Sustainability']

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading">Our Blog</h1>
            <p className="text-xl text-brown-100 max-w-3xl">
              Insights, stories, and knowledge about Ceylon cinnamon and Sri Lankan culture
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    category === 'All'
                      ? 'bg-brown-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-brown-600 font-semibold text-sm mb-2">{blogPosts[0].category}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-6">
                      <span className="mr-4">By {blogPosts[0].author}</span>
                      <span className="mr-4">•</span>
                      <span className="mr-4">{blogPosts[0].date}</span>
                      <span className="mr-4">•</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${blogPosts[0].id}`}
                      className="inline-flex items-center text-brown-600 font-semibold hover:text-brown-700"
                    >
                      Read More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-brown-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brown-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-brown-600 font-semibold text-sm hover:text-brown-700 inline-flex items-center"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-brown-600 text-white rounded-lg font-medium">1</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 border">2</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 border">3</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 border">Next →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-gradient-to-r from-brown-600 to-brown-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-xl text-brown-100 mb-8">
                Get the latest articles, recipes, and Ceylon cinnamon insights delivered to your inbox
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold transition"
                >
                  Subscribe
                </button>
              </form>
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
