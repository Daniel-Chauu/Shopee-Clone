/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ee4d2d",
      },
      backgroundColor: {
        grayF5: "#f5f5f5",
      },
      backgroundImage: {
        gradientHeader: "linear-gradient(-180deg, #f53d3d, #f63)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
