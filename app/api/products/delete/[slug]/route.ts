import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    const product = await Product.findOneAndDelete({ slug });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    console.log(`Product deleted: ${slug}`);
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(`Failed to delete product (${params}):`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
