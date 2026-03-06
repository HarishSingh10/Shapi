'use client';

import { ShoppingCart } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';

const products = [
    {
        name: "Sapi's Premium Upholstery Cleaner",
        price: "₹499",
        slug: "upholstery-cleaner",
        category: "Home Care",
        image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=2070&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        name: "Gazotronics 120W Car Charger",
        price: "₹1,299",
        slug: "car-charger-120w",
        category: "Automotive",
        image: "/gazotronics_charger.png",
        tag: "Trending"
    },
    {
        name: "Herbal Insect Repellent",
        price: "₹299",
        slug: "herbal-insect-repellent",
        category: "Home Protection",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        tag: "Essential"
    },
    {
        name: "Organic Floor Cleaner",
        price: "₹349",
        slug: "organic-floor-cleaner",
        category: "Home Care",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Complete Car Care Kit",
        price: "₹2,499",
        slug: "car-care-kit",
        category: "Automotive",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
        tag: "Bundle"
    },
    {
        name: "Safety Self Defence Spray",
        price: "₹499",
        slug: "self-defence-spray",
        category: "Women Safety",
        image: "/self_defense_placeholder.png",
        tag: "Must Have"
    }
];

// Individual Card Component to handle independent state
function ProductCard({ product, index }: { product: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden flex flex-col w-full h-full hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl border border-gray-800">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden z-0 bg-black">
                {product.tag && (
                    <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-lg">
                        {product.tag}
                    </div>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out brightness-90 group-hover:brightness-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow bg-gradient-to-br from-gray-900 to-black relative z-20">
                <h3 className="text-sm md:text-base font-bold text-white mb-3 leading-tight uppercase tracking-wide line-clamp-2 min-h-[2.5rem] group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold text-[#D4AF37]">{product.price}</span>
                    <Link
                        href={`/products/${product.slug}`}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black px-4 md:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add Cart
                    </Link>
                </div>
            </div>
        </div>
    )
}

export function FeaturedProducts() {
    return (
        <section className="py-20 relative overflow-hidden bg-black">
            {/* Glassmorphism Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>

            {/* Animated Glass Orbs */}
            <div className="absolute top-32 left-32 w-[550px] h-[550px] bg-[#D4AF37]/12 rounded-full blur-[130px] animate-float"></div>
            <div className="absolute bottom-32 right-32 w-[450px] h-[450px] bg-white/6 rounded-full blur-[110px] animate-float-delayed"></div>
            <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-[#F4CF57]/10 rounded-full blur-[140px] animate-pulse-slow"></div>

            {/* Glossy Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent"></div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="container-custom mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight drop-shadow-2xl">
                        FEATURED PRODUCTS
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mt-2">Discover our premium selection of automotive and lifestyle products</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} index={index} />
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
