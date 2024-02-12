import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/lib/index.ts",
      name: "tiny-store",
      fileName: "tiny-store",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react",
        },
      },
    },
  },
  plugins: [dts(), react()],
});
