'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collectionsData: Record<string, { title: string; description: string; products: any[] }> = {
    automotive: {
        title: "Automotive Care",
        description: "Premium automotive care products designed to keep your vehicle in showroom condition.",
        products: [
            { name: "Gazotronics 120W Car Charger", price: 1299, originalPrice: 2499, slug: "car-charger-120w", image: "/gazotronics_charger.png", tag: "Trending" },
            { name: "Complete Car Care Kit", price: 2499, originalPrice: 4999, slug: "car-care-kit", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=500&auto=format&fit=crop", tag: "Bundle" },
            { name: "Nano Ceramic Wax", price: 1499, originalPrice: 2999, slug: "nano-ceramic-wax", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=500&auto=format&fit=crop", tag: "Best Seller" },
            { name: "Interior Cleaner", price: 699, originalPrice: 1299, slug: "interior-cleaner", image: "https://images.unsplash.com/photo-1621266046187-b956a953835e?q=80&w=500&auto=format&fit=crop" },
            { name: "Engine Degreaser", price: 599, originalPrice: 1199, slug: "engine-degreaser", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
            { name: "Motor Pro Chain Lube", price: 399, originalPrice: 799, slug: "chain-lube", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
            { name: "Detail Spray Wash & Shine", price: 449, originalPrice: 899, slug: "detail-spray", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
            { name: "Microfiber Kit", price: 899, originalPrice: 1499, slug: "microfiber-kit", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=500&auto=format&fit=crop" },
        ],
    },
    'home-care': {
        title: "Home Care",
        description: "Keep your home pristine with our premium cleaning solutions.",
        products: [
            { name: "Sapi's Premium Upholstery Cleaner", price: 499, originalPrice: 999, slug: "upholstery-cleaner", image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=500&auto=format&fit=crop", tag: "Best Seller" },
            { name: "Organic Floor Cleaner", price: 349, originalPrice: 699, slug: "organic-floor-cleaner", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
            { name: "Carpet & Upholstery Cleaner", price: 549, originalPrice: 999, slug: "carpet-cleaner", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
            { name: "Glass Cleaner Premium", price: 299, originalPrice: 599, slug: "glass-cleaner", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
        ],
    },
    'women-safety': {
        title: "Women Safety",
        description: "Essential safety tools designed to empower and protect.",
        products: [
            { name: "Safety Self Defence Spray", price: 499, originalPrice: 899, slug: "self-defence-spray", image: "/self_defense_placeholder.png", tag: "Must Have" },
            { name: "Pepper Spray Safety Kit", price: 799, originalPrice: 1499, slug: "pepper-spray-kit", image: "/self_defense_placeholder.png" },
        ],
    },
    'mens-grooming': {
        title: "Men's Grooming",
        description: "Premium personal care products for the modern man.",
        products: [
            { name: "Men's Grooming Kit", price: 1199, originalPrice: 2499, slug: "mens-grooming-kit", image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=500&auto=format&fit=crop", tag: "Popular" },
        ],
    },
};

export function CollectionGrid() {
    const params = useParams();
    const slug = params?.slug as string;
    const collection = collectionsData[slug] || { title: "Collection", description: "Browse our curated collection.", products: [] };

    return (
        <section className="pt-36 pb-20 bg-black">
            <div className="container-custom mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-3">
                        {collection.title.split(' ')[0]} <span className="text-[#D4AF37]">{collection.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-white/50 text-sm max-w-lg">{collection.description}</p>
                    <p className="text-white/30 text-xs mt-3">{collection.products.length} products</p>
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {collection.products.map((product, index) => (
                        <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/products/${product.slug}`} className="group block bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl">
                                <div className="relative aspect-square overflow-hidden bg-black">
                                    {product.tag && (
                                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                                            {product.tag}
                                        </div>
                                    )}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out brightness-90 group-hover:brightness-100"
                                    />
                                    <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white text-sm font-bold leading-tight mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2 uppercase tracking-wide min-h-[2.5rem]">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                                        <span className="text-[#D4AF37] font-bold text-lg">₹{product.price.toLocaleString()}</span>
                                        <span className="text-white/30 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
