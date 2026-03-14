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
    
    console.log(`Backend: Deleting product ID: ${id}`);
    
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      console.log(`Backend Error: Product ${id} not found`);
      return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
    }
    
    console.log(`Backend Success: Product ${id} deleted`);
    return NextResponse.json({ message: 'Product deleted successfully', id });
  } catch (error) {
    console.error('Backend Critical Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
