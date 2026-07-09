/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#153349',
        navy2: '#1E4560',
        sea: '#2E86AB',
        sun: '#E8A33D',
        cream: '#FBF6EC',
        cream2: '#F3EBD8',
      },
      fontFamily: {
        display: ['Baloo 2', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
