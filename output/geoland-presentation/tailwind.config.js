/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        cormorant: ['Cormorant', 'serif'],
        monsieur: ['"Monsieur La Doulaise"', 'cursive'],
      },
      colors: {
        geoland: {
          blue: '#38bdf8', // Blue for highlighted titles
        }
      },
      fontWeight: {
        extralight: 200,
        normal: 400,
      }
    },
  },
  plugins: [],
}
