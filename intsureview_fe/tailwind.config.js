/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#261208",
        background: "#fdf9f7",
        "primary-button": "#274a4e",
        "primary-button-hover": "#1e3b3f",
        "secondary-button": "#e1d5cf",
        "secondary-button-hover": "#cabfba",
        accent: "#0a050a",
      },
      fontFamily: {
        nunitosans: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
