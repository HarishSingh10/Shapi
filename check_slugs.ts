import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

import Product from './models/Product';

async function list() {
  await mongoose.connect(MONGODB_URI as string);
  console.log('Connected to MongoDB');
  const products = await Product.find({});
  console.log(JSON.stringify(products.map(p => ({ name: p.name, slug: p.slug, id: p._id })), null, 2));
  process.exit(0);
}

list().catch(err => {
  console.error(err);
  process.exit(1);
});
