/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#C9A84C", light: "#E8C97A", dark: "#A07830" },
        dark: { DEFAULT: "#0A0A0A", surface: "#111111", muted: "#1E1E1E", border: "#2A2A2A" },
      },
    },
  },
  plugins: [],
};
