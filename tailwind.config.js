/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'aoc-indigo': '#003087',
        'aoc-gold': '#CAB64B',
        'aoc-black': '#1C1F2A',
        'aoc-white': '#F2F2F2',
      },
      fontFamily: {
        'darker-grotesque': ['Darker Grotesque', 'sans-serif'],
        'inter-tight': ['Inter Tight', 'sans-serif'],
        'fustat': ['Fustat', 'sans-serif'],
      },
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
      },
    },
  },
  plugins: [],
};
