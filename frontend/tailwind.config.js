/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#181818",
        secondary: "#1A1A1A",
        tertiary: "#5C67DE",
      },
    },
  },
  plugins: [],
});
