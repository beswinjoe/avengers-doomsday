import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export const TrailerTheater: React.FC = () => {
  // Official Marvel Studios Avengers: Doomsday Teaser Trailer
  const [trailerUrl, setTrailerUrl] = useState<string>('https://www.youtube.com/embed/irVNGjRFZGk?autoplay=0&rel=0');
  const [customInput, setCustomInput] = useState<string>('');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpdateTrailer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    sound.playClick(1000);
    let finalUrl = customInput.trim();

    // Convert standard youtube link to embed cleanly
    if (finalUrl.includes('youtu.be/')) {
      const id = finalUrl.split('youtu.be/')[1]?.split('?')[0];
      finalUrl = `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    } else if (finalUrl.includes('watch?v=')) {
      const id = finalUrl.split('watch?v=')[1]?.split('&')[0];
      finalUrl = `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }

    setTrailerUrl(finalUrl);
    setIsEditOpen(false);
  };

  return (
    <section id="trailer" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-doom-glow uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span>CINEMATIC TEASER THEATER</span>
        </div>

        <h2 className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-3">
          OFFICIAL TEASER & FOOTAGE
        </h2>
        
        <p className="text-xs sm:text-sm text-silver-muted max-w-xl mx-auto">
          San Diego Comic-Con Hall H official unmasking and Marvel Studios Phase Six presentation footage.
        </p>

        {/* Custom trailer URL button */}
        <div className="mt-4">
          <button
            onClick={() => {
              sound.playClick();
              setIsEditOpen(!isEditOpen);
            }}
            onMouseEnter={() => sound.playHover()}
            className="text-[11px] text-silver-muted hover:text-white underline underline-offset-4 tracking-wider uppercase transition-colors"
          >
            {isEditOpen ? '[CLOSE URL SETTINGS]' : '[CHANGE OR PASTE CUSTOM TRAILER URL]'}
          </button>
        </div>

        {/* Custom Trailer URL form */}
        {isEditOpen && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleUpdateTrailer}
            className="mt-4 max-w-lg mx-auto flex items-center gap-2 p-3 bg-charcoal border border-hairline-doom"
          >
            <input
              type="text"
              placeholder="Paste YouTube or video embed URL..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-void border border-hairline px-3 py-1.5 text-xs text-white outline-none focus:border-doom-glow"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-doom hover:bg-doom-bright text-void font-bold text-xs uppercase tracking-wider"
            >
              UPDATE
            </button>
          </motion.form>
        )}
      </div>

      {/* Cinematic Theater Container */}
      <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-none overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-black">
        {/* Ambient emerald backlight around screen */}
        <div className="absolute -inset-4 bg-doom-glow/15 blur-2xl pointer-events-none -z-10" />

        {trailerUrl ? (
          <iframe
            src={trailerUrl}
            title="Avengers: Doomsday Official Marvel Studios Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-charcoal p-8 text-center">
            <span className="text-4xl mb-3">🎬</span>
            <div className="font-bold text-lg text-white mb-2">TRAILER PLACEHOLDER READY</div>
            <p className="text-xs text-silver-muted max-w-md">
              Click "[CHANGE OR PASTE CUSTOM TRAILER URL]" above to attach your trailer link or video.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-silver-dim font-sans tracking-widest uppercase max-w-5xl mx-auto">
        <div>MARVEL STUDIOS // PHASE SIX CULMINATION</div>
        <div className="text-doom-bright font-bold">PREMIERE: DECEMBER 17, 2026</div>
      </div>
    </section>
  );
};
