'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-black/95 backdrop-blur-md shadow-lg py-3" : "bg-black/80 backdrop-blur-sm py-4"
        )}>
            <div className="container-custom mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative w-12 h-12 md:w-16 md:h-16 transition-transform hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Sapi's Crafterina Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {['Home', 'All products', 'Automotive', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'All products' ? '#collections' : '#'}
                            className="text-xs font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" className="hidden sm:flex hover:text-[#D4AF37] text-white">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:text-[#D4AF37] text-white">
                        <User className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="relative hover:text-[#D4AF37] text-white">
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="text-[#D4AF37]" /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 p-6 shadow-2xl"
                >
                    <div className="flex flex-col space-y-6">
                        {['Home', 'All products', 'Automotive', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
