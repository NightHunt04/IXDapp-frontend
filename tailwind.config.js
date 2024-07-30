/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'istok-web': ['Istok Web', 'sans-serif']
      },
      colors: {
        'dark-01': '#0A0A0A',
        'gray-01': '#949494',
        'gray-02': '#1D1D1D',
      }
    },
  },
  plugins: [],
}

