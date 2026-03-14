'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 group">
                        <Lock className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Admin Portal</h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">Premium Access Only</p>
                </div>

                <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" />
                                <input 
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@sapi.com"
                                    className="w-full bg-black border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" />
                                <input 
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-xs font-bold uppercase tracking-wider text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Enter Dashboard
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-white/20 text-[10px] uppercase tracking-widest leading-relaxed">
                    Security enforced by Sapi's Crafterina Systems<br/>
                    Unauthorized access is strictly prohibited
                </p>
            </motion.div>
        </div>
    );
}
