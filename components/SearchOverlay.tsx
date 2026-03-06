'use client';

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Sample products data for search (will be replaced with real data later)
const allProducts = [
    { name: "Sapi's Premium Upholstery Cleaner", price: "₹499", slug: "upholstery-cleaner", category: "Home Care" },
    { name: "Gazotronics 120W Car Charger", price: "₹1,299", slug: "car-charger-120w", category: "Automotive" },
    { name: "Herbal Insect Repellent", price: "₹299", slug: "herbal-insect-repellent", category: "Home Protection" },
    { name: "Organic Floor Cleaner", price: "₹349", slug: "organic-floor-cleaner", category: "Home Care" },
    { name: "Complete Car Care Kit", price: "₹2,499", slug: "car-care-kit", category: "Automotive" },
    { name: "Safety Self Defence Spray", price: "₹499", slug: "self-defence-spray", category: "Women Safety" },
    { name: "Nano Ceramic Wax", price: "₹1,499", slug: "nano-ceramic-wax", category: "Automotive" },
    { name: "Microfiber Kit", price: "₹899", slug: "microfiber-kit", category: "Automotive" },
    { name: "Interior Cleaner", price: "₹699", slug: "interior-cleaner", category: "Automotive" },
    { name: "Engine Degreaser", price: "₹599", slug: "engine-degreaser", category: "Automotive" },
    { name: "Motor Pro Chain Lube", price: "₹399", slug: "chain-lube", category: "Automotive" },
    { name: "Detail Spray Wash & Shine", price: "₹449", slug: "detail-spray", category: "Automotive" },
    { name: "Carpet & Upholstery Cleaner", price: "₹549", slug: "carpet-cleaner", category: "Home Care" },
    { name: "Glass Cleaner Premium", price: "₹299", slug: "glass-cleaner", category: "Home Care" },
    { name: "Men's Grooming Kit", price: "₹1,199", slug: "mens-grooming-kit", category: "Men's Grooming" },
    { name: "Pepper Spray Safety Kit", price: "₹799", slug: "pepper-spray-kit", category: "Women Safety" },
];

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 200);
        }
        if (!isOpen) setQuery('');
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const filteredProducts = query.trim().length > 0
        ? allProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col"
                >
                    {/* Close button */}
                    <div className="flex justify-end p-6">
                        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="flex-1 flex flex-col items-center px-6 pt-8">
                        <div className="w-full max-w-2xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D4AF37]" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white text-lg py-5 pl-14 pr-6 outline-none transition-all placeholder:text-white/30"
                                />
                            </div>

                            {/* Results */}
                            {query.trim().length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 max-h-[60vh] overflow-y-auto"
                                >
                                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                                        {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                                    </p>

                                    {filteredProducts.length > 0 ? (
                                        <div className="space-y-2">
                                            {filteredProducts.map((product, i) => (
                                                <Link
                                                    key={i}
                                                    href={`/products/${product.slug}`}
                                                    onClick={onClose}
                                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 group"
                                                >
                                                    <div>
                                                        <h4 className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                                                            {product.name}
                                                        </h4>
                                                        <span className="text-white/40 text-xs uppercase tracking-wide">{product.category}</span>
                                                    </div>
                                                    <span className="text-[#D4AF37] font-semibold">{product.price}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white/40 text-center py-8">No products found for &ldquo;{query}&rdquo;</p>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
