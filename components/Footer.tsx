import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-black text-gray-400 pt-16 pb-8 border-t border-gray-800">
            <div className="container-custom mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-6 relative w-16 h-16 hover:opacity-80 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="Sapi's Crafterina Logo"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Premium care solutions for those who demand excellence.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Return Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">About Sapi's Crafterina</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Search</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">About Sapi's Crafterina</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                                <span>New Delhi, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                                <span>support@sapiscrafterina.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Sapi's Crafterina. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
