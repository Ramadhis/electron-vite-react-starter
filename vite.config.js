import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import tailwindcss from "@tailwindcss/vite";
import path from "path-browserify";

config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    rollupOptions: {
      external: ["better-sqlite3"],
    },
  },
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  server: {
    hmr: false,
  },
});
