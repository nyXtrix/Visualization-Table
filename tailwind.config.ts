import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbar(), animate],
};

export default config;