import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate input
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      // Don't reveal that the user doesn't exist for security
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    
    // Hash the token before storing in database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    // Set token and expiration (1 hour from now)
    // Using updateOne to bypass validation issues
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: new Date(Date.now() + 3600000)
        }
      }
    )

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // TODO: Send email with reset link
    // For now, we'll return the link in the response (for development only)
    // In production, you should send this via email and not return it
    console.log('Password reset link:', resetUrl)

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
        // Remove this in production - only for development
        resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
