/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#113B2F',
        navy2: '#1F5A4B',
        sea: '#3B7A66',
        sun: '#E7B64B',
        cream: '#F8F3E9',
        cream2: '#E8DDC7',
      },
      fontFamily: {
        display: ['Baloo 2', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
