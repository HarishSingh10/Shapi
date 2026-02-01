import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 text-gray-400 pt-20 pb-10">
            <div className="container-custom mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-6 relative w-20 h-20 hover:opacity-80 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="Sapi's Crafterina Logo"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 border-l-2 border-gold pl-4">
                            Premium care solutions for those who demand excellence. Designed for Indian households and automotive enthusiasts.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                            <li><Link href="#collections" className="hover:text-gold transition-colors">Shop All</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Collections</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-gold transition-colors">Home Care</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Automotive Care</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Self Defence</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Men's Grooming</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Get in Touch</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-4 group">
                                <MapPin className="w-5 h-5 text-gold shrink-0 group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">New Delhi, India</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Phone className="w-5 h-5 text-gold shrink-0 group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Mail className="w-5 h-5 text-gold shrink-0 group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">support@sapiscrafterina.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Sapi's Crafterina. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0 uppercase tracking-wider">
                        <Link href="#" className="hover:text-gold">Privacy</Link>
                        <Link href="#" className="hover:text-gold">Terms</Link>
                        <Link href="#" className="hover:text-gold">Shipping</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
