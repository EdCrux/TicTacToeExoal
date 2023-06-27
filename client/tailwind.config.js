/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'mono' : ['Silkscreen']
    },
    gridTemplateColumns :{
      '4': 'repeat(4, 1fr)',
    },
    gridTemplateRows : {
      '4': 'repeat(4, 1fr)'
    },
    extend: {},
  },
  plugins: [],
}

