'use client';

import { ShoppingCart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFestival } from './FestivalContext';
import { useCart } from './CartContext';

// Individual Card Component to handle independent state
function ProductCard({ product }: { product: any }) {
    const { activeFestival } = useFestival();
    const { addToCart } = useCart();
    
    // Festival pricing logic
    const isFestival = activeFestival !== 'none';
    const displayPrice = isFestival ? Math.floor(product.price * 0.9) : product.price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product._id,
            name: product.name,
            price: displayPrice,
            quantity: 1,
            image: product.image,
            slug: product.slug
        });
    };

    return (
        <Link 
            href={`/products/${product.slug}`}
            className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden flex flex-col w-full h-full hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl border border-gray-800"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden z-0 bg-black">
                {product.tag || isFestival ? (
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                        {isFestival && (
                            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Festival Sale -10%
                            </div>
                        )}
                        {product.tag && (
                            <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                                {product.tag}
                            </div>
                        )}
                    </div>
                ) : null}

                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${product.stock <= 0 ? 'grayscale brightness-50' : 'brightness-90 group-hover:brightness-100 group-hover:scale-110'}`}
                />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {product.stock <= 0 ? (
                        <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                            Out Of Stock
                        </div>
                    ) : (
                        <>
                            {isFestival && (
                                <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> Festival Sale
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

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow bg-gradient-to-br from-gray-900 to-black relative z-20">
                <h3 className="text-sm md:text-base font-bold text-white mb-3 leading-tight uppercase tracking-wide line-clamp-2 min-h-[2.5rem] group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-bold text-[#D4AF37]">₹{displayPrice}</span>
                        {isFestival && (
                            <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
                        )}
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black px-4 md:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {product.stock <= 0 ? 'Sold Out' : 'Add Cart'}
                    </button>
                </div>
            </div>
        </Link>
    );
}

export function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center text-[#D4AF37] font-bold tracking-widest bg-black animate-pulse">
                SYNCING WITH PREMIUM VAULT...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500 bg-black">
                <p className="uppercase tracking-widest text-xs">No products currently in inventory.</p>
            </div>
        );
    }

    const displayProducts = products.slice(0, 4);

    return (
        <section className="py-20 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
            <div className="absolute top-32 left-32 w-[550px] h-[550px] bg-[#D4AF37]/12 rounded-full blur-[130px] animate-float"></div>
            <div className="absolute bottom-32 right-32 w-[450px] h-[450px] bg-white/6 rounded-full blur-[110px] animate-float-delayed"></div>
            
            <div className="container-custom mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
                        FEATURED PRODUCTS
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mt-2">Discover our premium selection directly from our inventory.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {displayProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/products"
                        className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
