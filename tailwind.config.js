/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 This makes sure Tailwind sees your classes
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'light-blue': '#E0F7FF',
        'light-blue-dark': '#B3E5FF',
        'sky-blue': '#87CEFA',
        'navy-dark': '#001f3f',
        'gold': '#E9CCAB',
        'navy-glow': '#0a1f47',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      colors: {
        legalNavy: '#0B1F3A',
        royalGold: '#C9A227',
        slateGray: '#6B7280',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}