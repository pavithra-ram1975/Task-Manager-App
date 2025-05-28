
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#2B85FF",
        secondary:"#EF863E",
      },
    },
  },
  plugins: [],
};