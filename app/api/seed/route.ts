import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

const initialProducts = [
    {
        name: "Sapi's Premium Upholstery Cleaner",
        price: 499,
        originalPrice: 799,
        category: "home-care",
        image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=2070&auto=format&fit=crop",
        description: "Professional grade upholstery cleaner for deep stains.",
        tag: "Best Seller",
        stock: 50,
        features: ["Anti-bacterial", "Safe for all fabrics", "Instant dry"]
    },
    {
        name: "Gazotronics 120W Car Charger",
        price: 1299,
        originalPrice: 1999,
        category: "automotive",
        image: "/gazotronics_charger.png",
        description: "Ultra-fast GaN car charger with triple ports.",
        tag: "Trending",
        stock: 30,
        features: ["120W output", "Triple port", "Overheat protection"]
    },
    {
        name: "Herbal Insect Repellent",
        price: 299,
        originalPrice: 450,
        category: "home-care",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        description: "Natural herbal insect repellent for safe family use.",
        tag: "Essential",
        stock: 100,
        features: ["Chemical free", "Skin safe", "Long lasting"]
    },
    {
        name: "Organic Floor Cleaner",
        price: 349,
        originalPrice: 500,
        category: "home-care",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        description: "Eco-friendly floor cleaner with natural citrus scent.",
        stock: 40,
        features: ["Eco-friendly", "Safe for pets", "Citrus fragrance"]
    }
];

export async function POST() {
    try {
        await dbConnect();
        for (const p of initialProducts) {
            const slug = p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            await Product.findOneAndUpdate(
                { slug },
                { ...p, slug },
                { upsert: true }
            );
        }
        return NextResponse.json({ message: 'Success' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
