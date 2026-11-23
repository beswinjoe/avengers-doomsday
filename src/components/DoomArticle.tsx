import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export const DoomArticle: React.FC = () => {
  return (
    <article id="article" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans text-silver-bright">
      
      {/* Editorial Header */}
      <div className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-super-wide text-doom-glow uppercase mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-doom-glow animate-pulse" />
          <span>MARVEL CINEMATIC PROSPECTUS // IN-DEPTH DOSSIER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 leading-tight"
        >
          WHO IS DOCTOR DOOM?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-silver-muted max-w-3xl mx-auto font-light leading-relaxed"
        >
          And why his arrival in <span className="text-white font-semibold">Avengers: Doomsday</span> means the absolute end of the Marvel Multiverse as we know it.
        </motion.p>

        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-doom-glow to-transparent mt-8" />
      </div>

      {/* Hero Visual Accent in Article */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[21/9] overflow-hidden mb-16 rounded-none border-y border-white/10"
      >
        <img
          src="/assets/doom-clean.jpg"
          alt="Victor von Doom contemplating power"
          className="w-full h-full object-cover filter brightness-90 contrast-125 scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 text-xs text-silver-muted tracking-wider uppercase font-semibold">
          THE MONARCH OF LATVERIA // SOVEREIGN OF THE BEYOND
        </div>
      </motion.div>

      {/* Editorial Content - Non-Boxy, Magazine-Style Fluid Layout */}
      <div className="space-y-16 text-base sm:text-lg text-silver-muted leading-relaxed font-light">
        
        {/* Section 1: The Myth & The Man */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
              01. The Tragedy of Victor von Doom
            </h3>
            <p className="mt-2 text-xs text-doom-glow font-semibold tracking-wider uppercase">
              The Sorcerer. The Scientist. The King.
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              Victor von Doom is not a conqueror born of petty greed or chaotic bloodlust. Unlike Thanos, who worshipped balance through extinction, or Kang, who fragmented eternity into vanity wars, von Doom operates on an uncompromising, terrifying logic:
              <strong className="text-white font-semibold"> he believes he is the only being in existence capable of saving the universe from itself.</strong>
            </p>
            <p>
              Born to Romani parents in Latveria, Victor suffered the loss of his mother Cynthia to dark demonic bargaining and his father to cruel feudal persecution. Burning with an obsession to conquer death, Victor mastered two irreconcilable forces:
              <span className="text-doom-bright font-medium"> peerless theoretical quantum science</span> and
              <span className="text-doom-bright font-medium"> ancient eldritch sorcery</span>.
            </p>
            <p>
              Behind the forged titanium faceplate lies a mind that rivals Reed Richards in intellect and equals the Sorcerer Supreme in arcane mastery. When Doom speaks of order, he has already tested every alternative—and found every hero wanting.
            </p>
          </div>
        </section>

        {/* Cinematic Pull-Quote */}
        <div className="my-16 py-10 border-y border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-doom-glow/5 to-transparent pointer-events-none" />
          <blockquote className="font-serif italic text-2xl sm:text-4xl text-white max-w-3xl mx-auto leading-snug drop-shadow-lg">
            “I was not born to rule. I rule because there is no other mind capable of preserving existence from its own madness.”
          </blockquote>
          <cite className="block mt-4 text-xs font-sans font-bold tracking-super-wide text-doom-glow uppercase">
            — Victor von Doom
          </cite>
        </div>

        {/* Section 2: Why Doom Wants to Be Here */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
              02. Why Doom Is Here
            </h3>
            <p className="mt-2 text-xs text-crimson-glow font-semibold tracking-wider uppercase">
              The Arithmetic of Annihilation
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              Why is Doom appearing now? The answer is rooted in the cosmological crisis known as <strong className="text-white">Incursions</strong>.
            </p>
            <p>
              Following the events of <em className="text-white">Loki</em>, <em className="text-white">Doctor Strange in the Multiverse of Madness</em>, and <em className="text-white">Deadpool & Wolverine</em>, the Sacred Timeline has splintered into violent parallel realities. When the boundary between two universes begins to decay, their planetary cores enter a collision trajectory. If neither Earth is destroyed, both universes are utterly extinguished.
            </p>
            <p>
              The Avengers preach moral restraint. Reed Richards searches for diplomatic equations. But Doom sees the truth: <span className="text-crimson-glow font-semibold">parallel worlds cannot co-exist indefinitely</span>.
            </p>
            <p>
              Doom has built a monumental quantum siphon. Rather than attempting to patch a dying multiverse, Doom intends to let colliding realities collapse into ash—harvesting the scattered universal remnants to forge his own singular, eternal patchwork realm: <strong className="text-white font-bold">Battleworld</strong>.
            </p>
          </div>
        </section>

        {/* Section 3: The Face of a Savior */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-white/10">
          <div className="md:col-span-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
              03. The Face of a Savior
            </h3>
            <p className="mt-2 text-xs text-silver-muted font-semibold tracking-wider uppercase">
              Robert Downey Jr.’s Historic Return
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-silver-bright">
            <p>
              The casting of Robert Downey Jr. is not a gimmick—it is a weaponized psychological narrative device.
            </p>
            <p>
              To the surviving heroes of Earth-616—Sam Wilson, Spider-Man, Thor—that face is the ultimate symbol of sacrifice. Tony Stark was the hero who gave his life with a snap of his fingers so the universe could live.
            </p>
            <p>
              Now, when Victor von Doom removes his mask, the heroes will look upon the face of their fallen savior—transformed into their most terrifying and merciless conqueror. The emotional devastation will be insurmountable.
            </p>
          </div>
        </section>

        {/* Action Button: To Trailer */}
        <div className="pt-12 text-center">
          <a
            href="#trailer"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick(900);
              document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-sm font-bold tracking-super-wide uppercase text-white hover:text-doom-bright transition-colors border-b border-white/30 hover:border-doom-glow pb-1"
          >
            <span>WATCH THE TEASER THEATER BELOW</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </article>
  );
};
