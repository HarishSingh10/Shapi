'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFestival } from './FestivalContext';
import { Sparkles, Calendar, Zap, PartyPopper } from 'lucide-react';

export function FestivalBanner() {
  const { activeFestival, festivalConfig, announcementText } = useFestival();

  if (activeFestival === 'none') return null;

  const getIcon = () => {
    switch (activeFestival) {
      case 'diwali': return <Sparkles className="w-5 h-5 md:w-6 md:h-6" />;
      case 'christmas': return <Calendar className="w-5 h-5 md:w-6 md:h-6" />;
      case 'holi': return <Zap className="w-5 h-5 md:w-6 md:h-6" />;
      default: return <PartyPopper className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  const icon = getIcon();

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full relative overflow-hidden h-10 md:h-12 flex items-center"
      style={{ 
        background: `linear-gradient(to right, ${festivalConfig.primaryColor}, ${festivalConfig.secondaryColor})`,
      }}
    >
      <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, '-50%'] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          className="flex items-center gap-12 px-6"
        >
          {/* Repeated items for infinite loop */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4 text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shrink-0">
              {icon}
              <span>{announcementText}</span>
              {icon}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Animated Gloss Overlay */}
      <motion.div 
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeIn' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
}
