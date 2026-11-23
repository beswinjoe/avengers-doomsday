import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Ash / Cosmic debris particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.6 ? 150 : 0 // emerald green or crimson tint
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.hue === 150) {
          ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(226, 230, 237, ${p.opacity * 0.4})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dynamic Ash / Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-20 opacity-60"
        aria-hidden="true"
      />
      {/* SVG Cinematic Film Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 opacity-40 film-grain mix-blend-overlay"
        aria-hidden="true"
      />
      {/* Subtle Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,3,5,0.85)_100%)]"
        aria-hidden="true"
      />
    </>
  );
};
