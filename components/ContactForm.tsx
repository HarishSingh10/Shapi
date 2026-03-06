'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <section className="pt-36 pb-20 bg-black relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>

            <div className="container-custom mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">
                        Get In Touch
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-4">
                        Contact <span className="text-[#D4AF37]">Us</span>
                    </h1>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">
                        Have questions about our products? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        {[
                            { icon: Phone, title: "Phone", detail: "+91 9654640260", sub: "Mon-Sat, 10AM - 7PM" },
                            { icon: Mail, title: "Email", detail: "contact@sapiscrafterina.com", sub: "We reply within 24 hours" },
                            { icon: MapPin, title: "Address", detail: "New Delhi, India", sub: "Visit us anytime" },
                            { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 10AM - 7PM", sub: "Sunday: Closed" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 p-5 bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-semibold mb-1">{item.title}</h3>
                                    <p className="text-white/70 text-sm">{item.detail}</p>
                                    <p className="text-white/30 text-xs mt-1">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black py-4 px-10 font-bold uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
