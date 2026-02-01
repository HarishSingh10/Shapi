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
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            scrolled ? "glass border-gold/20 py-3" : "bg-transparent border-transparent py-6"
        )}>
            <div className="container-custom mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Sapi's Crafterina Logo"
                        fill
                        className="object-contain rounded-full border-2 border-gold/20"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-12">
                    {['Home', 'Shop All', 'Home Lifestyle', 'Automotive', 'About Us'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Shop' ? '#collections' : '#'}
                            className="text-xs font-bold text-gray-300 hover:text-gold transition-colors uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all hover:after:w-full"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="hidden sm:flex hover:text-gold">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="relative hover:text-gold">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
                    </Button>
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="text-gold" /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gold/20 p-6 shadow-2xl"
                >
                    <div className="flex flex-col space-y-6">
                        {['Home', 'Shop All', 'Automotive Care', 'Home Care', 'About Us'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-lg font-medium text-white hover:text-gold transition-colors uppercase tracking-wider"
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
