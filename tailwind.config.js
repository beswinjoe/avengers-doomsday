/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#030305',
        obsidian: '#07080a',
        charcoal: '#0e1014',
        steel: '#181b22',
        titanium: '#2b303c',
        slateMetallic: '#545b6d',
        doom: {
          darkest: '#020b06',
          dark: '#061c12',
          DEFAULT: '#0d3824',
          accent: '#105e38',
          glow: '#10b981',
          toxic: '#34d399',
          bright: '#6ee7b7'
        },
        crimson: {
          darkest: '#1a0404',
          dark: '#3f0808',
          DEFAULT: '#6b1111',
          accent: '#991b1b',
          glow: '#ef4444'
        },
        silver: {
          dim: '#4a4e57',
          muted: '#828997',
          DEFAULT: '#b4bac5',
          bright: '#e2e6ed',
          chrome: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['"Montserrat"', '"Inter"', 'sans-serif'],
        space: ['"Inter"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        bebas: ['"Montserrat"', '"Inter"', 'sans-serif'], // Remapped to bold sans style as requested
        cinzel: ['"Montserrat"', '"Inter"', 'sans-serif']
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'super-wide': '0.35em',
        'monumental': '0.5em'
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'doom-glow': 'doomGlow 6s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        doomGlow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.15))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(16, 185, 129, 0.45))' },
        }
      }
    },
  },
  plugins: [],
}
