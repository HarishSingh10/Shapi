'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Sample cart items for demo
const sampleCartItems = [
    {
        id: 1,
        name: "Gazotronics 120W Car Charger",
        price: 1299,
        quantity: 1,
        image: "/gazotronics_charger.png",
    },
    {
        id: 2,
        name: "Sapi's Premium Upholstery Cleaner",
        price: 499,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=200&auto=format&fit=crop",
    },
];

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const cartItems = sampleCartItems;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-black border-l border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-white font-semibold text-lg uppercase tracking-wider flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                                Your Cart
                            </h2>
                            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-6 border-b border-white/5">
                                        {/* Image */}
                                        <div className="w-20 h-20 bg-gray-900 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white text-sm font-medium leading-tight mb-1 line-clamp-2">
                                                {item.name}
                                            </h4>
                                            <p className="text-[#D4AF37] font-semibold text-sm">₹{item.price.toLocaleString()}</p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center border border-white/10 rounded">
                                                    <button className="p-1.5 hover:bg-white/10 transition-colors">
                                                        <Minus className="w-3 h-3 text-white/60" />
                                                    </button>
                                                    <span className="px-3 text-white text-xs font-medium">{item.quantity}</span>
                                                    <button className="p-1.5 hover:bg-white/10 transition-colors">
                                                        <Plus className="w-3 h-3 text-white/60" />
                                                    </button>
                                                </div>
                                                <button className="text-white/30 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-white/10 mb-4" />
                                    <p className="text-white/40 text-sm">Your cart is empty</p>
                                    <button onClick={onClose} className="mt-6 text-[#D4AF37] text-sm uppercase tracking-wider hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 uppercase text-xs tracking-wider">Subtotal</span>
                                    <span className="text-white text-lg font-semibold">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <p className="text-white/30 text-xs">Shipping & taxes calculated at checkout</p>
                                <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black py-4 font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300">
                                    Checkout
                                </button>
                                <button onClick={onClose} className="w-full text-white/50 text-xs uppercase tracking-wider hover:text-white transition-colors py-2">
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
