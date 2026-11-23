import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROADMAP_DATA, RoadmapStep } from '../data/roadmap';
import { sound } from '../utils/audio';

export const DoomsdayRoadmap: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<RoadmapStep | null>(null);
  const [showFullImageModal, setShowFullImageModal] = useState<boolean>(false);
  const [watchedSteps, setWatchedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('watched_roadmap_steps');
      return saved ? JSON.parse(saved) : {};
    } catch (_) {
      return {};
    }
  });

  const toggleWatched = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(1200);
    const updated = { ...watchedSteps, [id]: !watchedSteps[id] };
    setWatchedSteps(updated);
    try {
      localStorage.setItem('watched_roadmap_steps', JSON.stringify(updated));
    } catch (_) {}
  };

  const handleSelectStep = (step: RoadmapStep) => {
    sound.playClick(1000);
    setSelectedStep(step);
  };

  // Organize steps into 5 rows of 3 items
  const row1 = ROADMAP_DATA.filter((s) => s.row === 1); // [X-Men, X2, Cap 1] -> Left to Right
  const row2 = ROADMAP_DATA.filter((s) => s.row === 2); // [Avengers 1, Infinity War, Endgame] -> Right to Left
  const row3 = ROADMAP_DATA.filter((s) => s.row === 3); // [Loki, Shang-Chi, NWH] -> Left to Right
  const row4 = ROADMAP_DATA.filter((s) => s.row === 4); // [Wakanda Forever, MOM, D&W] -> Right to Left
  const row5 = ROADMAP_DATA.filter((s) => s.row === 5); // [Cap 4, Thunderbolts, F4] -> Left to Right
  const terminus = ROADMAP_DATA.find((s) => s.row === 6); // Doomsday

  const watchedCount = Object.values(watchedSteps).filter(Boolean).length;

  return (
    <section id="roadmap" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans select-none">
      
      {/* Background Blueprint Grid and Ambient Cyan/Blue Glow (Matches Reference) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[700px] bg-blue-600/10 blur-[190px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-14 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-blue-400 uppercase mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>MARVEL CINEMATIC PROSPECTUS // CANONICAL CHRONOLOGY</span>
        </motion.div>

        {/* The Exact Title from Reference: ROADMAP TO DOOMSDAY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative inline-block"
        >
          <h2 className="font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase drop-shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
            ROADMAP TO<br />DOOMSDAY
          </h2>
          {/* Blue Underline Bar matching the reference image */}
          <div className="h-2.5 sm:h-3.5 w-44 sm:w-64 bg-blue-600 mx-auto mt-2 shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-silver-muted font-light max-w-2xl mx-auto mt-6"
        >
          The definitive 16-title viewing pathway linking the Fox X-Men saga, the Infinity Saga, and the Multiverse Saga directly into <span className="text-white font-semibold">Avengers: Doomsday</span>.
        </motion.p>

        {/* Progress Tracker & Full Graphic Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
          <div className="px-4 py-1.5 bg-void/80 border border-white/15 text-silver-bright flex items-center space-x-2">
            <span>PREPARATION PROGRESS:</span>
            <span className="text-doom-bright">{watchedCount} / 15 WATCHED</span>
          </div>

          <button
            onClick={() => {
              sound.playClick(1000);
              setShowFullImageModal(true);
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-4 py-1.5 bg-blue-600/30 hover:bg-blue-600 border border-blue-500/50 text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            VIEW ORIGINAL INFOGRAPHIC ↗
          </button>
        </div>
      </div>

      {/* The Serpentine S-Curve Blueprint Canvas */}
      <div className="relative p-4 sm:p-8 bg-void/85 border border-blue-900/40 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-md overflow-hidden">
        
        {/* Subtle Background Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col space-y-8 sm:space-y-12">
          
          {/* ROW 1: [X-Men] -> [X-Men 2] -> [Cap 1] (arrow down) */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {row1.map((item, idx) => (
                <div key={item.id} className="relative flex items-center">
                  <RoadmapCard
                    item={item}
                    isWatched={!!watchedSteps[item.id]}
                    onSelect={() => handleSelectStep(item)}
                    onToggleWatched={(e) => toggleWatched(item.id, e)}
                  />
                  {/* Right Arrow connecting col 0 -> 1 and col 1 -> 2 */}
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute -right-4 lg:-right-5 z-20 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      ▶
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Down Arrow from Cap 1 (col 2) down to Avengers 1 (col 2) */}
            <div className="flex justify-end pr-[14%] sm:pr-[15%] pt-3 -mb-3 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              ▼
            </div>
          </div>

          {/* ROW 2: [Endgame] <- [Infinity War] <- [The Avengers] (arrow down) */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {/* Display order on screen: Col 0: Endgame, Col 1: Infinity War, Col 2: Avengers 1 */}
              {[row2[2], row2[1], row2[0]].map((item, idx) => (
                <div key={item.id} className="relative flex items-center">
                  <RoadmapCard
                    item={item}
                    isWatched={!!watchedSteps[item.id]}
                    onSelect={() => handleSelectStep(item)}
                    onToggleWatched={(e) => toggleWatched(item.id, e)}
                  />
                  {/* Left Arrow connecting Col 2 -> Col 1 and Col 1 -> Col 0 */}
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute -left-4 lg:-left-5 z-20 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      ◀
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Down Arrow from Endgame (col 0) down to Loki (col 0) */}
            <div className="flex justify-start pl-[14%] sm:pl-[15%] pt-3 -mb-3 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              ▼
            </div>
          </div>

          {/* ROW 3: [Loki] -> [Shang-Chi] -> [Spider-Man NWH] (arrow down) */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {row3.map((item, idx) => (
                <div key={item.id} className="relative flex items-center">
                  <RoadmapCard
                    item={item}
                    isWatched={!!watchedSteps[item.id]}
                    onSelect={() => handleSelectStep(item)}
                    onToggleWatched={(e) => toggleWatched(item.id, e)}
                  />
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute -right-4 lg:-right-5 z-20 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      ▶
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Down Arrow from Spider-Man NWH (col 2) down to Wakanda Forever (col 2) */}
            <div className="flex justify-end pr-[14%] sm:pr-[15%] pt-3 -mb-3 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              ▼
            </div>
          </div>

          {/* ROW 4: [Deadpool & Wolverine] <- [MOM] <- [Wakanda Forever] (arrow down) */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {/* Display order: Col 0: D&W, Col 1: MOM, Col 2: Wakanda Forever */}
              {[row4[2], row4[1], row4[0]].map((item, idx) => (
                <div key={item.id} className="relative flex items-center">
                  <RoadmapCard
                    item={item}
                    isWatched={!!watchedSteps[item.id]}
                    onSelect={() => handleSelectStep(item)}
                    onToggleWatched={(e) => toggleWatched(item.id, e)}
                  />
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute -left-4 lg:-left-5 z-20 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      ◀
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Down Arrow from Deadpool & Wolverine (col 0) down to Cap: Brave New World (col 0) */}
            <div className="flex justify-start pl-[14%] sm:pl-[15%] pt-3 -mb-3 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              ▼
            </div>
          </div>

          {/* ROW 5: [Brave New World] -> [Thunderbolts*] -> [The Fantastic 4] (arrow down) */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {row5.map((item, idx) => (
                <div key={item.id} className="relative flex items-center">
                  <RoadmapCard
                    item={item}
                    isWatched={!!watchedSteps[item.id]}
                    onSelect={() => handleSelectStep(item)}
                    onToggleWatched={(e) => toggleWatched(item.id, e)}
                  />
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute -right-4 lg:-right-5 z-20 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      ▶
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Down Arrow from Fantastic 4 (col 2) down towards Doomsday */}
            <div className="flex justify-end pr-[14%] sm:pr-[15%] pt-3 -mb-2 text-blue-400 text-lg font-bold pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              ▼
            </div>
          </div>

          {/* TERMINUS: MARVEL STUDIOS AVENGERS: DOOMSDAY */}
          {terminus && (
            <div className="pt-4 flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => handleSelectStep(terminus)}
                className="group relative cursor-pointer p-4 sm:p-6 bg-charcoal/90 border-2 border-doom-glow/80 hover:border-doom-glow max-w-md w-full shadow-[0_0_40px_rgba(16,185,129,0.35)] transition-all flex flex-col items-center"
              >
                {/* Official Doomsday Logo from crop */}
                <div className="w-full max-w-[280px] sm:max-w-[340px] mb-2">
                  <img
                    src={terminus.logoUrl}
                    alt="Marvel Studios Avengers: Doomsday"
                    className="w-full h-auto object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]"
                  />
                </div>

                <div className="text-xs font-bold tracking-super-wide uppercase text-doom-bright mt-2">
                  THE FINAL DESTINATION // DECEMBER 17, 2026
                </div>

                <div className="text-[10px] text-silver-muted mt-1">
                  Click to inspect the culmination event dossier ↗
                </div>

                {/* Backlight Glow */}
                <div className="absolute inset-0 bg-doom-glow/10 blur-xl pointer-events-none -z-10 group-hover:bg-doom-glow/20 transition-all" />
              </motion.div>
            </div>
          )}

        </div>
      </div>

      {/* Step Detail Dossier Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-charcoal border border-hairline-doom p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-4 right-4 w-7 h-7 border border-white/20 text-silver-muted hover:text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>

              {/* Logo Preview */}
              <div className="mb-4 max-h-20 flex items-center justify-center bg-black/50 p-3 border border-white/10">
                <img
                  src={selectedStep.logoUrl}
                  alt={selectedStep.title}
                  className="max-h-14 w-auto object-contain"
                />
              </div>

              {/* Title & Step Header */}
              <div className="text-xs font-mono font-bold tracking-widest text-doom-glow uppercase mb-1">
                STEP 0{selectedStep.stepNumber} // {selectedStep.releaseYear} • {selectedStep.universe}
              </div>

              <h3 className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-3">
                {selectedStep.title}
              </h3>

              {/* Key Importance */}
              <div className="p-3 bg-white/5 border-l-2 border-doom-glow mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-doom-bright">
                  ROADMAP SIGNIFICANCE:
                </div>
                <div className="text-sm font-semibold text-white">
                  {selectedStep.importance}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-silver-bright leading-relaxed font-light mb-6">
                {selectedStep.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={(e) => toggleWatched(selectedStep.id, e)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                    watchedSteps[selectedStep.id]
                      ? 'border-doom-glow bg-doom-dark text-doom-bright'
                      : 'border-white/20 bg-void text-silver-bright hover:border-doom-glow'
                  }`}
                >
                  {watchedSteps[selectedStep.id] ? '✓ MARKED AS WATCHED' : '○ MARK AS WATCHED'}
                </button>

                <button
                  onClick={() => setSelectedStep(null)}
                  className="text-xs font-bold tracking-wider uppercase text-silver-muted hover:text-white"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Graphic One-Sheet Modal */}
      <AnimatePresence>
        {showFullImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullImageModal(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative max-w-2xl w-full flex flex-col items-center">
              <button
                onClick={() => setShowFullImageModal(false)}
                className="absolute -top-10 right-0 text-white font-bold text-sm tracking-wider uppercase"
              >
                [CLOSE ✕]
              </button>
              <img
                src="/assets/roadmap/roadmap-full.jpg"
                alt="Full Roadmap to Doomsday"
                className="max-h-[85vh] w-auto object-contain border border-blue-500/40 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

// Sub-component for individual roadmap cards
interface RoadmapCardProps {
  item: RoadmapStep;
  isWatched: boolean;
  onSelect: () => void;
  onToggleWatched: (e: React.MouseEvent) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  item,
  isWatched,
  onSelect,
  onToggleWatched
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      onClick={onSelect}
      onMouseEnter={() => sound.playHover()}
      className={`group relative w-full aspect-[16/10] sm:aspect-[16/9] bg-charcoal/90 border cursor-pointer transition-all duration-300 p-2 sm:p-3 flex flex-col justify-between overflow-hidden shadow-lg ${
        isWatched
          ? 'border-doom-glow/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          : 'border-white/15 hover:border-blue-400/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]'
      }`}
    >
      {/* Top Header: Step Number & Watched Checkbox */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-silver-dim">
        <span className="font-bold text-blue-400 group-hover:text-blue-300">
          0{item.stepNumber}
        </span>
        <button
          onClick={onToggleWatched}
          className={`px-1.5 py-0.5 border text-[8px] font-bold uppercase transition-colors ${
            isWatched 
              ? 'border-doom-glow text-doom-bright bg-doom-dark/40' 
              : 'border-white/20 text-silver-dim hover:text-white'
          }`}
          title={isWatched ? 'Watched' : 'Mark Watched'}
        >
          {isWatched ? '✓' : '○'}
        </button>
      </div>

      {/* Center: Movie Logo */}
      <div className="flex-1 flex items-center justify-center my-1">
        <img
          src={item.logoUrl}
          alt={item.title}
          className="max-h-10 sm:max-h-12 w-auto object-contain filter brightness-100 group-hover:brightness-110 transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />
      </div>

      {/* Bottom Year & Universe */}
      <div className="text-[8px] sm:text-[9px] text-silver-dim truncate font-medium flex items-center justify-between border-t border-white/5 pt-1">
        <span>{item.releaseYear}</span>
        <span className="text-blue-400/80 group-hover:text-white transition-colors">
          INFO ↗
        </span>
      </div>

      {/* Subtle Blue Glow on hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
