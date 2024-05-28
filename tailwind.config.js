/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "recipe-black": "#000000",
      "recipe-dark": "#3F3A3A",
      "recipe-slate": "#707070",
      "recipe-gray": "#B6B6B6",
      "recipe-lightgray": "#EFEFEF",
      "recipe-white": "#FFFFFF",
      "recipe-yellow": {
        normal: "#EFC81A",
        dark: "#6F6A40",
      },
      "recipe-blue": "#2E266F",
    },
  },
  plugins: [],
};
