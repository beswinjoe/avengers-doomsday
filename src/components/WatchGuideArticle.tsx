import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export const WatchGuideArticle: React.FC = () => {
  return (
    <article id="watchguide" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans text-silver-bright select-none">
      
      {/* Background Ambient Cosmic Flare */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-doom-glow/5 blur-[170px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-doom-glow uppercase mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span>MARVEL CINEMATIC PROSPECTUS // ROAD TO AVENGERS: DOOMSDAY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 leading-tight uppercase"
        >
          WHAT TO WATCH BEFORE DOOMSDAY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-silver-muted max-w-3xl mx-auto font-light leading-relaxed"
        >
          The definitive six-part cinematic preparation roadmap to understand the dying multiverse, incursion physics, and the reign of Victor von Doom before <span className="text-white font-semibold">December 17, 2026</span>.
        </motion.p>

        <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-doom-glow to-transparent mt-8" />
      </div>

      {/* Hero Visual Accent in Article */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[21/9] overflow-hidden mb-20 border-y border-white/10"
      >
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
          alt="Multiversal collision and cosmic fracture"
          className="w-full h-full object-cover filter brightness-80 contrast-125 scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 text-xs text-silver-muted tracking-wider uppercase font-semibold flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-doom-glow animate-pulse" />
          <span>CANONICAL DOSSIER // THE ROAD TO BATTLEWORLD</span>
        </div>
      </motion.div>

      {/* Editorial Content - Non-Boxy, Magazine-Style Fluid Layout */}
      <div className="space-y-20 text-base sm:text-lg text-silver-muted leading-relaxed font-light">
        
        {/* Act 1: The Timeline Shatters */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-widest text-doom-glow uppercase font-bold block mb-1">
              ENTRY 01 // CRITICAL FOUNDATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Loki (Seasons 1 & 2)
            </h3>
            <p className="mt-2 text-xs text-silver-muted font-medium tracking-wider uppercase">
              Format: Disney+ Series (12 Episodes)
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              If you watch only one project before <strong className="text-white">Avengers: Doomsday</strong>, it must be <em className="text-white">Loki</em>. The entire architecture of the modern Marvel Multiverse was born in this series.
            </p>
            <p>
              At the Citadel at the End of Time, Sylvie’s execution of He Who Remains detonates the singular Sacred Timeline into infinite branching realities. In Season 2, as the Temporal Loom fails, Loki makes the ultimate cosmic sacrifice: using his arcane sorcery to physically bind and nourish the dying timeline branches, transforming himself into the <strong className="text-doom-bright">God of Stories</strong>.
            </p>
            <div className="border-l-2 border-doom-glow pl-4 py-1 text-sm text-silver-dim">
              <strong className="text-white block uppercase text-xs tracking-wider mb-1">Why It Matters for Doomsday:</strong>
              Victor von Doom cannot forge Battleworld without breaking the multiversal tree that Loki holds together. The Citadel and the TVA are Doom’s first dimensional targets.
            </div>
          </div>
        </section>

        {/* Cinematic Pull-Quote 1 */}
        <div className="my-14 py-8 border-y border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-doom-glow/5 to-transparent pointer-events-none" />
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-white max-w-3xl mx-auto leading-snug drop-shadow-lg">
            “An incursion occurs when the boundary between two universes erodes and they collide, destroying one or both entirely.”
          </blockquote>
          <cite className="block mt-3 text-xs font-sans font-bold tracking-super-wide text-doom-glow uppercase">
            — Reed Richards (Earth-838 Illuminati)
          </cite>
        </div>

        {/* Act 2: Incursion Physics & The Darkhold */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-widest text-crimson-bright uppercase font-bold block mb-1">
              ENTRY 02 // COSMIC MECHANICS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Doctor Strange in the Multiverse of Madness
            </h3>
            <p className="mt-2 text-xs text-silver-muted font-medium tracking-wider uppercase">
              Format: Feature Film (2022)
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              This film officially establishes the term and mechanics of <strong className="text-crimson-glow font-semibold">Incursions</strong> within MCU canon.
            </p>
            <p>
              When Stephen Strange traverses realities to halt the Scarlet Witch’s Darkhold corruption, he visits Earth-838—where the Illuminati warn him that universal travel leaves quantum footprints. A prolonged breach between two realities destabilizes their gravitational anchors until their planetary cores collide in violent cataclysm.
            </p>
            <p>
              The post-credits appearance of Clea (Charlize Theron) directly sets up the stakes of Doomsday: Strange caused an active incursion tear that threatens our primary reality, Earth-616.
            </p>
            <div className="border-l-2 border-crimson-glow pl-4 py-1 text-sm text-silver-dim">
              <strong className="text-white block uppercase text-xs tracking-wider mb-1">Why It Matters for Doomsday:</strong>
              Incursions are the central threat of <em className="text-white">Doomsday</em>. Rather than stopping incursions, Victor von Doom exploits them—harvesting the colliding fragments of dying earths into a singular patchwork planet.
            </div>
          </div>
        </section>

        {/* Act 3: Anchor Beings & The Void */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-white/10">
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-widest text-silver-bright uppercase font-bold block mb-1">
              ENTRY 03 // MULTIVERSAL DECAY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Deadpool & Wolverine
            </h3>
            <p className="mt-2 text-xs text-silver-muted font-medium tracking-wider uppercase">
              Format: Feature Film (2024)
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              Beyond the record-breaking comedy and action, <em className="text-white">Deadpool & Wolverine</em> introduces a foundational cosmological rule: <strong className="text-white font-semibold">Anchor Beings</strong>.
            </p>
            <p>
              When an anchor being (such as Logan in Earth-10005) dies, that universe’s reality strands begin an agonizing biological and chronological decay. Furthermore, the film returns to <strong className="text-silver-bright">The Void</strong>—the desolate wasteland at the end of time where pruned timelines are discarded.
            </p>
            <div className="border-l-2 border-white/40 pl-4 py-1 text-sm text-silver-dim">
              <strong className="text-white block uppercase text-xs tracking-wider mb-1">Why It Matters for Doomsday:</strong>
              The Void is the physical and thematic foundation of Battleworld. With anchor beings falling across the multiverse, reality after reality is slipping into terminal decay, leaving them vulnerable to Doom’s conquest.
            </div>
          </div>
        </section>

        {/* Act 4: The Fantastic Four & Earth's Fragile Defense */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-white/10">
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-widest text-doom-glow uppercase font-bold block mb-1">
              ENTRIES 04 & 05 // DIRECT PRELUDE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              The Fantastic Four: First Steps & Thunderbolts*
            </h3>
            <p className="mt-2 text-xs text-silver-muted font-medium tracking-wider uppercase">
              Format: Feature Films (July 2025 & May 2025)
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              The direct precursors arriving in theaters immediately before <em className="text-white">Avengers: Doomsday</em>.
            </p>
            <p>
              <strong className="text-white font-semibold">The Fantastic Four: First Steps</strong> introduces Marvel’s First Family (Pedro Pascal, Vanessa Kirby, Joseph Quinn, Ebon Moss-Bachrach) residing in a retro-futuristic alternate 1960s Earth. Their universe enters an incursion trajectory, driving Reed Richards into a desperate multiversal evacuation—and directly onto a collision course with Latveria’s monarch, Victor von Doom.
            </p>
            <p>
              Meanwhile, in <strong className="text-white font-semibold">Thunderbolts*</strong> and <strong className="text-white font-semibold">Captain America: Brave New World</strong>, Earth-616 is fragmented by geopolitical cold wars over Celestial Adamantium, leaving Earth's defensive mantle fractured just as Doom prepares his catastrophic strike.
            </p>
            <div className="border-l-2 border-doom-glow pl-4 py-1 text-sm text-silver-dim">
              <strong className="text-white block uppercase text-xs tracking-wider mb-1">Why It Matters for Doomsday:</strong>
              Reed Richards and Victor von Doom share the deepest intellectual rivalry in comic history. <em className="text-white">Doomsday</em> is fundamentally the confrontation between Reed’s morality and Doom’s absolute authoritarian will.
            </div>
          </div>
        </section>

        {/* Final Editorial Summary / CTA */}
        <div className="pt-16 border-t border-white/10 text-center space-y-4">
          <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
            SUMMARY CHECKLIST FOR DECEMBER 17, 2026
          </h4>
          <p className="text-sm text-silver-muted max-w-xl mx-auto font-light">
            1. Loki (S1 & S2) → 2. Doctor Strange in the Multiverse of Madness → 3. Deadpool & Wolverine → 4. The Fantastic Four: First Steps → 5. Thunderbolts* → <strong>AVENGERS: DOOMSDAY</strong>.
          </p>

          <div className="pt-6">
            <a
              href="#trailer"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick(900);
                document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold tracking-super-wide uppercase text-white hover:text-doom-bright transition-colors border-b border-white/30 hover:border-doom-glow pb-1"
            >
              <span>↑ WATCH THE NEW TEASER TRAILER ABOVE</span>
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};
