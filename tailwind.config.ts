import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  darkMode:"class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbar()],
};

export default config;