'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden pb-20">
            {/* Dynamic Background with Enhanced Effects */}
            <div className="absolute inset-0 z-0">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/sapis_hero_background_bottles.png"
                        className="w-full h-full object-cover"
                    >
                        <source src="/sapis-hero-video.mp4" type="video/mp4" />
                        <img
                            src="/sapis_hero_background_bottles.png"
                            alt="Sapi's Premium Collection"
                            className="w-full h-full object-cover"
                        />
                    </video>
                </div>

                {/* Subtle Dark Overlay */}
                <div className="absolute inset-0 bg-black/70 z-[1]" />

                {/* Animated Glassmorphism Orbs */}
                <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#D4AF37]/20 to-[#F4CF57]/10 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#D4AF37]/15 to-transparent rounded-full blur-[80px] animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#F4CF57]/10 rounded-full blur-[120px] animate-pulse-slow"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 z-[2]"></div>
            </div>

            <div className="container-custom mx-auto relative z-20 pt-58 pb-24 px-6 ">
                <div className="max-w-4xl mt-[150px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="flex flex-col max-w-3xl"
                    >
                        {/* Premium Badge */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-[#D4AF37]  tracking-[0.4em] text-[10px] md:text-xs font-semibold mb-6 block"
                        >
                            The Gold Standard
                        </motion.span>

                        {/* Main Heading - Refined Minimalist Style */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1 }}
                        >
                            <h1
                                className="font-serif text-5xl md:text-6xl lg:text-[5rem] text-white mb-4 leading-[1.1] drop-shadow-sm font-normal tracking-normal"
                            >
                                Automotive <br />
                                <span className="text-[#D4AF37] ">Care Excellence</span>
                            </h1>

                            <p className="text-white/60 text-xs max-w-md mb-12 font-sans font-light tracking-[0.25em] leading-relaxed  mt-6">
                                Precision • Performance • Prestige
                            </p>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 1 }}
                        >
                            <a
                                href="#collections"
                                className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#D4AF37] text-[#D4AF37]  tracking-[0.2em] text-[10px] font-bold transition-all duration-500 hover:bg-[#D4AF37] hover:text-black overflow-hidden"
                            >
                                <span className="relative z-10 transition-colors duration-500">Explore Collection</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Straight Bottom Edge */}
        </section>
    );
}
