'use client';

import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Pre-fetch products for search when overlay opens
            fetch('/api/products')
                .then(res => res.json())
                .then(data => setProducts(Array.isArray(data) ? data : []))
                .catch(err => console.error('Failed to fetch products for search:', err));
            
            if (inputRef.current) {
                setTimeout(() => inputRef.current?.focus(), 200);
            }
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
        ? products.filter(p =>
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
                                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 group rounded-xl"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-900 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-medium group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                                                                {product.name}
                                                            </h4>
                                                            <span className="text-white/40 text-[10px] uppercase tracking-wider">{product.category}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[#D4AF37] font-semibold">₹{product.price.toLocaleString()}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/5">
                                            <p className="text-white/40 uppercase tracking-[0.2em] text-sm">No products found for &ldquo;{query}&rdquo;</p>
                                        </div>
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
