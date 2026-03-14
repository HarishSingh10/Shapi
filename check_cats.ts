import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

async function checkCategories() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('MONGODB_URI not found');
        process.exit(1);
    }
    await mongoose.connect(mongoUri);
    const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({ category: String }));
    const categories = await Product.distinct('category');
    console.log('Categories in DB:', categories);
    process.exit(0);
}

checkCategories();
