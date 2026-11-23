import React from 'react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick(1100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-void pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans select-none">
      {/* Background radial glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-doom/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand & Editorial Description */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-doom-glow animate-pulse" />
              <span className="font-extrabold text-2xl tracking-tight text-white uppercase font-sans">
                AVENGERS: DOOMSDAY
              </span>
            </div>
            
            <p className="text-sm text-silver-muted max-w-lg leading-relaxed font-light">
              The Multiverse is dying. An official cinematic tribute dedicated to Marvel Studios' Phase Six culmination, directed by Anthony and Joe Russo, starring Robert Downey Jr. as Victor von Doom.
            </p>
            
            <div className="text-xs text-doom-bright tracking-widest uppercase font-bold pt-2">
              GLOBAL THEATRICAL PREMIERE: DECEMBER 17, 2026
            </div>
          </div>

          {/* Quick Chapters */}
          <div className="md:col-span-3">
            <h4 className="text-xs text-white tracking-super-wide uppercase mb-4 font-bold">
              CINEMATIC CHAPTERS
            </h4>
            <ul className="space-y-3 text-xs text-silver-muted font-medium">
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="text-doom-glow">01.</span>
                  <span>TEMPORAL COUNTDOWN</span>
                </a>
              </li>
              <li>
                <a 
                  href="#article" 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="text-doom-glow">02.</span>
                  <span>WHO IS DOCTOR DOOM?</span>
                </a>
              </li>
              <li>
                <a 
                  href="#trailer" 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="text-doom-glow">03.</span>
                  <span>OFFICIAL TEASER THEATER</span>
                </a>
              </li>
              <li>
                <a 
                  href="#watchguide" 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span className="text-doom-glow">04.</span>
                  <span>WHAT TO WATCH BEFORE DOOMSDAY</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Premiere Information */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs text-white tracking-super-wide uppercase mb-4 font-bold">
              THE SAGA CULMINATION
            </h4>
            <div className="space-y-2 text-xs text-silver-muted font-light">
              <div>PART I: <span className="text-white font-semibold">AVENGERS: DOOMSDAY (DEC 17, 2026)</span></div>
              <div>PART II: <span className="text-doom-glow font-semibold">AVENGERS: SECRET WARS (2027)</span></div>
              <div className="pt-3 text-[11px] text-silver-dim leading-relaxed">
                DIRECTED BY ANTHONY & JOE RUSSO<br />
                SCREENPLAY BY STEPHEN MCFEELY<br />
                MUSIC BY ALAN SILVESTRI
              </div>
            </div>
          </div>
        </div>

        {/* Large Subtle Editorial Watermark in Background */}
        <div className="text-center my-6 select-none pointer-events-none opacity-5 overflow-hidden">
          <span className="font-extrabold text-5xl sm:text-7xl md:text-9xl tracking-tighter text-white whitespace-nowrap">
            AVENGERS: DOOMSDAY
          </span>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-dim pt-4">
          <div>
            MARVEL STUDIOS ARCHIVE INITIATIVE // ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center space-x-6 font-semibold">
            <span>CASTLE DOOM, LATVERIA</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="text-silver-muted hover:text-white uppercase tracking-wider transition-colors flex items-center space-x-1"
            >
              <span>BACK TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
