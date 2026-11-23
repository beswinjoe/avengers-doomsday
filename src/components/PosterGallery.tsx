import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POSTERS_DATA, PosterItem } from '../data/posters';
import { sound } from '../utils/audio';

export const PosterGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  const filterOptions = [
    { id: 'all', label: 'ALL POSTERS', count: 15 },
    { id: 'ensemble', label: 'THEATRICAL ENSEMBLE', count: 1 },
    { id: 'doom', label: 'DOCTOR DOOM & VILLAINS', count: 2 },
    { id: 'avengers', label: 'AVENGERS & ALLIES', count: 5 },
    { id: 'mutants', label: 'X-MEN & MULTIVERSE', count: 5 },
    { id: 'first-family', label: 'THE FIRST FAMILY', count: 2 },
  ];

  const filteredPosters = activeFilter === 'all'
    ? POSTERS_DATA
    : POSTERS_DATA.filter((p) => {
        if (activeFilter === 'doom') return p.category === 'doom';
        if (activeFilter === 'ensemble') return p.category === 'ensemble';
        if (activeFilter === 'avengers') return p.category === 'avengers';
        if (activeFilter === 'mutants') return p.category === 'mutants';
        if (activeFilter === 'first-family') return p.category === 'first-family';
        return true;
      });

  const handleSelectPoster = (poster: PosterItem) => {
    sound.playClick(1100);
    setSelectedPoster(poster);
  };

  const handleCloseModal = () => {
    sound.playClick(800);
    setSelectedPoster(null);
  };

  const handleNextPoster = () => {
    if (!selectedPoster) return;
    const currentIdx = POSTERS_DATA.findIndex((p) => p.id === selectedPoster.id);
    const nextIdx = (currentIdx + 1) % POSTERS_DATA.length;
    sound.playClick(1000);
    setSelectedPoster(POSTERS_DATA[nextIdx]);
  };

  const handlePrevPoster = () => {
    if (!selectedPoster) return;
    const currentIdx = POSTERS_DATA.findIndex((p) => p.id === selectedPoster.id);
    const prevIdx = (currentIdx - 1 + POSTERS_DATA.length) % POSTERS_DATA.length;
    sound.playClick(1000);
    setSelectedPoster(POSTERS_DATA[prevIdx]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNextPoster();
      if (e.key === 'ArrowLeft') handlePrevPoster();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster]);

  return (
    <section id="posters" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans select-none">
      
      {/* Background Ambient Radial Flare */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-doom-glow/5 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-14 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-doom-glow uppercase mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span>MARVEL STUDIOS // OFFICIAL THEATRICAL ART ARCHIVE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 leading-tight uppercase"
        >
          OFFICIAL THEATRICAL POSTERS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-silver-muted font-light max-w-2xl mx-auto"
        >
          Explore the official 15-piece key art gallery, character one-sheets, and multiversal battle artwork for <span className="text-white font-semibold">Avengers: Doomsday</span>.
        </motion.p>

        <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-doom-glow to-transparent mt-8" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {filterOptions.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                sound.playClick(900);
                setActiveFilter(f.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all border ${
                isActive
                  ? 'border-doom-glow bg-doom-dark text-doom-bright shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'border-white/10 bg-charcoal/60 text-silver-muted hover:text-white hover:border-white/30'
              }`}
            >
              <span>{f.label}</span>
              <span className={`ml-1.5 text-[9px] ${isActive ? 'text-white' : 'text-silver-dim'}`}>
                ({f.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Posters Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5"
      >
        <AnimatePresence>
          {filteredPosters.map((poster, index) => (
            <motion.div
              layout
              key={poster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              onClick={() => handleSelectPoster(poster)}
              onMouseEnter={() => sound.playHover()}
              className="group relative cursor-pointer overflow-hidden bg-charcoal border border-white/10 hover:border-doom-glow transition-all duration-500 shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.25)] flex flex-col"
            >
              {/* Poster 2:3 Aspect Ratio Image Frame */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Dark Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 bg-void/80 backdrop-blur-sm border border-white/15 text-silver-bright">
                    {poster.categoryLabel}
                  </span>
                </div>

                {/* Click to Zoom Icon / Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-3 py-1 bg-void/90 border border-doom-glow text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md shadow-2xl">
                    VIEW POSTER 🔍
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 p-2 bg-void/85 backdrop-blur-md border border-white/10">
                  <div className="font-extrabold text-xs sm:text-sm text-white tracking-tight uppercase truncate">
                    {poster.character}
                  </div>
                  <div className="text-[10px] text-silver-muted truncate font-medium mt-0.5">
                    {poster.actor}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] bg-charcoal border border-hairline-doom flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)]"
            >
              {/* Close Button Top Right */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-none border border-white/20 hover:border-doom-glow bg-void/80 text-silver-muted hover:text-white flex items-center justify-center text-xs font-bold transition-all"
                title="Close (Esc)"
              >
                ✕
              </button>

              {/* Left Column: High-Res Poster View */}
              <div className="md:w-1/2 bg-black relative flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                <img
                  src={selectedPoster.imageUrl}
                  alt={selectedPoster.title}
                  className="max-h-[75vh] w-auto object-contain filter contrast-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Column: Poster Dossier Details */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  {/* Category Pill */}
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-doom-glow uppercase">
                    <span className="w-2 h-2 rounded-full bg-crimson-glow animate-pulse" />
                    <span>{selectedPoster.categoryLabel}</span>
                  </div>

                  {/* Character Name */}
                  <h3 className="font-extrabold text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
                    {selectedPoster.character}
                  </h3>

                  {/* Actor Credit */}
                  <div className="text-sm text-silver-muted font-semibold tracking-wider uppercase">
                    PORTRAYED BY: <span className="text-white">{selectedPoster.actor}</span>
                  </div>

                  {/* Tagline */}
                  <div className="py-2 border-y border-white/10">
                    <span className="font-serif italic text-base sm:text-lg text-doom-bright">
                      “{selectedPoster.tagline}”
                    </span>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm text-silver-bright leading-relaxed font-light">
                    {selectedPoster.description}
                  </p>

                  {/* Official Premiere Info */}
                  <div className="pt-2">
                    <div className="text-[10px] text-silver-dim uppercase tracking-widest font-bold">
                      THEATRICAL PREMIERE DATE:
                    </div>
                    <div className="text-xs font-bold text-white tracking-wider">
                      {selectedPoster.releaseDate} • ONLY IN THEATERS & IMAX
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Controls */}
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <button
                    onClick={handlePrevPoster}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-silver-muted hover:text-white transition-colors"
                  >
                    <span>←</span>
                    <span>PREV POSTER</span>
                  </button>

                  <div className="text-xs text-silver-dim font-mono">
                    {POSTERS_DATA.findIndex((p) => p.id === selectedPoster.id) + 1} / {POSTERS_DATA.length}
                  </div>

                  <button
                    onClick={handleNextPoster}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-silver-muted hover:text-white transition-colors"
                  >
                    <span>NEXT POSTER</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
