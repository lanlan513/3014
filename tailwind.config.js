/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        night: {
          50: '#3a2e28',
          100: '#2e241e',
          200: '#231c17',
          300: '#1a1410',
          400: '#14100c',
          500: '#0d0a08',
        },
        warm: {
          50: '#fef9ec',
          100: '#fbecc4',
          200: '#f7d98c',
          300: '#f4c542',
          400: '#d4af37',
          500: '#8b6914',
          600: '#5c4510',
        },
        neon: {
          pink: '#ff6b9d',
          cyan: '#4ecdc4',
          purple: '#a855f7',
          yellow: '#fbbf24',
        },
        film: {
          brown: '#8b6914',
          sepia: '#704214',
          paper: '#f5e6c8',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        display: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', 'serif'],
        hand: ['"Ma Shan Zheng"', 'cursive'],
      },
      animation: {
        'neon-flicker': 'neon-flicker 3s infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'vinyl-spin': 'vinyl-spin 8s linear infinite',
        'vinyl-spin-slow': 'vinyl-spin 20s linear infinite',
        'warm-glow': 'warm-glow 4s ease-in-out infinite',
        'rain-fall': 'rain-fall 1s linear infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'film-scratch': 'film-scratch 4s linear infinite',
      },
      keyframes: {
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        'neon-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 16px currentColor) drop-shadow(0 0 32px currentColor)' },
        },
        'vinyl-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'warm-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'rain-fall': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'film-scratch': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        'neon-pink': '0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 40px #ff6b9d',
        'neon-cyan': '0 0 10px #4ecdc4, 0 0 20px #4ecdc4, 0 0 40px #4ecdc4',
        'neon-warm': '0 0 10px #f4c542, 0 0 20px #f4c542, 0 0 40px rgba(244, 197, 66, 0.5)',
        'warm-light': '0 0 60px rgba(244, 197, 66, 0.4), 0 0 120px rgba(244, 197, 66, 0.2)',
        'showcase': 'inset 0 0 60px rgba(244, 197, 66, 0.3), 0 0 40px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'film-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23f5e6c8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
};
