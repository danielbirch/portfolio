/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Pacaembu, sans-serif'],
      'body': ['Mulish, sans-serif'],
    },
    screens: {
      'sm': '640px',
      'md': '1024px',
      'lg': '1200px',
      'xl': '1440px',
    },
  },
  plugins: [],
}