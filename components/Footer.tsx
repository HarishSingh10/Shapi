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
                            {[
                                { icon: Instagram, href: "https://instagram.com" },
                                { icon: Facebook, href: "https://facebook.com" },
                                { icon: Twitter, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-[#D4AF37] transition-colors">Return & Refund Policy</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
                            <li><Link href="/admin" className="text-gray-500 hover:text-white transition-colors border-t border-white/5 pt-2 mt-2 block">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Collections</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/products" className="hover:text-[#D4AF37] transition-colors">All Products</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Automotive Care</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Home Care</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Men&apos;s Grooming</Link></li>
                            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Women Safety</Link></li>
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
                                <a href="tel:+919654640260" className="hover:text-[#D4AF37] transition-colors">+91 9654640260</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                                <a href="mailto:contact@sapiscrafterina.com" className="hover:text-[#D4AF37] transition-colors">contact@sapiscrafterina.com</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-800 pt-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-600">Accepted Payment Methods</p>
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            {['Visa', 'Mastercard', 'RuPay', 'UPI', 'PhonePe', 'GPay', 'Paytm', 'COD'].map((method) => (
                                <span key={method} className="bg-gray-900 border border-gray-800 text-gray-500 text-[10px] px-3 py-1.5 font-medium uppercase tracking-wide">
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Sapi&apos;s Crafterina. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
