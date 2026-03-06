'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide loading screen after 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    {/* Animated Background Orbs */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#F4CF57]/8 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                    </div>

                    {/* Logo Container */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Logo with Glow Effect */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(212, 175, 55, 0.3)",
                                    "0 0 40px rgba(212, 175, 55, 0.5)",
                                    "0 0 20px rgba(212, 175, 55, 0.3)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-64 h-64 rounded-full border-4 border-[#D4AF37]/30 p-8 bg-black/50 backdrop-blur-xl"
                        >
                            <Image
                                src="/logo.png"
                                alt="Sapi's Logo"
                                fill
                                className="object-contain p-8"
                                priority
                            />
                        </motion.div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-8 text-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">
                                Sapi's
                            </h2>
                            <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">
                                Unique Collections
                            </p>
                        </motion.div>

                        {/* Loading Spinner */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="mt-8 w-12 h-12 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
