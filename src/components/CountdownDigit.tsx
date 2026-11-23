import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownDigitProps {
  value: string;
  label: string;
  accent?: 'doom' | 'crimson' | 'silver';
}

export const CountdownDigit: React.FC<CountdownDigitProps> = ({ 
  value, 
  label,
  accent = 'silver'
}) => {
  const accentClasses = {
    doom: 'text-doom-bright border-doom/50 group-hover:border-doom-glow bg-doom-darkest/40',
    crimson: 'text-crimson-glow border-crimson/50 group-hover:border-crimson-glow bg-crimson-darkest/40',
    silver: 'text-silver-chrome border-white/15 group-hover:border-white/35 bg-charcoal/80'
  };

  const labelClasses = {
    doom: 'text-doom-glow font-bold',
    crimson: 'text-crimson-glow font-bold',
    silver: 'text-silver-muted font-medium'
  };

  const isRapidUpdate = label.toUpperCase() === 'MS';

  return (
    <div className="group flex flex-col items-center">
      {/* Number Card */}
      <div 
        className={`relative overflow-hidden w-14 sm:w-18 md:w-24 lg:w-28 h-16 sm:h-20 md:h-28 lg:h-32 backdrop-blur-md border ${accentClasses[accent]} flex items-center justify-center transition-colors duration-300 shadow-2xl`}
      >
        {/* Subtle grid line in center for mechanical flip-clock feel */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-void/80 z-10" />

        {/* Hairline corner accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-70" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-current opacity-70" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-current opacity-70" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-70" />

        {isRapidUpdate ? (
          <span className="font-bebas text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider select-none font-mono">
            {value}
          </span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider select-none"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        )}

        {/* Ambient subtle backlight */}
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* Label */}
      <span className={`mt-1.5 font-mono text-[9px] sm:text-[11px] tracking-super-wide uppercase ${labelClasses[accent]}`}>
        {label}
      </span>
    </div>
  );
};
