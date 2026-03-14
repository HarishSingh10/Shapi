'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFestival } from './FestivalContext';

export function AnnouncementBar() {
    const { announcementText } = useFestival();
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black h-8 md:h-10 flex items-center relative z-[60] overflow-hidden">
            <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap">
                <motion.div 
                    animate={{ x: [0, '-50%'] }}
                    transition={{ 
                        duration: 25, 
                        repeat: Infinity, 
                        ease: 'linear' 
                    }}
                    className="flex items-center gap-20 px-6"
                >
                    {[1, 2, 3, 4].map((i) => (
                        <span key={i} className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shrink-0">
                            {announcementText}
                        </span>
                    ))}
                </motion.div>
            </div>
            
            <button
                onClick={() => setVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-1 rounded-full transition-all z-10"
                aria-label="Close announcement"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}
