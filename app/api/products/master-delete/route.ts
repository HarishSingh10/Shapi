import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json({ error: 'No product ID provided' }, { status: 400 });
    }

    await dbConnect();
    console.log(`MASTER DELETE: Attempting to remove ${productId}`);
    
    // Attempt delete by _id
    let deleted = null;
    try {
      deleted = await Product.findByIdAndDelete(productId);
    } catch (e: any) {
      if (e.name !== 'CastError') throw e; // Only ignore cast errors (meaning it's not an ID, probably a slug)
    }
    
    if (!deleted) {
      // Fallback for slug if ID didn't match (for safety)
      const deletedBySlug = await Product.findOneAndDelete({ slug: productId });
      if (!deletedBySlug) {
        return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
      }
    }
    
    return NextResponse.json({ success: true, message: 'Wiped from database' });
  } catch (error: any) {
    console.error('MASTER DELETE CRITICAL ERROR:', error);
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 });
  }
}
