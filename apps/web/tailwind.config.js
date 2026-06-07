/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#E8C97A",
          dark:    "#A07830",
        },
        cream: {
          DEFAULT: "#FAF8F4",
          soft:    "#F5F1EB",
          border:  "#E8E0D0",
        },
        ink: {
          DEFAULT: "#1C1611",
          muted:   "#7A6F62",
          faint:   "#B0A898",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          surface: "#111111",
          muted:   "#1E1E1E",
          border:  "#2A2A2A",
        },
      },
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
