/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        "bgcolor" : "#e5e4df",
        "boxcolor": "#272725",
        "btncolor" : "#f2bd53",
        'spotify-green': '#1DB954',
        'spotify-green-hover': '#1ed760',
        'spotify-dark-gray': "#282828",
      }
    },
  },
  plugins: [],
}