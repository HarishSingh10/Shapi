'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { AnnouncementBar } from './AnnouncementBar';

import { useFestival } from './FestivalContext';
import { useCart } from './CartContext';
import { FestivalBanner } from './FestivalBanner';

export function Navbar() {
    const { activeFestival, festivalConfig } = useFestival();
    const { cartCount, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                {(activeFestival !== 'none' && isHome) ? <FestivalBanner /> : <AnnouncementBar />}
                <nav className={cn(
                    "transition-all duration-300 border-b",
                    scrolled ? "bg-black/95 backdrop-blur-md shadow-lg py-3 border-white/5" : "bg-transparent py-6 border-transparent"
                )}>
                    <div className="container-custom mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="relative w-12 h-12 md:w-16 md:h-16 transition-transform hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Sapi's Crafterina Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                            
                            {(activeFestival !== 'none' && isHome) && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="hidden lg:block bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] px-3 py-1 rounded-full"
                                    style={{ 
                                        background: `linear-gradient(to right, ${festivalConfig.primaryColor}, ${festivalConfig.secondaryColor})`,
                                        boxShadow: `0 0 20px ${festivalConfig.primaryColor}40`
                                    }}
                                >
                                    <span className="text-[10px] font-bold text-black uppercase tracking-widest leading-none">
                                        {festivalConfig.greeting}
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-10">
                            <Link href="/" className="text-sm font-medium text-white/90 hover:text-[#D4AF37] transition-colors uppercase tracking-[0.15em]">
                                Home
                            </Link>
                            <Link href="/products" className="text-sm font-medium text-white/90 hover:text-[#D4AF37] transition-colors uppercase tracking-[0.15em]">
                                All Products
                            </Link>
                            
                            {/* All Collections Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:text-[#D4AF37] transition-colors uppercase tracking-[0.15em]">
                                    All collections
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
                                    <div className="bg-black/95 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl w-64 space-y-3">
                                        {[
                                            { label: "Automotive Accessories", href: "/collections/automotive-accessories" },
                                            { label: "Automotive care", href: "/collections/automotive-care" },
                                            { label: "Home Care", href: "/collections/home-care" },
                                            { label: "Home Decore", href: "/collections/home-decore" },
                                            { label: "Women Hygine & Self Defence", href: "/collections/self-defense" },
                                            { label: "Insects Repellents", href: "/collections/insects-repellents" },
                                            { label: "Men's Grooming", href: "/collections/mens-grooming" },
                                            { label: "Other Collections", href: "/collections/others" },
                                            { label: "Oil Additives", href: "/collections/oil-additives" }
                                        ].map((sub) => (
                                            <Link 
                                                key={sub.label}
                                                href={sub.href}
                                                className="block text-xs font-semibold text-white/60 hover:text-[#D4AF37] transition-colors uppercase tracking-widest py-1"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="text-sm font-medium text-white/90 hover:text-[#D4AF37] transition-colors uppercase tracking-[0.15em]">
                                Contact
                            </Link>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex hover:text-[#D4AF37] text-white"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:text-[#D4AF37] text-white">
                                <User className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative hover:text-[#D4AF37] text-white"
                                onClick={() => setCartOpen(true)}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span 
                                        className="absolute -top-1 -right-1 w-4 h-4 text-black text-[10px] font-bold rounded-full flex items-center justify-center transition-all duration-500"
                                        style={{ backgroundColor: (activeFestival !== 'none' && isHome) ? festivalConfig.primaryColor : '#D4AF37' }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
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
                            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 p-6 shadow-2xl overflow-y-auto max-h-[80vh]"
                        >
                            <div className="flex flex-col space-y-6">
                                <Link href="/" className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors uppercase tracking-wider" onClick={() => setIsOpen(false)}>Home</Link>
                                <Link href="/products" className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors uppercase tracking-wider" onClick={() => setIsOpen(false)}>All Products</Link>
                                
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Collections</p>
                                    <div className="grid grid-cols-1 gap-4 pl-4 border-l border-white/10">
                                        {[
                                            { label: "Automotive Accessories", href: "/collections/automotive-accessories" },
                                            { label: "Automotive care", href: "/collections/automotive-care" },
                                            { label: "Home Care", href: "/collections/home-care" },
                                            { label: "Home Decore", href: "/collections/home-decore" },
                                            { label: "Women Hygine & Self Defence", href: "/collections/self-defense" },
                                            { label: "Insects Repellents", href: "/collections/insects-repellents" },
                                            { label: "Men's Grooming", href: "/collections/mens-grooming" },
                                            { label: "Other Collections", href: "/collections/others" },
                                            { label: "Oil Additives", href: "/collections/oil-additives" }
                                        ].map((sub) => (
                                            <Link 
                                                key={sub.label}
                                                href={sub.href}
                                                className="text-xs font-medium text-white/60 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <Link href="/contact" className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors uppercase tracking-wider" onClick={() => setIsOpen(false)}>Contact</Link>
                            </div>
                        </motion.div>
                    )}
                </nav>
            </div>

            {/* Search Overlay */}
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Cart Drawer */}
            <CartDrawer />
        </>
    );
}
