'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const allProducts = [
    { name: "Sapi's Premium Upholstery Cleaner", price: 499, originalPrice: 999, slug: "upholstery-cleaner", category: "Home Care", image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=500&auto=format&fit=crop", tag: "Best Seller" },
    { name: "Gazotronics 120W Car Charger", price: 1299, originalPrice: 2499, slug: "car-charger-120w", category: "Automotive", image: "/gazotronics_charger.png", tag: "Trending" },
    { name: "Herbal Insect Repellent", price: 299, originalPrice: 599, slug: "herbal-insect-repellent", category: "Home Protection", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop" },
    { name: "Organic Floor Cleaner", price: 349, originalPrice: 699, slug: "organic-floor-cleaner", category: "Home Care", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
    { name: "Complete Car Care Kit", price: 2499, originalPrice: 4999, slug: "car-care-kit", category: "Automotive", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=500&auto=format&fit=crop", tag: "Bundle" },
    { name: "Safety Self Defence Spray", price: 499, originalPrice: 899, slug: "self-defence-spray", category: "Women Safety", image: "/self_defense_placeholder.png", tag: "Must Have" },
    { name: "Nano Ceramic Wax", price: 1499, originalPrice: 2999, slug: "nano-ceramic-wax", category: "Automotive", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=500&auto=format&fit=crop", tag: "Best Seller" },
    { name: "Microfiber Kit", price: 899, originalPrice: 1499, slug: "microfiber-kit", category: "Automotive", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=500&auto=format&fit=crop" },
    { name: "Interior Cleaner", price: 699, originalPrice: 1299, slug: "interior-cleaner", category: "Automotive", image: "https://images.unsplash.com/photo-1621266046187-b956a953835e?q=80&w=500&auto=format&fit=crop" },
    { name: "Engine Degreaser", price: 599, originalPrice: 1199, slug: "engine-degreaser", category: "Automotive", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
    { name: "Motor Pro Chain Lube", price: 399, originalPrice: 799, slug: "chain-lube", category: "Automotive", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
    { name: "Detail Spray Wash & Shine", price: 449, originalPrice: 899, slug: "detail-spray", category: "Automotive", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop" },
    { name: "Carpet & Upholstery Cleaner", price: 549, originalPrice: 999, slug: "carpet-cleaner", category: "Home Care", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
    { name: "Glass Cleaner Premium", price: 299, originalPrice: 599, slug: "glass-cleaner", category: "Home Care", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
    { name: "Men's Grooming Kit", price: 1199, originalPrice: 2499, slug: "mens-grooming-kit", category: "Men's Grooming", image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=500&auto=format&fit=crop", tag: "Popular" },
    { name: "Pepper Spray Safety Kit", price: 799, originalPrice: 1499, slug: "pepper-spray-kit", category: "Women Safety", image: "/self_defense_placeholder.png" },
];

const categories = ['All', 'Automotive', 'Home Care', 'Home Protection', 'Women Safety', "Men's Grooming"];
const sortOptions = ['Best Selling', 'Price: Low to High', 'Price: High to Low', 'Alphabetical', 'Newest'];

export function AllProductsGrid() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Best Selling');
    const [showFilters, setShowFilters] = useState(false);

    let filtered = selectedCategory === 'All'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    // Sort
    if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'Alphabetical') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <section className="pb-20 bg-black">
            <div className="container-custom mx-auto px-6">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                    <p className="text-white/40 text-sm">{filtered.length} products</p>

                    <div className="flex items-center gap-4">
                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] text-sm transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter
                        </button>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-4 py-2 pr-10 rounded-none focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 text-xs uppercase tracking-wider border transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((product, index) => (
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
                                    {/* Sale badge */}
                                    <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </div>
                                    {/* Gradient Overlay */}
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
