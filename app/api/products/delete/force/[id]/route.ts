import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    console.log(`Force Delete Attempt for identifier: ${id}`);
    
    // Try deleting by ID first, then by slug if ID doesn't work
    let product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      product = await Product.findOneAndDelete({ slug: id });
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete API Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
