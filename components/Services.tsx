'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplets, Car } from 'lucide-react';

const services = [
    {
        icon: Shield,
        title: "Ceramic Coating",
        description: "Long-lasting protection for your vehicle's paint, ensuring a deep gloss and hydrophobic properties.",
    },
    {
        icon: Sparkles,
        title: "Paint Correction",
        description: "Remove swirls, scratches, and oxidation to restore your paint's original clarity and shine.",
    },
    {
        icon: Droplets,
        title: "Deep Cleaning",
        description: "Comprehensive interior and exterior cleaning using premium, pH-balanced products.",
    },
    {
        icon: Car,
        title: "Detailing Packages",
        description: "Tailored packages designed to meet the specific needs of your vehicle, from basic to showroom ready.",
    },
];

export function Services() {
    return (
        <section id="services" className="py-24 bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">OUR EXPERTISE</h2>
                    <div className="w-24 h-1 bg-gold mx-auto mb-6" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover our range of premium services designed to protect and enhance your vehicle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 bg-black/50 border border-white/5 hover:border-gold/50 transition-all duration-300 rounded-xl hover:-translate-y-2"
                        >
                            <div className="w-14 h-14 bg-black border border-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
