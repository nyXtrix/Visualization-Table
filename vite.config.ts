import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import taiwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),taiwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});