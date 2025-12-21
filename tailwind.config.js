/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: '#F5F2ED',
        charcoal: '#2D2926',
        sage: '#8B9474',
        gold: '#B38B4D',
        'soft-terracotta': '#E8D0C5',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Urbanist"', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}