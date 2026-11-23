import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../utils/audio';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activeSection 
}) => {
  const [isPlayingTheme, setIsPlayingTheme] = useState(sound.getIsPlaying());
  const [isTickActive, setIsTickActive] = useState(!sound.getIsTickMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsub = sound.subscribe((_, isPlaying) => {
      setIsPlayingTheme(isPlaying);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Visualizer audio waveform loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlayingTheme) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      phase += 0.15;
      const barWidth = 3;
      const gap = 2;
      let x = 0;

      for (let i = 0; i < 7; i++) {
        const heightMultiplier = (Math.sin(phase + i * 0.8) + 1) / 2;
        const barHeight = Math.max(3, heightMultiplier * canvas.height);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#ffffff';
        ctx.fillRect(x, y, barWidth, barHeight);
        x += barWidth + gap;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlayingTheme]);

  const navLinks = [
    { id: 'hero', label: 'COUNTDOWN' },
    { id: 'article', label: 'WHO IS DOOM?' },
    { id: 'trailer', label: 'THE TRAILER' },
    { id: 'posters', label: 'POSTERS' },
    { id: 'roadmap', label: 'ROADMAP' }
  ];

  const handleNavClick = (id: string) => {
    sound.playClick(900);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleTheme = () => {
    if (isPlayingTheme) {
      sound.pauseTheme();
    } else {
      sound.playAvengersTheme();
    }
  };

  const handleToggleTick = () => {
    const isMuted = sound.toggleTick();
    setIsTickActive(!isMuted);
    sound.playClick(1100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled 
          ? 'bg-void/90 backdrop-blur-md border-b border-hairline py-3 shadow-2xl' 
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Official Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <img
            src="/assets/doomsday-logo-trans.png"
            alt="Marvel Studios Avengers: Doomsday"
            className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Center: Clean Editorial Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => sound.playHover()}
                className={`relative text-xs tracking-wider uppercase transition-colors py-1 font-semibold ${
                  isActive 
                    ? 'text-doom-bright font-bold' 
                    : 'text-silver-muted hover:text-silver-bright'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-doom-glow" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sound & Fanfare Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Tick Sound Toggle */}
          <button
            onClick={handleToggleTick}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 border text-[10px] font-semibold transition-all ${
              isTickActive
                ? 'border-doom-glow/40 text-doom-bright bg-doom-dark/30'
                : 'border-white/10 text-silver-dim hover:text-white'
            }`}
            title="Toggle Clock Ticking Sound"
          >
            <span>⏱ {isTickActive ? 'TICK ON' : 'TICK OFF'}</span>
          </button>

          {/* 24hr Soundtrack Loop Button */}
          <button
            onClick={handleToggleTheme}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center space-x-2 px-3 py-1 border transition-all text-[10px] sm:text-[11px] font-bold tracking-wider ${
              isPlayingTheme 
                ? 'border-doom-glow bg-doom-dark text-doom-bright' 
                : 'border-white/20 bg-charcoal/80 text-silver-bright hover:border-doom-glow hover:text-doom-bright'
            }`}
            title="Toggle Avengers Music"
          >
            <canvas
              ref={canvasRef}
              width={26}
              height={10}
              className="w-6 h-2.5"
            />
            <span>{isPlayingTheme ? 'MUSIC ON' : 'MUSIC MUTED'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
