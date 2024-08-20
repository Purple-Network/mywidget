import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "widget",
    chunkSizeWarningLimit: 3000,
  },
  base: "/mywidget/",
});
