import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/lib/models/Product'

// GET /api/products/[id] - Get a single product
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const product = await Product.findById(params.id)
      .populate('vendor', 'name businessName email')
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('vendor', 'name businessName email')
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    const product = await Product.findByIdAndDelete(params.id)
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
