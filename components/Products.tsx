'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const products = [
    {
        name: "Nano Ceramic Wax",
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        name: "Microfiber Kit",
        price: "₹899",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Interior Cleaner",
        price: "₹699",
        image: "https://images.unsplash.com/photo-1621266046187-b956a953835e?q=80&w=2070&auto=format&fit=crop",
    },
];

export function Products() {
    return (
        <section id="collections" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">CURATED COLLECTIONS</h2>
                        <p className="text-gray-400">Professional grade products for the enthusiast.</p>
                    </div>
                    <Button variant="outline" className="border-white/20">View All Products</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-gray-900 rounded-2xl overflow-hidden"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {product.tag && (
                                    <div className="absolute top-4 left-4 z-10 bg-gold text-black text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                                        {product.tag}
                                    </div>
                                )}
                                {/* Note: In a real app, use local images or configure domains for next/image */}
                                <div
                                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-gold font-mono text-lg">{product.price}</span>
                                    <Button variant="ghost" size="sm" className="text-white hover:text-gold p-0">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
