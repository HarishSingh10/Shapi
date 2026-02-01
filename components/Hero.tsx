'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center bg-black overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />

                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/sapis_hero_background_bottles.png"
                        className="w-full h-full object-cover opacity-100"
                    >
                        <source src="/sapis-hero-video.mp4" type="video/mp4" />
                        <img
                            src="/sapis_hero_background_bottles.png"
                            alt="Sapi's Premium Collection"
                            className="w-full h-full object-cover"
                        />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                </div>
            </div>

            <div className="container-custom mx-auto relative z-20 pt-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 border border-gold/30 px-4 py-2 rounded-full backdrop-blur-sm bg-black/50">
                            The Gold Standard
                        </span>

                        <h1 className="text-6xl md:text-9xl font-bold text-white mb-2 leading-none tracking-tighter drop-shadow-2xl font-oswald uppercase">
                            SAPI'S
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-wide">
                            PREMIUM <span className="text-gold font-bold">CARE</span> SOLUTIONS
                        </h2>

                        <p className="text-gray-300 text-lg font-light max-w-2xl mb-10 leading-relaxed tracking-wide drop-shadow-md">
                            Automotive & Home Lifestyle Excellence.
                        </p>

                        <div className="flex gap-6">
                            <Button variant="default" size="lg" className="bg-gold text-black hover:bg-white hover:text-black h-14 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                Shop Now
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hero Features Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/50 backdrop-blur-sm z-20">
                <div className="container-custom mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                        {['Certified Quality', 'Eco-Friendly', 'Indian Made', 'Premium Support'].map((feature, i) => (
                            <div key={i} className="py-6 text-center">
                                <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
