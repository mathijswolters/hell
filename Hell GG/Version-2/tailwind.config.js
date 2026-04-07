/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Rubik_One: ['Rubik One', 'sans-serif'],
        Rubik: ['Rubik', 'sans-serif']
      },
      screens: {
        '3xl': '1770px'
      }
    }
  },
  plugins: []
}
