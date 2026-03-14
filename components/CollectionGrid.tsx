'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useFestival } from './FestivalContext';

export function CollectionGrid() {
    const params = useParams();
    const slug = (params?.slug as string) || '';
    const { activeFestival } = useFestival();
    
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filters State
    const [availability, setAvailability] = useState('all');
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [sortBy, setSortBy] = useState('Best Selling');
    const [activeDropdown, setActiveDropdown] = useState<'availability' | 'price' | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                const allProducts = Array.isArray(data) ? data : [];
                
                // Filter by category slug
                // Convert slug 'home-care' to 'home care' and compare case-insensitively
                const normalizedSlug = slug.replace(/-/g, ' ').toLowerCase();
                const filtered = allProducts.filter(p => 
                    p.category.toLowerCase() === normalizedSlug || 
                    p.category.toLowerCase() === slug.toLowerCase()
                );
                
                setProducts(filtered);
            } catch (err) {
                console.error('Failed to fetch collection products:', err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchProducts();
    }, [slug]);

    if (loading) {
        return (
            <div className="py-20 text-center bg-black">
                <div className="text-[#D4AF37] font-bold tracking-[0.3em] animate-pulse uppercase">Opening Collection Vault...</div>
            </div>
        );
    }

    const title = slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const isFestival = activeFestival !== 'none';
    const highestPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;

    let filtered = products;

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

    // Sort
    const sortOptions = {
        'Price: Low to High': (a: any, b: any) => a.price - b.price,
        'Price: High to Low': (a: any, b: any) => b.price - a.price,
        'Alphabetical': (a: any, b: any) => a.name.localeCompare(b.name),
        'Best Selling': (a: any, b: any) => 0
    };

    if (sortBy !== 'Best Selling' && sortBy in sortOptions) {
        filtered = [...filtered].sort((sortOptions as any)[sortBy]);
    }

    return (
        <section className="pt-36 pb-20 bg-black min-h-screen">
            <div className="container-custom mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-3 uppercase tracking-tight">
                        {title.split(' ')[0]} <span className="text-[#D4AF37]">{title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-white/50 text-sm max-w-lg">Discover our premium range of {title.toLowerCase()} solutions.</p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-8 mb-12 py-4 border-y border-white/5">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-black">Refine:</span>
                    
                    {/* Availability */}
                    <div className="relative">
                        <button 
                            onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')}
                            className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
                        >
                            Availability <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'availability' ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === 'availability' && (
                            <div className="absolute top-full left-0 z-50 mt-4 bg-[#0F0F0F] border border-white/10 p-6 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[240px]">
                                <div className="space-y-4">
                                    {['all', 'in-stock', 'out-of-stock'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="radio" 
                                                name="col-availability" 
                                                checked={availability === opt} 
                                                onChange={() => setAvailability(opt)}
                                                className="w-4 h-4 rounded-full border-white/20 bg-transparent text-[#D4AF37] focus:ring-0"
                                            />
                                            <span className="text-xs text-white/60 group-hover:text-white uppercase tracking-widest font-medium">
                                                {opt.replace('-', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="relative">
                        <button 
                            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
                            className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
                        >
                            Price Range <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === 'price' && (
                            <div className="absolute top-full left-0 z-50 mt-4 bg-[#0F0F0F] border border-white/10 p-6 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[300px]">
                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Highest price: ₹{highestPrice}</p>
                                <div className="flex gap-4">
                                    <input 
                                        type="number" 
                                        placeholder="Min" 
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full bg-black border border-white/10 p-3 text-xs text-white rounded-lg outline-none focus:border-[#D4AF37]"
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Max" 
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full bg-black border border-white/10 p-3 text-xs text-white rounded-lg outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                                <button 
                                    onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                                    className="mt-4 text-[10px] text-white/40 hover:text-[#D4AF37] uppercase tracking-widest underline font-bold"
                                >
                                    Clear Prices
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="ml-auto flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Sort By:</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-xs font-bold text-white uppercase tracking-widest outline-none cursor-pointer hover:text-[#D4AF37] transition-colors"
                            >
                                <option value="Best Selling" className="bg-black">Featured</option>
                                <option value="Price: Low to High" className="bg-black">Price: Low - High</option>
                                <option value="Price: High to Low" className="bg-black">Price: High - Low</option>
                                <option value="Alphabetical" className="bg-black">A - Z</option>
                            </select>
                        </div>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Showing {filtered.length} of {products.length}</span>
                    </div>
                </div>

                {/* Products */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map((product, index) => {
                            const currentPrice = isFestival ? Math.floor(product.price * 0.9) : product.price;
                            const originalPrice = isFestival ? product.price : (product.originalPrice || product.price);
                            const discount = originalPrice > currentPrice ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;

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
                                                                Festival Offer
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
                                            {product.stock > 0 && discount > 0 && (
                                                <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                                    -{discount}%
                                                </div>
                                            )}
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
                ) : (
                    <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/5">
                        <p className="text-white/40 uppercase tracking-[0.2em] text-sm">No products found in this category.</p>
                        <Link href="/products" className="mt-8 inline-block text-[#D4AF37] font-bold uppercase tracking-widest text-xs hover:underline">Browse All Products</Link>
                    </div>
                )}
            </div>
        </section>
    );
}
