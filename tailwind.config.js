/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: { 500: '#10b981', 600: '#059669' },
        yellow: { 400: '#FACC15', 500: '#EAB308' },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
      },
      backdropBlur: {
        '3xl': '64px',
      },
      borderRadius: {
        '4xl': '3rem',
      },
    },
  },
  plugins: [],
};
