'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useFestival } from './FestivalContext';

export function Hero() {
    const { activeFestival, festivalConfig } = useFestival();
    
    return (
        <section className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden pb-20">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/sapis_hero_background_bottles.png"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/sapis-hero-video.mp4" type="video/mp4" />
                </video>
                
                {/* Fallback image if video fails to load, gracefully positioned behind */}
                <img
                    src="/sapis_hero_background_bottles.png"
                    alt="Sapi's Premium Collection"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />

                {/* Base Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-[1]" />

                {/* Festival-Specific Ambient Overlays */}
                {activeFestival === 'diwali' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 via-[#FF4D00]/10 to-transparent z-[2] mix-blend-color-dodge" />
                )}
                {activeFestival === 'holi' && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E91E63]/20 via-[#2196F3]/10 to-transparent z-[2] mix-blend-screen" />
                )}
                {activeFestival === 'christmas' && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-[#C41E3A]/20 z-[2] backdrop-blur-[2px]" />
                )}
                {activeFestival === 'new-year' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7DF9FF]/10 via-black/50 to-[#B87333]/20 z-[2]" />
                )}

                {/* Animated Glassmorphism Orbs - Festively Tuned */}
                <div 
                    className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[120px] animate-float transition-all duration-1000 z-[2]"
                    style={{ background: `radial-gradient(circle, ${festivalConfig.primaryColor}33 0%, transparent 70%)` }}
                />
                <div 
                    className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full blur-[100px] animate-float-delayed transition-all duration-1000 z-[2]"
                    style={{ background: `radial-gradient(circle, ${festivalConfig.secondaryColor}26 0%, transparent 70%)` }}
                />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 z-[3]" />
                
                {/* Festive Vignette Edge */}
                {activeFestival !== 'none' && (
                   <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-[4]" />
                )}
            </div>

            <div className="container-custom mx-auto relative z-20 pt-58 pb-24 px-6 ">
                <div className="max-w-4xl mt-[150px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="flex flex-col max-w-3xl relative"
                    >
                        {/* Premium Badge / Festival Greeting */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mb-8"
                        >
                            <span 
                                className="inline-block tracking-[0.4em] text-xs md:text-sm font-bold uppercase transition-all duration-700 px-6 py-2 rounded-full border border-white/20 backdrop-blur-md"
                                style={{ 
                                    color: activeFestival === 'none' ? '#D4AF37' : '#FFF',
                                    background: activeFestival === 'none' ? 'rgba(0,0,0,0.5)' : `linear-gradient(45deg, ${festivalConfig.primaryColor}80, ${festivalConfig.secondaryColor}40)` 
                                }}
                            >
                                {activeFestival === 'none' ? 'The Gold Standard' : festivalConfig.greeting}
                            </span>
                        </motion.div>

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
                                <span className="transition-colors duration-500" style={{ color: festivalConfig.primaryColor }}>Care Excellence</span>
                            </h1>

                            <p className="text-white/70 text-sm md:text-base max-w-lg mb-12 font-sans font-light tracking-[0.2em] leading-relaxed mt-8">
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
                                className="group relative inline-flex items-center justify-center px-10 py-5 text-black tracking-[0.2em] text-xs font-bold transition-all duration-500 overflow-hidden rounded-xl shadow-2xl"
                                style={{ 
                                    background: activeFestival === 'none' ? '#D4AF37' : `linear-gradient(45deg, ${festivalConfig.primaryColor}, ${festivalConfig.secondaryColor})`,
                                    boxShadow: activeFestival !== 'none' ? `0 10px 30px -10px ${festivalConfig.primaryColor}` : '0 10px 30px -10px rgba(212,175,55,0.5)'
                                }}
                            >
                                <span className="relative z-10 transition-transform duration-500 group-hover:scale-105 inline-block text-white mix-blend-difference">
                                    Explore Collection
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Straight Bottom Edge */}
        </section>
    );
}
