/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
      },
    },
    colors: {
      yellow: "#FFF3B2",
      "light-pink": "#FFE0D8",
      pink: "#FF9B93",
      green: "#41584B",
      white: "#FFFFFF",
      black: "#000000",
      "dark-pink": "#FF5562",
      red: "#ff0000",
      grey: "#BEBEBE",
    },
  },
  plugins: [],
};
