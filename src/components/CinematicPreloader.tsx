import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if preloader bypass is requested via query param or session
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preloader') === 'false' || sessionStorage.getItem('preloader_seen') === 'true') {
      setIsDismissed(true);
      onComplete();
      return;
    }

    // Quick cinematic sequencing (~1.5s total)
    const timer1 = setTimeout(() => setStep(1), 350);
    const timer2 = setTimeout(() => setStep(2), 850);
    const timer3 = setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem('preloader_seen', 'true');
      setTimeout(onComplete, 300);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sound.playAccessGranted();
    setIsDismissed(true);
    sessionStorage.setItem('preloader_seen', 'true');
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center p-6 cursor-pointer select-none"
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

          {/* Central Terminal / Warning Sequence */}
          <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
            
            {/* S.W.O.R.D. / TVA Emblem */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-12 h-12 border border-doom-glow/40 flex items-center justify-center mb-5 bg-charcoal"
            >
              <div className="w-6 h-6 border-2 border-crimson-glow transform rotate-45 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs text-crimson-glow tracking-super-wide uppercase mb-2"
            >
              LEVEL 7 MULTIVERSAL EMERGENCY
            </motion.div>

            <div className="h-8 flex items-center justify-center">
              {step === 0 && (
                <motion.p
                  key="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs text-silver-muted tracking-widest"
                >
                  CALIBRATING S.W.O.R.D. ORBITAL SENSORS...
                </motion.p>
              )}

              {step === 1 && (
                <motion.p
                  key="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs text-doom-glow tracking-widest"
                >
                  DETECTING LATVERIAN QUANTUM SIGNATURE...
                </motion.p>
              )}

              {step >= 2 && (
                <motion.div
                  key="2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-bebas text-2xl tracking-widest text-silver-bright"
                >
                  "ALL HOPE LIES IN DOOM"
                </motion.div>
              )}
            </div>

            {/* Hairline progress bar */}
            <div className="w-48 h-[1px] bg-charcoal relative overflow-hidden mt-5">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-doom-glow to-transparent"
              />
            </div>

            <div className="mt-6 font-mono text-[9px] text-silver-dim tracking-ultra-wide uppercase">
              CLICK ANYWHERE TO PROCEED IMMEDIATELY
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
