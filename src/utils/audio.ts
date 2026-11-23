// Advanced Audio Engine with Real Avengers Teaser Theme, Acoustic Clock Ticking & Autoplay Control

class SoundEngine {
  private audioEl: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isTickMuted: boolean = false;
  private isPlaying: boolean = false;
  private ctx: AudioContext | null = null;
  private tickBuffer: AudioBuffer | null = null;
  private tockBuffer: AudioBuffer | null = null;
  private listeners: ((isMuted: boolean, isPlaying: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioEl = new Audio('/assets/avengers-teaser-theme.mp3');
        this.audioEl.preload = 'auto';
        this.audioEl.loop = true; // 24-hour continuous loop

        this.audioEl.addEventListener('play', () => {
          this.isPlaying = true;
          this.notify();
        });

        this.audioEl.addEventListener('pause', () => {
          this.isPlaying = false;
          this.notify();
        });

        // Automatically start playing without asking the user
        this.startAutoplay();

        // Preload acoustic watch tick buffers
        this.loadTickBuffers();
      } catch (_) {
        // Fallback
      }
    }
  }

  // Preload authentic mechanical escapement audio buffers
  private async loadTickBuffers() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const [tickRes, tockRes] = await Promise.all([
        fetch('/assets/clock-tick.wav'),
        fetch('/assets/clock-tock.wav')
      ]);
      const [tickData, tockData] = await Promise.all([
        tickRes.arrayBuffer(),
        tockRes.arrayBuffer()
      ]);
      this.tickBuffer = await this.ctx.decodeAudioData(tickData);
      this.tockBuffer = await this.ctx.decodeAudioData(tockData);
    } catch (_) {
      // Fallback handled smoothly in playClockTick
    }
  }

  // Automatic seamless playback without asking
  public startAutoplay() {
    if (!this.audioEl) return;
    this.audioEl.volume = 0.85;

    const playPromise = this.audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // If browser autoplay policy blocks unprompted audio,
          // seamlessly start on the very first natural user gesture (click, touch, scroll, keydown, mousemove)
          const onAnyGesture = () => {
            if (this.audioEl && !this.isPlaying && !this.isMuted) {
              this.audioEl.play().then(() => {
                this.isPlaying = true;
                this.notify();
              }).catch(() => {});
            }
            window.removeEventListener('click', onAnyGesture);
            window.removeEventListener('touchstart', onAnyGesture);
            window.removeEventListener('scroll', onAnyGesture);
            window.removeEventListener('keydown', onAnyGesture);
            window.removeEventListener('mousemove', onAnyGesture);
          };

          window.addEventListener('click', onAnyGesture, { once: true, passive: true });
          window.addEventListener('touchstart', onAnyGesture, { once: true, passive: true });
          window.addEventListener('scroll', onAnyGesture, { once: true, passive: true });
          window.addEventListener('keydown', onAnyGesture, { once: true, passive: true });
          window.addEventListener('mousemove', onAnyGesture, { once: true, passive: true });
        });
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isMuted, this.isPlaying));
  }

  public subscribe(callback: (isMuted: boolean, isPlaying: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsTickMuted(): boolean {
    return this.isTickMuted;
  }

  public toggleTick(): boolean {
    this.isTickMuted = !this.isTickMuted;
    return this.isTickMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Realistic Acoustic Mechanical Clock Tick (Escapement pulse)
  public playClockTick(isOdd: boolean = false) {
    if (this.isMuted || this.isTickMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // 1. Play realistic acoustic sample buffer if loaded
    const buffer = isOdd ? this.tockBuffer : this.tickBuffer;
    if (buffer) {
      try {
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        gain.gain.value = 0.28; // refined natural level
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
        return;
      } catch (_) {}
    }

    // 2. Warm acoustic synthetic fallback
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const freq = isOdd ? 780 : 980;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.025);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (_) {}
  }

  // Play the iconic Marvel / Avengers Theme Fanfare directly
  public playAvengersTheme() {
    if (!this.audioEl) {
      try {
        this.audioEl = new Audio('/assets/avengers-teaser-theme.mp3');
        this.audioEl.loop = true;
      } catch (_) {
        return;
      }
    }

    this.isMuted = false;
    this.audioEl.loop = true;
    this.audioEl.volume = 0.85;

    const playPromise = this.audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          const onUserGesture = () => {
            this.audioEl?.play().then(() => {
              this.isPlaying = true;
              this.notify();
            }).catch(() => {});
            window.removeEventListener('click', onUserGesture);
            window.removeEventListener('keydown', onUserGesture);
          };
          window.addEventListener('click', onUserGesture, { once: true });
          window.addEventListener('keydown', onUserGesture, { once: true });
        });
    }
  }

  public pauseTheme() {
    if (this.audioEl) {
      this.audioEl.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggleMute(): boolean {
    if (this.isPlaying) {
      this.pauseTheme();
      this.isMuted = true;
    } else {
      this.playAvengersTheme();
      this.isMuted = false;
    }
    this.notify();
    return this.isMuted;
  }

  public playClick(freq = 1200) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  public playHover() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(660, now + 0.05);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {}
  }

  public playChime(freq = 110) {
    this.playClick(freq);
  }

  public playAccessGranted() {
    this.playClick(880);
  }

  public playStaticBurst() {
    this.playClick(600);
  }
}

export const sound = new SoundEngine();
