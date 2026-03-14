'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const initialCollections = [
    {
        title: "Self Defense",
        slug: "self-defense",
        image: "/self_defense_placeholder.png",
        tag: "ESSENTIAL TOOLS FOR SAFETY",
    },
    {
        title: "Automotive Care",
        slug: "automotive",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop",
        tag: "PREMIUM VEHICLE SOLUTIONS",
    },
    {
        title: "Home Care",
        slug: "home-care",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        tag: "KEEP YOUR HOME PRISTINE",
    },
    {
        title: "Men's Grooming",
        slug: "mens-grooming",
        image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop",
        tag: "PREMIUM PERSONAL CARE",
    }
];

export function Categories() {
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const products = Array.isArray(data) ? data : [];
                const newCounts: Record<string, number> = {};
                products.forEach(p => {
                    const cat = p.category?.toLowerCase();
                    if (cat) newCounts[cat] = (newCounts[cat] || 0) + 1;
                });
                setCounts(newCounts);
            })
            .catch(err => console.error('Failed to fetch counts:', err));
    }, []);

    return (
        <section id="collections" className="py-20 relative overflow-hidden bg-black">
            {/* Glassmorphism Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>

            {/* Animated Glass Orbs */}
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-float"></div>
            <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-[#F4CF57]/8 rounded-full blur-[130px] animate-pulse-slow"></div>

            {/* Glossy Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="container-custom mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight drop-shadow-2xl">COLLECTIONS</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {initialCollections.map((collection, index) => {
                        const count = counts[collection.slug] || 0;
                        return (
                            <Link key={index} href={`/collections/${collection.slug}`} className="group relative block rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="w-full aspect-[3/4] relative bg-gradient-to-br from-gray-900 to-black"
                                >
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.75] group-hover:brightness-[0.9]"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] p-4 rounded-xl transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                            <h3 className="text-base md:text-lg font-bold text-black uppercase tracking-wide text-center">
                                                {collection.title}
                                            </h3>
                                            <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest text-center mt-1">
                                                {count} {count === 1 ? 'Product' : 'Products'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#D4AF37] rounded-3xl transition-all duration-300"></div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
