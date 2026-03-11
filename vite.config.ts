import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: {
          "three-core": ["three"],
          "three-extras": ["@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          "physics": ["@react-three/rapier"],
          "gsap": ["gsap"],
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    host: true,
  },
});
