import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'

// POST /api/seed-admin - Create initial admin user
// IMPORTANT: Remove or protect this route in production!
export async function POST(request) {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@slcinnamon.com' })
    
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists',
        email: 'admin@slcinnamon.com',
      })
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@slcinnamon.com',
      password: 'admin123456', // Change this password immediately after first login!
      role: 'admin',
      isActive: true,
    })
    
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        email: 'admin@slcinnamon.com',
        password: 'admin123456',
        note: 'Please change this password immediately after first login!',
      },
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        note: 'Make sure your MongoDB connection is working',
      },
      { status: 500 }
    )
  }
}

// GET /api/seed-admin - Just for testing if route works
export async function GET() {
  return NextResponse.json({
    message: 'Send a POST request to this endpoint to create an admin user',
    instructions: 'Use Postman or similar tool to POST to /api/seed-admin',
  })
}
