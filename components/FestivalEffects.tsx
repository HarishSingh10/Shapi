'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useFestival } from './FestivalContext';

export function FestivalEffects() {
  const { activeFestival } = useFestival();
  const pathname = usePathname();

  // ONLY render effects on the storefront root page / dashboard first page
  if (activeFestival === 'none' || pathname !== '/') return null;

  const renderEffect = () => {
    switch (activeFestival) {
      case 'diwali':
        // Moving sparkles/diyas
        return Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px #FFD700',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ));
      case 'christmas':
        // Falling snow
        return Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
            animate={{
              y: '100vh',
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ));
      case 'new-year':
        // Confetti
        return Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 10,
              height: 10,
              backgroundColor: ['#7DF9FF', '#B87333', '#D4AF37', '#FFFFFF'][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ));
      case 'holi':
        // Splash blobs
        return Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              backgroundColor: ['#E91E63', '#2196F3', '#4CAF50', '#FFEB3B'][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {renderEffect()}
    </div>
  );
}
