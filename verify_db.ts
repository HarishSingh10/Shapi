import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import dbConnect from './lib/db';
import Product from './models/Product';
import Settings from './models/Settings';

async function verify() {
    try {
        await dbConnect();
        
        const productCount = await Product.countDocuments();
        console.log(`Product Count: ${productCount}`);
        
        const products = await Product.find({}, 'name price slug');
        console.log('Products in DB:');
        products.forEach(p => console.log(`- ${p.name} (₹${p.price}) [${p.slug}]`));
        
        const settings = await Settings.findOne({ key: 'global' });
        console.log(`Active Festival: ${settings?.activeFestival || 'none'}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
