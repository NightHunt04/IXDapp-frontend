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
      },
      animation: {
        'like': 'like 0.7s ease-in-out'
      },
      keyframes: {
        like: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '40%': {
            transform: 'scale(6.2)',
            opacity: '1'
          },
          '60%': {
            transform: 'scale(5.5)',
            opacity: '1'
          },
          '80%': {
            transform: 'scale(6.2)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '0'
          }
        }
      }
    },
  },
  plugins: [],
}

