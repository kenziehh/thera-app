/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: {
          default: "#ffffff",
          50: "#fefeff",
          75: "#fcfcff",
          100: "#fbfbff",
          200: "#f9f9ff",
          300: "#f8f8ff",
          400: "#aeaeb3", 
          500: "#97979c",
        },
        black: {
          500: "#1b1b18",
        },
        blue: {
          50: "#eaf0ff",
          75: "#a9c2ff",
          100: "#858fff",
          200: "#5183ff",
          300: "#2d69ff",
          400: "#1f4ab3",
          500: "#1b409c",
        },
      },
    },
  },
  plugins: [],
};
