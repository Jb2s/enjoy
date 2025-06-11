/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Centra No2"', 'sans-serif'],
      },
      colors:{
        customBlue: '#7B2CBF',
        customBlueVariant: '#8F3BCC',
        customRed: '#FF5400',
        customNeutreColor: '#FCEFE3',
        customDark: '#171616',
        customDarkVariant1: '#3e3e3e',
        customDarkVariant2: '#737373',
        customWhite: '#fff9f9'
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

