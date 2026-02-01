'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';

const products = [
    {
        name: "Sapi's Premium Upholstery Cleaner",
        price: "₹499",
        category: "Home Care",
        image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=2070&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        name: "Gazotronics 120W Car Charger",
        price: "₹1,299",
        category: "Automotive",
        image: "https://images.unsplash.com/photo-1592652426689-5eefd5236f81?q=80&w=2070&auto=format&fit=crop",
        tag: "Trending"
    },
    {
        name: "Herbal Insect Repellent",
        price: "₹299",
        category: "Home Protection",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        tag: "Essential"
    },
    {
        name: "Organic Floor Cleaner",
        price: "₹349",
        category: "Home Care",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Complete Car Care Kit",
        price: "₹2,499",
        category: "Automotive",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
        tag: "Bundle"
    },
    {
        name: "Safety Self Defence Spray",
        price: "₹499",
        category: "Women Safety",
        image: "https://images.unsplash.com/photo-1596460107930-cbdf894c256d?q=80&w=2070&auto=format&fit=crop",
        tag: "Must Have"
    }
];

export function FeaturedProducts() {
    return (
        <section className="py-32 bg-zinc-950 relative">
            <div className="container-custom mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 pb-8 border-b border-white/10">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
                            Selected <span className="text-gold">Essentials</span>
                        </h2>
                        <div className="flex gap-4">
                            <button className="text-gold border-b border-gold pb-1 text-sm uppercase tracking-widest font-bold">All</button>
                            <button className="text-gray-500 hover:text-white text-sm uppercase tracking-widest transition-colors">Home</button>
                            <button className="text-gray-500 hover:text-white text-sm uppercase tracking-widest transition-colors">Automotive</button>
                        </div>
                    </div>
                    <Button variant="outline" className="hidden md:flex border-white/20 hover:border-gold hover:text-gold uppercase tracking-wider text-xs h-12 px-8">
                        View All Collection
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="group relative bg-[#0a0a0a] border border-[#222] hover:border-gold/30 transition-all duration-300 rounded-[2rem] overflow-hidden hover:shadow-2xl flex flex-col max-w-sm mx-auto w-full">

                            {/* Image Container - Compact Aspect Ratio */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-black">
                                {product.tag && (
                                    <div className="absolute top-4 left-4 z-20 bg-[#deb887] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-lg shadow-md">
                                        {product.tag}
                                    </div>
                                )}

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                />

                                {/* Innovative Quick Add Overlay */}
                                <div className="absolute inset-x-8 bottom-6 z-20 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <button className="w-full bg-black/90 backdrop-blur-md text-white border border-white/10 hover:border-gold/50 rounded-full py-3 px-6 flex items-center justify-between group/btn shadow-xl hover:bg-black">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover/btn:text-gold transition-colors">Quick Add</span>
                                        <div className="bg-[#deb887] rounded-full p-1.5 text-black group-hover/btn:scale-110 transition-transform">
                                            <ShoppingCart className="w-3 h-3" />
                                        </div>
                                    </button>
                                </div>

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Product Info - Compact & Classy */}
                            <div className="p-5 flex flex-col flex-grow bg-[#0a0a0a] relative z-10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] border border-zinc-800 px-2 py-1 rounded-full">{product.category}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-2.5 h-2.5 fill-[#deb887] text-[#deb887]" />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1 leading-tight uppercase tracking-wide group-hover:text-[#deb887] transition-colors line-clamp-2 min-h-[3rem]">
                                    {product.name}
                                </h3>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xl font-bold text-white font-mono">{product.price}</span>
                                    <button className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
