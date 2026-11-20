import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Fixed port so it always matches CORS_ORIGINS on Render (Vite stops instead of silently switching ports).
  server: { port: 5174, strictPort: true, proxy: { "/api": { target: "http://127.0.0.1:5000", changeOrigin: true } } },
  test: { globals: true, environment: "jsdom", setupFiles: "./src/test/setup.js", css: true },
});
