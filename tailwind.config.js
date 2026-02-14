/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: { 500: '#10b981', 600: '#059669' }, // Das Mittagio-Grün
        yellow: { 400: '#FACC15', 500: '#EAB308' }, // Das Signal-Gelb
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Tiefer Glas-Schatten
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
      },
      backdropBlur: {
        '3xl': '64px', // Extrem starker Blur für den Hintergrund
      },
      borderRadius: {
        '4xl': '3rem', // Die riesigen, weichen Ecken
      },
    },
  },
  plugins: [],
};
