'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
    {
        title: "Self Defense",
        image: "https://images.unsplash.com/photo-1596460107930-cbdf894c256d?q=80&w=2070&auto=format&fit=crop", // Updated to a safety/defense related image
        link: "#",
        tag: "ESSENTIAL TOOLS FOR SAFETY",
        count: "12+ Products"
    },
    {
        title: "Automotive Care",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop",
        link: "#",
        tag: "PREMIUM VEHICLE SOLUTIONS",
        count: "25+ Products"
    },
    {
        title: "Home Care",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        link: "#",
        tag: "KEEP YOUR HOME PRISTINE",
        count: "18+ Products"
    },
    {
        title: "Men's Grooming",
        image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop",
        link: "#",
        tag: "PREMIUM PERSONAL CARE",
        count: "15+ Products"
    }
];

export function Categories() {
    return (
        <section id="collections" className="py-32 bg-zinc-950 border-t border-white/5 relative">
            <div className="container-custom mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24">
                    <div>
                        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold block mb-6">Our Expertise</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-none">CURATED <br /><span className="text-zinc-500">CATEGORIES</span></h2>
                    </div>
                    <div className="hidden md:block max-w-sm text-right">
                        <p className="text-zinc-400 leading-relaxed border-r-2 border-gold pr-6">
                            Discover our specialized collections designed to elevate every aspect of your daily life.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <Link key={index} href={collection.link} className="group relative block h-[450px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full h-full relative"
                            >
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.8]"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-90" />

                                {/* Corner Borders */}
                                <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/70 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                                <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/70 group-hover:w-10 group-hover:h-10 transition-all duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10">
                                    {/* Floating Tag */}
                                    <div className="absolute top-24 left-0 bg-[#3a2d1d]/90 backdrop-blur-md border-r border-t border-b border-gold/40 py-2 px-6 rounded-r-full transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                                        <span className="text-[#deb887] text-[10px] font-bold uppercase tracking-widest">
                                            {collection.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-serif text-[#f0e6d2] mb-2 drop-shadow-lg group-hover:text-gold transition-colors duration-300">
                                        {collection.title}
                                    </h3>

                                    <p className="text-zinc-400 text-sm font-medium tracking-wide mb-6 group-hover:text-white transition-colors duration-300">
                                        {collection.count}
                                    </p>

                                    <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        Shop Now <span>→</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
