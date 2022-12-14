import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
 
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
     
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://smms.app",
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: "https://smms.app",
        },
      },
      
    },
  },
});
