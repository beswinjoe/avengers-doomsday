import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { FilmGrain } from './components/FilmGrain';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { DoomArticle } from './components/DoomArticle';
import { TrailerTheater } from './components/TrailerTheater';
import { PosterGallery } from './components/PosterGallery';
import { DoomsdayRoadmap } from './components/DoomsdayRoadmap';
import { Footer } from './components/Footer';
import { CinematicPreloader } from './components/CinematicPreloader';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Handle initial hash scroll
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -60, immediate: true });
        }
      }, 50);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track active section for navigation
  useEffect(() => {
    const sectionIds = ['hero', 'article', 'trailer', 'posters', 'roadmap'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('article');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-void text-silver-bright selection:bg-doom selection:text-white font-sans">
      {/* Cinematic Opening Preloader */}
      <CinematicPreloader onComplete={() => {}} />

      {/* Atmospheric Film Grain & Ash Particles */}
      <FilmGrain />

      {/* Sticky Cinematic Navigation HUD */}
      <Navigation activeSection={activeSection} />

      {/* Main Experience */}
      <main className="relative z-10">
        {/* Full-Screen Hero Experience */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* Seamless Hairline Divider */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-doom-glow/20 to-transparent" />
        </div>

        {/* Editorial Feature Article: Who is Doom? Why is Doom here? */}
        <DoomArticle />

        {/* Seamless Hairline Divider */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Cinematic Teaser & Footage Theater */}
        <TrailerTheater />

        {/* Seamless Hairline Divider */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-doom-glow/20 to-transparent" />
        </div>

        {/* Official Theatrical Posters & Character Key Art */}
        <PosterGallery />

        {/* Seamless Hairline Divider */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-crimson-glow/20 to-transparent" />
        </div>

        {/* Roadmap to Doomsday: Exact Serpentine Pathway matching reference */}
        <DoomsdayRoadmap />
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
