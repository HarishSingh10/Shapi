'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Zap, Truck, Shield, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useFestival } from './FestivalContext';
import { useCart } from './CartContext';

export function ProductDetail() {
    const params = useParams();
    const slug = params?.slug as string;
    const { activeFestival } = useFestival();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [pincodeResult, setPincodeResult] = useState('');

    useEffect(() => {
        if (slug) {
            fetch(`/api/products/${slug}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    setLoading(false);
                });
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-[#D4AF37] font-bold tracking-[0.3em] animate-pulse uppercase">Searching our vault...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-serif mb-4 text-white">Selection Not Found</h1>
                <p className="text-gray-500 mb-8 max-w-md">Our apologies. The item you're looking for might have moved or is currently out of stock.</p>
                <Link href="/products" className="bg-[#D4AF37] text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all">Back to Collection</Link>
            </div>
        );
    }

    // Festival pricing logic
    const isFestival = activeFestival !== 'none';
    const basePrice = product.price;
    const currentPrice = isFestival ? Math.floor(basePrice * 0.9) : basePrice;
    const displayOriginalPrice = isFestival ? basePrice : product.originalPrice;
    const discount = Math.round((1 - currentPrice / displayOriginalPrice) * 100);

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: currentPrice,
            quantity: quantity,
            image: product.image,
            slug: product.slug
        });
    };

    return (
        <section className="pt-32 pb-20 bg-black min-h-screen">
            <div className="container-custom mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-[10px] md:text-xs text-white/40 mb-8 uppercase tracking-widest">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/products" className="hover:text-[#D4AF37] transition-colors">Products</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white/60">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square bg-white/5 overflow-hidden group rounded-2xl border border-white/5"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {isFestival && (
                                <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-xl flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3" /> Festival Offer
                                </div>
                            )}
                            {discount > 0 && (
                                <div className="bg-white text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-xl">
                                    Save {discount}%
                                </div>
                            )}
                            {product.stock <= 0 && (
                                <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-lg shadow-xl border border-red-500/50">
                                    Out Of Stock
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold mb-4">
                            {product.category}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight leading-tight">
                            {product.name}
                        </h1>

                        {/* Pricing */}
                        <div className="flex items-end gap-4 mb-8">
                            <div className="flex flex-col">
                                {isFestival && (
                                    <span className="text-xs text-red-500 font-bold mb-1 uppercase tracking-wider">Special Festival Price</span>
                                )}
                                <span className="text-4xl md:text-5xl font-bold text-[#D4AF37]">₹{currentPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="text-lg text-white/20 line-through">₹{displayOriginalPrice.toLocaleString()}</span>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Incl. all taxes</span>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/10 mb-8"></div>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                            {product.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {product.features?.map((f: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 text-white/70 text-xs md:text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                                    {f}
                                </div>
                            ))}
                        </div>

                        {/* Quantity & Action */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Quantity</span>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-4 hover:bg-white/10 transition-colors text-white/60"
                                        disabled={product.stock <= 0}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className={`w-12 text-center text-white font-bold ${product.stock <= 0 ? 'opacity-20' : ''}`}>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-4 hover:bg-white/10 transition-colors text-white/60"
                                        disabled={product.stock <= 0}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                {product.stock > 0 && product.stock <= 5 && (
                                    <span className="text-[10px] font-black text-red-500 uppercase animate-pulse">Only {product.stock} Left in Stock!</span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className={`flex-1 group relative overflow-hidden bg-white/5 border border-white/10 text-white py-5 px-8 uppercase tracking-[0.2em] text-[10px] font-bold hover:border-white transition-all duration-500 rounded-xl ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <ShoppingCart className="w-4 h-4" /> {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </span>
                                </button>
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className={`flex-2 bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black py-5 px-12 uppercase tracking-[0.2em] text-[10px] font-black hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 rounded-xl flex items-center justify-center gap-3 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                >
                                    <Zap className="w-4 h-4 fill-black" /> {product.stock <= 0 ? 'Notify Me' : 'Buy it Now'}
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Truck className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Express Delivery</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">3-5 Business Days</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Quality Guaranteed</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">100% Authentic Products</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
