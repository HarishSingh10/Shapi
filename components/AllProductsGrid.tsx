'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useFestival } from './FestivalContext';

const sortOptions = ['Best Selling', 'Price: Low to High', 'Price: High to Low', 'Alphabetical', 'Newest'];

export function AllProductsGrid() {
    const { activeFestival } = useFestival();
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Best Selling');
    const [showFilters, setShowFilters] = useState(false);
    
    // Detailed Filters State
    const [availability, setAvailability] = useState('all');
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [activeDropdown, setActiveDropdown] = useState<'availability' | 'price' | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setAllProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center bg-black">
                <div className="text-[#D4AF37] font-bold tracking-[0.3em] animate-pulse uppercase">Syncing Premium Collection...</div>
            </div>
        );
    }

    const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];
    const highestPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 0;

    let filtered = allProducts;

    // Category Filter
    if (selectedCategory !== 'All') {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Availability Filter
    if (availability === 'in-stock') {
        filtered = filtered.filter(p => p.stock > 0);
    } else if (availability === 'out-of-stock') {
        filtered = filtered.filter(p => p.stock <= 0);
    }

    // Price Filter
    if (minPrice !== '') {
        filtered = filtered.filter(p => p.price >= (minPrice as number));
    }
    if (maxPrice !== '') {
        filtered = filtered.filter(p => p.price <= (maxPrice as number));
    }

    // Festival pricing logic applied globally for preview
    const isFestival = activeFestival !== 'none';

    // Sort
    if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'Alphabetical') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <section className="pb-20 bg-black">
            <div className="container-custom mx-auto px-6">

                {/* New Filter Bar (Shopify Style) */}
                <div className="flex flex-wrap items-center gap-8 mb-12">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Filter:</span>
                    
                    {/* Availability Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')}
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors py-2"
                        >
                            Availability <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'availability' ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === 'availability' && (
                            <div className="absolute top-full left-0 z-50 mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 shadow-2xl min-w-[240px]">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">0 selected</span>
                                    <button onClick={() => setAvailability('all')} className="text-[10px] text-white/60 hover:text-[#D4AF37] underline uppercase tracking-widest">Reset</button>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="availability" 
                                            checked={availability === 'in-stock'} 
                                            onChange={() => setAvailability('in-stock')}
                                            className="w-4 h-4 rounded border-white/20 bg-transparent text-[#D4AF37] focus:ring-0"
                                        />
                                        <span className="text-xs text-white/70 group-hover:text-white">In stock ({allProducts.filter(p => p.stock > 0).length})</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="availability" 
                                            checked={availability === 'out-of-stock'} 
                                            onChange={() => setAvailability('out-of-stock')}
                                            className="w-4 h-4 rounded border-white/20 bg-transparent text-[#D4AF37] focus:ring-0"
                                        />
                                        <span className="text-xs text-white/70 group-hover:text-white">Out of stock ({allProducts.filter(p => p.stock <= 0).length})</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="availability" 
                                            checked={availability === 'all'} 
                                            onChange={() => setAvailability('all')}
                                            className="w-4 h-4 rounded border-white/20 bg-transparent text-[#D4AF37] focus:ring-0"
                                        />
                                        <span className="text-xs text-white/70 group-hover:text-white">All Products</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors py-2"
                        >
                            Price <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === 'price' && (
                            <div className="absolute top-full left-0 z-50 mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 shadow-2xl min-w-[320px]">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <span className="text-[11px] text-white/70">The highest price is Rs. {highestPrice.toFixed(2)}</span>
                                    <button 
                                        onClick={() => { setMinPrice(''); setMaxPrice(''); }} 
                                        className="text-[11px] text-white/60 hover:text-[#D4AF37] underline uppercase tracking-widest"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">₹</span>
                                        <input 
                                            type="number"
                                            placeholder="From"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full bg-black border border-white/10 rounded-lg pl-7 pr-3 py-3 text-xs text-white outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">₹</span>
                                        <input 
                                            type="number"
                                            placeholder="To"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full bg-black border border-white/10 rounded-lg pl-7 pr-3 py-3 text-xs text-white outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-white/40 text-xs">{filtered.length} products</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white/5 border border-white/10 text-white text-[11px] uppercase tracking-widest px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Category Quick Chips */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 ${selectedCategory === cat
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                : 'bg-transparent text-white/50 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((product, index) => {
                        const currentPrice = isFestival ? Math.floor(product.price * 0.9) : product.price;
                        const originalPrice = isFestival ? product.price : (product.originalPrice || product.price);
                        
                        return (
                            <motion.div
                                key={product.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/products/${product.slug}`} className="group block bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl">
                                    <div className="relative aspect-square overflow-hidden bg-black">
                                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                            {product.stock <= 0 ? (
                                                <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                                                    Out Of Stock
                                                </div>
                                            ) : (
                                                <>
                                                    {isFestival && (
                                                        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                                                            Festival Sale
                                                        </div>
                                                    )}
                                                    {product.tag && (
                                                        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                                                            {product.tag}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${product.stock <= 0 ? 'grayscale brightness-50' : 'brightness-90 group-hover:brightness-100 group-hover:scale-110'}`}
                                        />
                                        {/* Sale badge */}
                                        {product.stock > 0 && originalPrice > currentPrice && (
                                            <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                                -{Math.round((1 - currentPrice / originalPrice) * 100)}%
                                            </div>
                                        )}
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white text-sm font-bold leading-tight mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2 uppercase tracking-wide min-h-[2.5rem]">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                                            <span className="text-[#D4AF37] font-bold text-lg">₹{currentPrice.toLocaleString()}</span>
                                            {originalPrice > currentPrice && (
                                                <span className="text-white/30 text-xs line-through">₹{originalPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
