import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountdownTime } from '../types';
import { calculateCountdown, formatTwoDigits, DEFAULT_RELEASE_DATE } from '../utils/countdown';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreClick
}) => {
  const [releaseDate, setReleaseDate] = useState<Date>(DEFAULT_RELEASE_DATE);
  const [countdown, setCountdown] = useState<CountdownTime>(() => calculateCountdown(DEFAULT_RELEASE_DATE));
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [customDateInput, setCustomDateInput] = useState('2026-12-17T00:00');
  const [isPlayingTheme, setIsPlayingTheme] = useState(sound.getIsPlaying());
  const [isTickActive, setIsTickActive] = useState(!sound.getIsTickMuted());
  
  const prevSecondRef = useRef<number>(countdown.seconds);

  useEffect(() => {
    const unsub = sound.subscribe((_, isPlaying) => {
      setIsPlayingTheme(isPlaying);
    });

    const timer = setInterval(() => {
      const nextTime = calculateCountdown(releaseDate);
      
      // Play clock tick sound on every second change
      if (nextTime.seconds !== prevSecondRef.current) {
        prevSecondRef.current = nextTime.seconds;
        sound.playClockTick(nextTime.seconds % 2 === 1);
      }

      setCountdown(nextTime);
    }, 100);

    // Automatically trigger audio playback immediately without asking
    sound.startAutoplay();

    const handleFirstGesture = () => {
      if (!sound.getIsPlaying()) {
        sound.playAvengersTheme();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('mousemove', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('mousemove', handleFirstGesture, { once: true, passive: true });

    return () => {
      unsub();
      clearInterval(timer);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('mousemove', handleFirstGesture);
    };
  }, [releaseDate]);

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingTheme) {
      sound.pauseTheme();
    } else {
      sound.playAvengersTheme();
    }
  };

  const handleToggleClockTick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isMuted = sound.toggleTick();
    setIsTickActive(!isMuted);
    sound.playClick(1100);
  };

  const handleApplyCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDateInput) return;
    const newDate = new Date(customDateInput);
    if (!isNaN(newDate.getTime())) {
      setReleaseDate(newDate);
      setIsConfigOpen(false);
      sound.playClick(1000);
    }
  };

  const handleResetDefaultDate = () => {
    setReleaseDate(DEFAULT_RELEASE_DATE);
    setCustomDateInput('2026-12-17T00:00');
    setIsConfigOpen(false);
    sound.playClick(1000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-void select-none font-sans"
    >
      {/* Background Cinematic Image - Cleaned Doctor Doom Gothic Window */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          src="/assets/doom-clean.jpg"
          alt="Doctor Doom in Latveria"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
        />
        {/* Subtle Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,3,5,0.85)_100%)]" />
        <div className="absolute inset-0 bg-doom-glow/5 mix-blend-color-dodge pointer-events-none" />
      </div>

      {/* Top Banner Status Info */}
      <div className="relative z-10 w-full pt-20 sm:pt-24 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto text-silver-dim text-[10px] sm:text-xs tracking-ultra-wide uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span>MARVEL STUDIOS // PHASE SIX PREMIERE</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a 
            href="https://buymeacoffee.com/beswinjoe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors tracking-widest text-[10px] sm:text-[11px] font-bold"
          >
            <span>☕</span>
            <span className="underline underline-offset-4 decoration-amber-500/50 hover:decoration-amber-300">buymeacoffee/beswinjoe</span>
          </a>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="text-[10px] tracking-widest text-silver-muted hidden sm:block">
            DECEMBER 17, 2026
          </div>
        </div>
      </div>

      {/* Main Center Content: Clean Minimalist Layout Matching Reference */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 text-center my-auto py-6 sm:py-10 flex flex-col items-center">
        
        {/* Marvel Studios Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm tracking-monumental text-silver-muted uppercase mb-3 font-semibold"
        >
          MARVEL STUDIOS
        </motion.div>

        {/* Monumental Clean Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-extrabold text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] px-2 mb-3"
        >
          AVENGERS: DOOMSDAY
        </motion.h1>

        {/* The Exact "DOOMSDAY IS COMING" Subtitle from Reference */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 mb-8 sm:mb-12"
        >
          <h2 className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-super-wide text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
            DOOMSDAY IS COMING
          </h2>
          <div className="h-[2px] w-28 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-doom-glow to-transparent mt-2" />
        </motion.div>

        {/* The Live Minimalist Sans Countdown from Reference Image */}
        <div className="flex flex-col items-center w-full px-1">
          
          {/* Main Numbers: MONTHS : DAYS : HOURS : MINUTES : SECONDS */}
          <div className="flex items-baseline justify-center gap-1.5 sm:gap-4 md:gap-6 lg:gap-8 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-normal sm:tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            {/* Months */}
            <div className="flex flex-col items-center min-w-[42px] sm:min-w-[60px]">
              <span className="font-bold tabular-nums">
                {formatTwoDigits(countdown.months)}
              </span>
              <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs text-silver-muted tracking-wider sm:tracking-super-wide uppercase font-semibold">
                MONTHS
              </span>
            </div>

            <span className="text-white/40 font-light select-none -translate-y-3 sm:-translate-y-4">:</span>

            {/* Days */}
            <div className="flex flex-col items-center min-w-[42px] sm:min-w-[60px]">
              <span className="font-bold tabular-nums">
                {formatTwoDigits(countdown.days)}
              </span>
              <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs text-silver-muted tracking-wider sm:tracking-super-wide uppercase font-semibold">
                DAYS
              </span>
            </div>

            <span className="text-white/40 font-light select-none -translate-y-3 sm:-translate-y-4">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[42px] sm:min-w-[60px]">
              <span className="font-bold tabular-nums">
                {formatTwoDigits(countdown.hours)}
              </span>
              <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs text-silver-muted tracking-wider sm:tracking-super-wide uppercase font-semibold">
                HOURS
              </span>
            </div>

            <span className="text-white/40 font-light select-none -translate-y-3 sm:-translate-y-4">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center min-w-[42px] sm:min-w-[60px]">
              <span className="font-bold tabular-nums">
                {formatTwoDigits(countdown.minutes)}
              </span>
              <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs text-silver-muted tracking-wider sm:tracking-super-wide uppercase font-semibold">
                MINS
              </span>
            </div>

            <span className="text-white/40 font-light select-none -translate-y-3 sm:-translate-y-4">:</span>

            {/* Seconds (with live clock tick visual pulse) */}
            <div className="flex flex-col items-center min-w-[42px] sm:min-w-[60px]">
              <span className="font-bold tabular-nums text-doom-bright drop-shadow-[0_0_15px_rgba(16,185,129,0.7)] transition-transform duration-100">
                {formatTwoDigits(countdown.seconds)}
              </span>
              <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs text-doom-glow tracking-wider sm:tracking-super-wide uppercase font-bold flex items-center space-x-1">
                <span>SECS</span>
                {isTickActive && <span className="w-1 h-1 rounded-full bg-doom-glow animate-ping" />}
              </span>
            </div>
          </div>

          {/* Official Release Date Label */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                setIsConfigOpen(!isConfigOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              className="text-[11px] sm:text-xs text-silver-muted hover:text-white tracking-widest uppercase transition-colors border-b border-white/20 pb-0.5 font-semibold"
            >
              {isConfigOpen ? '[CLOSE SETTINGS]' : `[THEATRICAL PREMIERE: DECEMBER 17, 2026 • CONFIGURE]`}
            </button>
          </div>

          {/* Config Modal */}
          <AnimatePresence>
            {isConfigOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-xl mt-4 p-4 border border-hairline-doom bg-charcoal/95 backdrop-blur-md overflow-hidden text-left"
              >
                <form onSubmit={handleApplyCustomDate} className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="w-full sm:w-auto">
                    <label className="block text-[10px] text-silver-muted tracking-wider mb-1 uppercase font-semibold">
                      Select Custom Release / Incursion Target:
                    </label>
                    <input
                      type="datetime-local"
                      value={customDateInput}
                      onChange={(e) => setCustomDateInput(e.target.value)}
                      className="bg-void border border-hairline text-silver-bright px-3 py-1.5 text-xs focus:border-doom-glow outline-none w-full sm:w-72"
                    />
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleResetDefaultDate}
                      className="px-3 py-1.5 border border-hairline text-[11px] tracking-wider text-silver-muted hover:text-silver-bright hover:bg-steel transition-all"
                    >
                      RESET (DEC 17, 2026)
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 border border-doom text-[11px] tracking-wider bg-doom-dark hover:bg-doom text-silver-bright transition-all font-semibold"
                    >
                      APPLY
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fluid Editorial Navigation Buttons - Non-boxy, clean & elevated */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
            <button
              onClick={() => {
                sound.playClick(800);
                onExploreClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-8 py-3.5 bg-white text-void font-bold text-xs sm:text-sm tracking-super-wide uppercase hover:bg-silver-bright transition-all shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:-translate-y-0.5"
            >
              WHO IS DOOM? READ ARTICLE ↓
            </button>

            <a
              href="#trailer"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick(900);
                document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-white/25 hover:border-doom-glow bg-void/60 hover:bg-doom-dark/40 text-silver-bright font-bold text-xs sm:text-sm tracking-super-wide uppercase transition-all flex items-center space-x-2"
            >
              <span>▶</span>
              <span>WATCH TEASER</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Watermark Bar */}
      <div className="relative z-10 w-full pb-6 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto border-t border-hairline pt-3 text-silver-dim text-[10px] tracking-widest">
        <div>COORDINATES: CASTLE DOOM // LATVERIA</div>
        <div className="flex items-center space-x-2">
          <span>THE ROAD TO BATTLEWORLD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-doom-glow" />
        </div>
      </div>
    </section>
  );
};
