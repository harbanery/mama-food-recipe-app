/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cereal: ["Airbnb Cereal App"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        "recipe-dark": "#3F3A3A",
        "recipe-slate": "#707070",
        "recipe-gray": "#B6B6B6",
        "recipe-lightgray": "#EFEFEF",
        "recipe-ice": "#F6F5F4",
        "recipe-corral": "#666666",
        "recipe-obsidian": "#999999",
        "recipe-yellow": {
          light: "#FFF5EC",
          normal: "#EFC81A",
          dark: "#6F6A40",
        },
        "recipe-blue": "#2E266F",
      },
      animation: {
        l5: "l5 1s infinite linear",
      },
      keyframes: {
        l5: {
          "100%": {
            backgroundPosition: "right -40px top 0, center",
          },
        },
      },
      backgroundImage: {
        "loader-gradient":
          "linear-gradient(#25b09b 0 0) left -40px top 0/40px 20px, linear-gradient(#ddd 0 0) center/100% 50%",
      },
    },
  },
  plugins: [],
};
