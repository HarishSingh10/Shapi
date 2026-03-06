'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Zap, Truck, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Demo product data
const productsData: Record<string, any> = {
    'upholstery-cleaner': {
        name: "Sapi's Premium Upholstery Cleaner",
        price: 499, originalPrice: 999,
        images: ["https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=800&auto=format&fit=crop"],
        category: "Home Care",
        description: "Professional-grade upholstery cleaner that removes tough stains, odours, and grime from all fabric surfaces. Safe for use on sofas, chairs, car seats, and more.",
        features: ["Deep cleaning formula", "Safe for all fabrics", "Pleasant fragrance", "500ml bottle"],
    },
    'car-charger-120w': {
        name: "Gazotronics 120W Car Charger",
        price: 1299, originalPrice: 2499,
        images: ["/gazotronics_charger.png"],
        category: "Automotive",
        description: "Ultra-fast 120W car charger with 4-in-1 compatibility. Charges all devices at maximum speed with intelligent power distribution technology.",
        features: ["120W fast charging", "4-in-1 cable", "LED display", "Universal compatibility"],
    },
    'car-care-kit': {
        name: "Complete Car Care Kit",
        price: 2499, originalPrice: 4999,
        images: ["https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop"],
        category: "Automotive",
        description: "Everything you need to keep your car looking showroom-new. Includes ceramic wax, interior cleaner, dashboard polish, microfiber towels, and more.",
        features: ["7 products included", "Premium microfiber towels", "Ceramic protection", "Complete care solution"],
    },
};

// Fallback for any slug not in our data
const defaultProduct = {
    name: "Premium Product",
    price: 999, originalPrice: 1999,
    images: ["https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop"],
    category: "Automotive",
    description: "A premium quality product from Sapi's Crafterina. Designed for excellence and built to last with the finest materials.",
    features: ["Premium quality", "Long lasting", "Easy to use", "Satisfaction guaranteed"],
};

export function ProductDetail() {
    const params = useParams();
    const slug = params?.slug as string;
    const product = productsData[slug] || defaultProduct;
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [pincodeResult, setPincodeResult] = useState('');

    const discount = Math.round((1 - product.price / product.originalPrice) * 100);

    const checkPincode = () => {
        if (pincode.length === 6) {
            setPincodeResult(`Delivery available to ${pincode}. Estimated delivery: 3-5 business days.`);
        } else {
            setPincodeResult('Please enter a valid 6-digit pincode.');
        }
    };

    return (
        <section className="pt-32 pb-20 bg-black">
            <div className="container-custom mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/products" className="hover:text-[#D4AF37] transition-colors">Products</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white/60">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square bg-gray-900 overflow-hidden group"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Sale Badge */}
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5">
                            Save {discount}%
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
                            {product.category}
                        </span>

                        <h1 className="font-serif text-3xl md:text-4xl text-white font-normal mb-6 leading-tight">
                            {product.name}
                        </h1>

                        {/* Pricing */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#D4AF37]">₹{product.price.toLocaleString()}</span>
                            <span className="text-lg text-white/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="bg-red-600/20 text-red-400 text-xs font-bold px-3 py-1 rounded">
                                {discount}% OFF
                            </span>
                        </div>

                        <p className="text-white/60 text-sm leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-8">
                            {product.features.map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* Quantity */}
                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-white/50 text-xs uppercase tracking-wider">Quantity</span>
                            <div className="flex items-center border border-white/10">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-white/5 transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-white/60" />
                                </button>
                                <span className="px-6 text-white font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-white/5 transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-white/60" />
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 px-6 uppercase tracking-wider text-sm font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black py-4 px-6 uppercase tracking-wider text-sm font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300">
                                <Zap className="w-5 h-5" />
                                Buy it Now
                            </button>
                        </div>

                        {/* Pincode Checker */}
                        <div className="border-t border-white/10 pt-6 mb-6">
                            <p className="text-white/50 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4 text-[#D4AF37]" />
                                Check Delivery Availability
                            </p>
                            <div className="flex gap-0">
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter Pincode"
                                    className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/30"
                                />
                                <button
                                    onClick={checkPincode}
                                    className="px-6 py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#F4CF57] transition-colors"
                                >
                                    Check
                                </button>
                            </div>
                            {pincodeResult && (
                                <p className="text-sm mt-3 text-green-400">{pincodeResult}</p>
                            )}
                        </div>

                        {/* Payment Methods */}
                        <div className="border-t border-white/10 pt-6">
                            <p className="text-white/50 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#D4AF37]" />
                                Secure Payment Methods
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                                {['Visa', 'Mastercard', 'RuPay', 'UPI', 'PhonePe', 'GPay', 'Paytm'].map((method) => (
                                    <span key={method} className="bg-white/5 border border-white/10 text-white/60 text-[10px] px-3 py-1.5 font-medium uppercase tracking-wide">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
