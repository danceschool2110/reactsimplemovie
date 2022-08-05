/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body": ["DM Sans", "Sans-serif"]
      },
      colors:{
        primary: "#F62682",
        secondary: "#6f5cf1"
      }
    },
  },
  plugins: [],
}