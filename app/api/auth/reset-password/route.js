import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { token, password } = body

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Update password and clear reset token fields
    // TODO: Hash password with bcrypt before storing
    await User.updateOne(
      { _id: user._id },
      {
        $set: { password: password },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" }
      }
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.',
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}
