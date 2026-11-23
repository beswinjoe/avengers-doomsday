import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MULTIVERSE_TIMELINE } from '../data/timeline';
import { TimelineEvent } from '../types';
import { sound } from '../utils/audio';

export const MultiverseTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(MULTIVERSE_TIMELINE.length - 1);
  const [isAutoTraversing, setIsAutoTraversing] = useState<boolean>(false);
  const currentEvent: TimelineEvent = MULTIVERSE_TIMELINE[activeIndex];
  const autoPlayTimerRef = useRef<number | null>(null);

  const handleSelectWaypoint = (index: number) => {
    sound.playClick(900 + index * 90);
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % MULTIVERSE_TIMELINE.length;
    handleSelectWaypoint(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + MULTIVERSE_TIMELINE.length) % MULTIVERSE_TIMELINE.length;
    handleSelectWaypoint(prevIdx);
  };

  const toggleAutoTraverse = () => {
    sound.playClick(1100);
    setIsAutoTraversing(!isAutoTraversing);
  };

  // Auto-traverse loop through route waypoints
  useEffect(() => {
    if (isAutoTraversing) {
      autoPlayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % MULTIVERSE_TIMELINE.length);
      }, 5000);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoTraversing]);

  // Coordinates data for each route waypoint
  const routeCoordinates = [
    { code: 'SEC-828.14', incursionDist: '4.8 LIGHT-AEONS', threat: 'ANOMALY DETECTED' },
    { code: 'SEC-TVA.00', incursionDist: 'BEYOND TIME', threat: 'TIMELINE SHATTER' },
    { code: 'SEC-838.92', incursionDist: '1.2 LIGHT-AEONS', threat: 'COLLAPSE ACTIVE' },
    { code: 'SEC-VOID.Ω', incursionDist: 'NULL-SPACE', threat: 'ANCHOR DECAY' },
    { code: 'SEC-616.01', incursionDist: '0.3 LIGHT-AEONS', threat: 'DEFENSE BROKEN' },
    { code: 'SEC-DOOM.∞', incursionDist: 'COLLISION POINT', threat: 'OMEGA CONVERGENCE' }
  ];

  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans overflow-hidden select-none">
      
      {/* Background Ambient Cosmic Void Flare (Matches Hero Cathedral Glow) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-doom-glow/5 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-16 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-doom-glow uppercase mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span>CHRONO-SPATIAL TRAJECTORY // MULTIVERSE ROUTE MAP</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 leading-tight uppercase"
        >
          THE ROUTE TO DOOMSDAY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-silver-muted font-light max-w-2xl mx-auto"
        >
          An interactive cosmic vector charting the six dimensional waypoints colliding directly into <span className="text-white font-semibold">Battleworld on December 17, 2026</span>.
        </motion.p>

        {/* Route Map Controls HUD */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={toggleAutoTraverse}
            onMouseEnter={() => sound.playHover()}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
              isAutoTraversing
                ? 'border-doom-glow bg-doom-dark text-doom-bright animate-pulse'
                : 'border-white/20 bg-charcoal/80 text-silver-muted hover:text-white hover:border-doom-glow'
            }`}
          >
            <span>{isAutoTraversing ? '■ PAUSE ROUTE TRAVERSE' : '▶ AUTO-TRAVERSE ROUTE'}</span>
          </button>
        </div>

        <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-doom-glow to-transparent mt-8" />
      </div>

      {/* Visual Starchart Route Vector Line (The Route Map) */}
      <div className="relative mb-16 px-2">
        
        {/* Background Grid Lines for Route Map */}
        <div className="absolute inset-0 border-y border-white/5 pointer-events-none" />

        {/* Continuous Incursion Route Conduit */}
        <div className="relative flex items-center justify-between py-6 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          
          {/* Glowing animated line behind nodes */}
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-gradient-to-r from-doom-glow/20 via-silver-dim/40 to-crimson-glow -translate-y-1/2 pointer-events-none z-0" />

          {MULTIVERSE_TIMELINE.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isDoomsday = idx === MULTIVERSE_TIMELINE.length - 1;
            const coords = routeCoordinates[idx];

            return (
              <button
                key={item.id}
                onClick={() => handleSelectWaypoint(idx)}
                onMouseEnter={() => sound.playHover()}
                className={`relative z-10 flex-1 min-w-[150px] sm:min-w-[180px] py-4 px-3 flex flex-col items-center text-center transition-all duration-300 group ${
                  isActive ? 'scale-105' : 'opacity-65 hover:opacity-100'
                }`}
              >
                {/* Route Node Pin / Incursion Core */}
                <div className="relative mb-3 flex items-center justify-center">
                  <span
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? isDoomsday
                          ? 'border-crimson-bright bg-crimson-glow shadow-[0_0_20px_rgba(225,29,72,0.9)] scale-125'
                          : 'border-doom-bright bg-doom-glow shadow-[0_0_20px_rgba(16,185,129,0.9)] scale-125'
                        : 'border-white/30 bg-void group-hover:border-white'
                    }`}
                  />
                  {isActive && (
                    <span
                      className={`absolute w-8 h-8 rounded-full animate-ping opacity-50 ${
                        isDoomsday ? 'bg-crimson-glow' : 'bg-doom-glow'
                      }`}
                    />
                  )}
                </div>

                {/* Waypoint Number & Code */}
                <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 font-bold ${
                  isActive 
                    ? isDoomsday ? 'text-crimson-bright' : 'text-doom-bright' 
                    : 'text-silver-muted'
                }`}>
                  WAYPOINT 0{idx + 1} // {coords.code}
                </span>

                {/* Milestone Location / Universe */}
                <span className={`text-xs sm:text-sm font-bold tracking-tight uppercase truncate max-w-[170px] ${
                  isActive ? 'text-white' : 'text-silver-muted group-hover:text-silver-bright'
                }`}>
                  {item.universe.split('&')[0]}
                </span>

                {/* Telemetry Distance */}
                <span className="text-[10px] text-silver-dim tracking-wider mt-1 font-mono">
                  {coords.incursionDist}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panoramic Waypoint Stage (Widescreen Cinematic Display) */}
      <div className="relative border-y border-white/10 py-10 sm:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* Visual Column: Panoramic Cinematic Window */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src={currentEvent.imageUrl}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Vignettes & Ambient Color Glaze */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
                
                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-void/80 backdrop-blur-sm border border-white/15 text-white">
                  <span>VECTOR: {currentEvent.universe}</span>
                </div>

                {/* Bottom Incursion Status Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-void/90 backdrop-blur-md px-4 py-2 border border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-crimson-glow animate-pulse" />
                    <span className="text-silver-muted text-[11px] font-sans uppercase tracking-wider font-semibold">
                      INCURSION SEVERITY:
                    </span>
                  </div>
                  <span className={`font-sans text-xs font-bold uppercase tracking-widest ${
                    currentEvent.status === 'PENDING DOOM' 
                      ? 'text-crimson-bright animate-pulse' 
                      : currentEvent.status === 'INCUSION COLLAPSE'
                      ? 'text-amber-400'
                      : 'text-doom-bright'
                  }`}>
                    {currentEvent.status}
                  </span>
                </div>
              </div>

              {/* Decorative Subtle Glow Behind Artwork */}
              <div 
                className="absolute -inset-2 bg-gradient-to-r from-doom-glow/10 to-crimson-glow/10 blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </div>

            {/* Editorial Column: Clean Modern Typography (No Boxy Cards) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Milestone Indicator */}
              <div>
                <div className="flex items-center space-x-3 text-xs tracking-super-wide uppercase font-bold text-doom-glow mb-2">
                  <span>WAYPOINT 0{activeIndex + 1} OF 06</span>
                  <span>•</span>
                  <span>{currentEvent.phase}</span>
                </div>

                {/* Headline */}
                <h3 className="font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
                  {currentEvent.title}
                </h3>

                {/* Story Description */}
                <p className="text-base sm:text-lg text-silver-muted font-light leading-relaxed mb-6">
                  {currentEvent.summary}
                </p>

                {/* Impact Brief */}
                <div className="border-l-2 border-doom-glow pl-4 py-1 mb-6">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">
                    COSMIC COLLISION TRAJECTORY
                  </div>
                  <p className="text-xs sm:text-sm text-silver-dim leading-relaxed">
                    {currentEvent.incursionImpact}
                  </p>
                </div>

                {/* Key Entities Involved */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-silver-muted mb-2">
                    KEY PARTICIPANTS AT THIS NEXUS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentEvent.keyEntities.map((entity, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-silver-bright bg-white/5 border border-white/10 px-2.5 py-1 tracking-wider uppercase"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seamless Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-silver-muted hover:text-white transition-colors"
                >
                  <span>←</span>
                  <span>PREVIOUS WAYPOINT</span>
                </button>

                <div className="text-xs font-bold tracking-widest text-silver-dim">
                  0{activeIndex + 1} / 06
                </div>

                <button
                  onClick={handleNext}
                  onMouseEnter={() => sound.playHover()}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-silver-muted hover:text-white transition-colors"
                >
                  <span>NEXT WAYPOINT</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Editorial Callout */}
      <div className="mt-14 text-center">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-silver-muted">
          ALL INEVITABLE PATHS COLLIDE AT <span className="text-white font-bold">BATTLEWORLD // DECEMBER 17, 2026</span>
        </p>
      </div>
    </section>
  );
};
