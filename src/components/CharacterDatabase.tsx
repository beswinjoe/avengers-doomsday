import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS_DATABASE } from '../data/characters';
import { CharacterProfile, AffiliationType } from '../types';
import { sound } from '../utils/audio';

export const CharacterDatabase: React.FC = () => {
  const [selectedAffiliation, setSelectedAffiliation] = useState<string>('ALL');
  const [activeProfile, setActiveProfile] = useState<CharacterProfile | null>(null);

  const affiliations: { label: string; value: string }[] = [
    { label: 'ALL ENTITIES', value: 'ALL' },
    { label: 'LATVERIA / DOOM', value: 'LATVERIA / GOD EMPEROR' },
    { label: 'AVENGERS', value: 'AVENGERS' },
    { label: 'FANTASTIC FOUR', value: 'FANTASTIC FOUR' },
    { label: 'X-MEN / MUTANTS', value: 'X-MEN / MUTANTS' },
    { label: 'MULTIVERSE / TVA', value: 'MULTIVERSE / TVA' }
  ];

  const filteredCharacters = CHARACTERS_DATABASE.filter((c) => {
    return selectedAffiliation === 'ALL' || c.affiliation === selectedAffiliation;
  });

  const getThemeColors = (theme: 'doom' | 'crimson' | 'silver') => {
    switch (theme) {
      case 'doom':
        return {
          border: 'border-hairline-doom hover:border-doom-glow',
          text: 'text-doom-glow',
          bg: 'bg-doom-dark/20',
          badge: 'border-doom-glow text-doom-bright bg-doom-darkest'
        };
      case 'crimson':
        return {
          border: 'border-hairline-crimson hover:border-crimson-glow',
          text: 'text-crimson-glow',
          bg: 'bg-crimson-dark/20',
          badge: 'border-crimson-glow text-crimson-bright bg-crimson-darkest'
        };
      case 'silver':
      default:
        return {
          border: 'border-hairline hover:border-white/40',
          text: 'text-silver-chrome',
          bg: 'bg-charcoal/30',
          badge: 'border-silver-muted text-silver-bright bg-charcoal'
        };
    }
  };

  return (
    <section id="characters" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-6 mb-10 gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-silver-dim tracking-ultra-wide uppercase mb-2">
            <span className="w-2 h-2 bg-doom-glow rounded-full" />
            <span>MULTIVERSE ENTITY REGISTRY</span>
            <span>// THREAT CLASSIFICATION MATRIX</span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-silver-chrome">
            CHARACTER ARCHIVE
          </h2>
          <p className="font-space text-xs sm:text-sm text-silver-muted max-w-xl mt-1">
            Detailed biometric, threat classification, and geopolitical dossiers for pivotal figures of the impending convergence.
          </p>
        </div>

        {/* Affiliation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {affiliations.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                sound.playClick(1100);
                setSelectedAffiliation(tab.value);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`whitespace-nowrap px-3 py-1.5 font-mono text-xs tracking-wider border transition-all ${
                selectedAffiliation === tab.value
                  ? 'border-doom-glow bg-doom-dark/40 text-doom-bright font-medium'
                  : 'border-hairline bg-charcoal/40 text-silver-muted hover:text-silver-bright hover:border-silver-dim'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCharacters.map((char, index) => {
          const theme = getThemeColors(char.themeColor);

          return (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => {
                sound.playChime(150);
                setActiveProfile(char);
              }}
              className={`group relative bg-charcoal/60 border ${theme.border} transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between`}
            >
              {/* Image Container with Cinematic Aspect & Vignette */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-void">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75 group-hover:filter-none group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />

                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                {/* Threat Badge on Top Right */}
                <div className="absolute top-3 right-3">
                  <span className={`font-mono text-[9px] tracking-widest px-2 py-0.5 border ${theme.badge}`}>
                    {char.threatClass}
                  </span>
                </div>

                {/* Actor Credit on Top Left */}
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-silver-dim px-2 py-0.5 bg-void/80 border border-hairline">
                  {char.actor}
                </div>
              </div>

              {/* Dossier Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-silver-dim mb-1">
                    {char.affiliation}
                  </div>

                  <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-silver-chrome group-hover:text-white transition-colors">
                    {char.alias}
                  </h3>

                  <div className="font-space text-xs text-silver-muted font-medium mb-3">
                    {char.name} • <span className="font-mono text-[10px] text-silver-dim">{char.universe}</span>
                  </div>

                  <p className="font-space text-xs text-silver-muted line-clamp-3 leading-relaxed mb-4">
                    {char.bio}
                  </p>
                </div>

                {/* Bottom Footer Info */}
                <div className="pt-4 border-t border-hairline flex items-center justify-between font-mono text-[10px]">
                  <span className={`truncate max-w-[200px] ${theme.text}`}>
                    {char.status.split('—')[0]}
                  </span>
                  <span className="text-silver-bright group-hover:text-doom-bright tracking-widest transition-colors">
                    DOSSIER [+]
                  </span>
                </div>
              </div>

              {/* Corner hairpins */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-current transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-current transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-current transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-current transition-colors" />
            </motion.div>
          );
        })}
      </div>

      {/* Comprehensive Character Dossier Modal */}
      <AnimatePresence>
        {activeProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void/90 backdrop-blur-md"
            onClick={() => setActiveProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-charcoal border border-hairline-doom shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 right-4 z-20 font-mono text-xs text-silver-dim hover:text-white px-2 py-1 border border-hairline hover:border-white transition-all bg-charcoal/80"
              >
                [CLOSE ESC]
              </button>

              {/* Modal Left: Cinematic Imagery & Quote */}
              <div className="w-full md:w-5/12 relative bg-void flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-hairline">
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-4">
                  <img
                    src={activeProfile.image}
                    alt={activeProfile.name}
                    className="w-full h-full object-cover filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 font-mono text-[9px] px-2 py-0.5 bg-void/90 border border-hairline text-silver-dim">
                    BIOMETRIC SCAN // CONFIRMED
                  </div>
                </div>

                <blockquote className="border-l-2 border-doom-glow pl-3 py-1 font-space italic text-xs text-silver-bright leading-relaxed">
                  {activeProfile.quote}
                </blockquote>
              </div>

              {/* Modal Right: In-Depth Dossier Data */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 font-mono text-[10px] tracking-widest text-silver-dim mb-1">
                    <span>AFFILIATION: {activeProfile.affiliation}</span>
                    <span>•</span>
                    <span className="text-crimson-glow">{activeProfile.threatClass}</span>
                  </div>

                  <h2 className="font-extrabold text-3xl sm:text-4xl text-silver-chrome leading-tight mb-1">
                    {activeProfile.alias}
                  </h2>
                  <div className="font-space text-sm text-silver-muted mb-4">
                    Real Name: <span className="text-white font-semibold">{activeProfile.name}</span> | Portrayed by: <span className="text-doom-bright">{activeProfile.actor}</span>
                  </div>

                  {/* Universe / Status strip */}
                  <div className="p-3 bg-void border border-hairline mb-5 font-mono text-xs space-y-1">
                    <div className="text-silver-dim">DIMENSION: <span className="text-silver-bright">{activeProfile.universe}</span></div>
                    <div className="text-silver-dim">STATUS: <span className="text-doom-glow">{activeProfile.status}</span></div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h4 className="font-mono text-[11px] text-silver-dim tracking-widest uppercase mb-1">
                      TACTICAL PROFILE
                    </h4>
                    <p className="font-space text-xs sm:text-sm text-silver-bright leading-relaxed">
                      {activeProfile.bio}
                    </p>
                  </div>

                  {/* Abilities & Equipment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-mono text-[11px] text-doom-bright tracking-widest uppercase mb-2">
                        RECORDED ABILITIES
                      </h4>
                      <ul className="space-y-1 font-mono text-xs text-silver-muted">
                        {activeProfile.abilities.map((ab, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-doom-glow">▹</span>
                            <span>{ab}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] text-silver-chrome tracking-widest uppercase mb-2">
                        TACTICAL ARTIFACTS
                      </h4>
                      <ul className="space-y-1 font-mono text-xs text-silver-muted">
                        {activeProfile.equipment.map((eq, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-silver-dim">▹</span>
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* S.W.O.R.D. Analyst Notes */}
                <div className="pt-4 border-t border-hairline bg-void/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-6">
                  <div className="font-mono text-[10px] text-silver-dim tracking-widest uppercase mb-1">
                    S.W.O.R.D. ANALYST DISPATCH
                  </div>
                  <p className="font-space text-xs text-silver-muted leading-relaxed">
                    {activeProfile.dossierNotes}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
