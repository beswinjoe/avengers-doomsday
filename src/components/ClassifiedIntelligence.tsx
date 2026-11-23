import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLASSIFIED_INTELLIGENCE } from '../data/intelligence';
import { ClassificationType, IntelligenceItem } from '../types';
import { sound } from '../utils/audio';

export const ClassifiedIntelligence: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedPhrases, setRevealedPhrases] = useState<Set<string>>(new Set());
  const [activeItemModal, setActiveItemModal] = useState<IntelligenceItem | null>(null);

  const categories: { label: string; value: string }[] = [
    { label: 'ALL INTELLIGENCE', value: 'ALL' },
    { label: 'CONFIRMED ANNOUNCEMENTS', value: 'CONFIRMED' },
    { label: 'OFFICIAL CAST & CREW', value: 'OFFICIAL ANNOUNCEMENT' },
    { label: 'MULTIVERSE LORE', value: 'MULTIVERSE INTEL' }
  ];

  const filteredItems = CLASSIFIED_INTELLIGENCE.filter((item) => {
    const matchesCategory = selectedFilter === 'ALL' || item.classification === selectedFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRedaction = (phrase: string) => {
    sound.playClick(1400);
    setRevealedPhrases((prev) => {
      const next = new Set(prev);
      if (next.has(phrase)) {
        next.delete(phrase);
      } else {
        next.add(phrase);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    sound.playClick(900);
    const allPhrases = new Set<string>();
    CLASSIFIED_INTELLIGENCE.forEach((item) => {
      item.redactedPhrases.forEach((p) => allPhrases.add(p));
    });
    setRevealedPhrases(allPhrases);
  };

  const renderRedactedText = (text: string, redactedPhrases: string[]) => {
    if (!redactedPhrases.length) return <span>{text}</span>;

    const regex = new RegExp(`(${redactedPhrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, idx) => {
          const isRedacted = redactedPhrases.some(p => p.toLowerCase() === part.toLowerCase());
          if (!isRedacted) return <span key={idx}>{part}</span>;

          const isRevealed = revealedPhrases.has(part) || revealedPhrases.has(part.trim());

          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                toggleRedaction(part.trim());
              }}
              title={isRevealed ? "Click to redact" : "Click to decrypt classified intelligence"}
              className={`inline-block mx-1 text-xs cursor-pointer select-none px-1.5 py-0.5 transition-all duration-300 font-sans ${
                isRevealed
                  ? 'bg-doom/30 text-doom-bright border-b border-doom-glow font-medium'
                  : 'bg-titanium hover:bg-slateMetallic text-transparent rounded-[2px]'
              }`}
            >
              {part}
            </span>
          );
        })}
      </>
    );
  };

  const getBadgeStyle = (classification: ClassificationType) => {
    switch (classification) {
      case 'CONFIRMED':
        return 'border-doom-glow text-doom-bright bg-doom-darkest/70';
      case 'OFFICIAL ANNOUNCEMENT':
        return 'border-silver-bright text-silver-bright bg-charcoal/70';
      case 'MULTIVERSE INTEL':
        return 'border-emerald-500 text-emerald-400 bg-black/80';
      default:
        return 'border-hairline text-silver-muted';
    }
  };

  return (
    <section id="intelligence" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-6 mb-10 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-silver-dim tracking-ultra-wide uppercase mb-2 font-semibold">
            <span className="w-2 h-2 bg-crimson-glow rounded-full animate-ping" />
            <span>MARVEL STUDIOS ARCHIVAL INTELLIGENCE</span>
            <span>// PHASE SIX PROTOCOL</span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-silver-chrome">
            OFFICIAL PRODUCTION INTELLIGENCE
          </h2>
          <p className="text-xs sm:text-sm text-silver-muted max-w-2xl mt-1.5 leading-relaxed">
            Verified production updates, Hall H presentations, directorial statements, and the official incursion cosmology governing Avengers: Doomsday.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRevealAll}
            onMouseEnter={() => sound.playHover()}
            className="px-4 py-2 border border-hairline hover:border-doom-glow bg-charcoal/80 text-xs font-semibold tracking-wider text-silver-bright hover:text-doom-bright transition-all"
          >
            DECRYPT ALL REDACTIONS
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        
        {/* Classification Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                sound.playClick(1000);
                setSelectedFilter(cat.value);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`whitespace-nowrap px-3.5 py-1.5 text-xs tracking-wider border transition-all font-semibold ${
                selectedFilter === cat.value
                  ? 'border-doom-glow bg-doom-dark/50 text-doom-bright'
                  : 'border-hairline bg-charcoal/40 text-silver-muted hover:text-silver-bright hover:border-silver-dim'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            placeholder="SEARCH INTELLIGENCE DOSSIERS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal/80 border border-hairline focus:border-doom-glow px-3 py-1.5 text-xs text-silver-bright placeholder:text-silver-dim outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1.5 text-xs text-silver-dim hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Intelligence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const badgeClass = getBadgeStyle(item.classification);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => {
                sound.playClick(750);
                setActiveItemModal(item);
              }}
              className="group relative bg-charcoal/60 hover:bg-charcoal border border-hairline hover:border-hairline-doom transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
            >
              {/* Hairline corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-doom-glow transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-doom-glow transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-doom-glow transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-doom-glow transition-colors" />

              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-[11px] tracking-wider text-silver-dim mb-3 font-semibold">
                  <span>{item.code}</span>
                  <span className="text-crimson-glow">{item.clearanceLevel}</span>
                </div>

                {/* Classification Badge */}
                <div className="mb-3">
                  <span className={`inline-block text-[10px] tracking-wider uppercase px-2.5 py-0.5 border ${badgeClass} font-semibold`}>
                    {item.classification}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-silver-bright group-hover:text-white transition-colors mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Summary with redacted capability */}
                <p className="text-xs text-silver-muted leading-relaxed line-clamp-3 mb-4 font-normal">
                  {renderRedactedText(item.summary, item.redactedPhrases)}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-hairline flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-silver-dim">
                  <span>DEPT: {item.department.split('&')[0]}</span>
                  <span>{new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                {/* Threat Assessment Metric */}
                <div className="flex items-center space-x-2 text-[10px] text-silver-muted font-medium">
                  <span className="w-1.5 h-1.5 bg-doom-glow rounded-full" />
                  <span className="truncate">{item.threatAssessment}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeItemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void/90 backdrop-blur-md"
            onClick={() => setActiveItemModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-charcoal border border-hairline-doom p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 text-xs text-silver-dim hover:text-white px-2.5 py-1 border border-hairline hover:border-white transition-all font-semibold"
              >
                [CLOSE ESC]
              </button>

              <div className="text-[11px] text-silver-dim tracking-wider mb-2 flex items-center space-x-3 font-semibold">
                <span>{activeItemModal.code}</span>
                <span>//</span>
                <span className="text-doom-glow">{activeItemModal.clearanceLevel}</span>
              </div>

              <div className="mb-4">
                <span className={`inline-block text-[10px] tracking-wider uppercase px-2.5 py-1 border ${getBadgeStyle(activeItemModal.classification)} font-semibold`}>
                  {activeItemModal.classification}
                </span>
              </div>

              <h2 className="font-extrabold text-2xl sm:text-3xl text-silver-bright mb-4">
                {activeItemModal.title}
              </h2>

              <div className="p-4 bg-void/60 border border-hairline mb-6 text-xs text-silver-dim flex flex-wrap gap-4 justify-between font-semibold">
                <div>DEPARTMENT: <span className="text-silver-bright">{activeItemModal.department}</span></div>
                <div>TIMELOCK: <span className="text-silver-bright">{activeItemModal.timestamp}</span></div>
                <div>ASSESSMENT: <span className="text-crimson-glow">{activeItemModal.threatAssessment}</span></div>
              </div>

              {/* Full Report with Interactive Redactions */}
              <div className="mb-8">
                <h4 className="text-xs text-doom-glow tracking-wider uppercase mb-2 font-bold">
                  OFFICIAL MARVEL STUDIOS BRIEFING
                </h4>
                <div className="text-sm sm:text-base text-silver-bright leading-relaxed bg-void/30 p-4 border border-hairline font-normal">
                  {renderRedactedText(activeItemModal.fullReport, activeItemModal.redactedPhrases)}
                </div>
                <div className="mt-2 text-[10px] text-silver-dim">
                  * Click any blackened segment to toggle security redaction.
                </div>
              </div>

              {/* Verified Sources & References */}
              <div>
                <h4 className="text-xs text-silver-muted tracking-wider uppercase mb-3 font-bold">
                  VERIFIED INDUSTRY SOURCES
                </h4>
                <div className="space-y-2">
                  {activeItemModal.sources.map((src, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between p-2.5 bg-void border border-hairline text-xs">
                      <div className="flex items-center space-x-2 text-silver-bright font-semibold">
                        <span className="text-doom-glow">↳</span>
                        <span>{src.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-silver-dim">
                        <span>{src.date}</span>
                        {src.url && (
                          <a 
                            href={src.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-doom-glow hover:underline text-[11px] font-semibold"
                          >
                            [VERIFY OUTLET]
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
