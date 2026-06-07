import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#C9A84C", light: "#E8C97A", dark: "#A07830" },
        dark: { DEFAULT: "#0A0A0A", surface: "#111111", muted: "#1E1E1E", border: "#2A2A2A" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
