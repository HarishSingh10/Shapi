'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
    const phoneNumber = '919654640260'; // From the live site
    const message = encodeURIComponent('Hi! I would like to know more about your products.');

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            aria-label="Chat on WhatsApp"
        >
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.282-.844.18-1.944.324-5.652-1.214-4.746-1.97-7.8-6.79-8.036-7.104-.228-.314-1.866-2.486-1.866-4.744s1.18-3.368 1.6-3.828c.42-.46.918-.576 1.224-.576.304 0 .608.002.874.016.28.014.656-.106.97.78.39.922 1.246 3.044 1.354 3.264.108.22.18.476.036.77-.144.294-.216.476-.432.736-.216.26-.456.58-.652.778-.216.216-.44.452-.19.888.252.436 1.12 1.85 2.404 2.996 1.652 1.476 3.046 1.934 3.478 2.15.432.216.684.18.936-.108.252-.29 1.08-1.26 1.368-1.692.288-.432.576-.36.972-.216.396.144 2.516 1.188 2.948 1.404.432.216.72.324.828.504.108.18.108 1.044-.282 2.144z" />
            </svg>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
        </motion.a>
    );
}
