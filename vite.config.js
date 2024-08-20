import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    build: {
      outDir: "widget",
      chunkSizeWarningLimit: 3000,
    },
    base: env.VITE_BASE_PATH,
    server: {
      port: 5174,
    },
  };
});
