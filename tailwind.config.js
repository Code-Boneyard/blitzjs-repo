// tailwind.config.js
module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
    },
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
    },
  },
  plugins: [],
}
