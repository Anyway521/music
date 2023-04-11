import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/css/index.scss" as *;`
      }
    },
  },
  server: {
    proxy: {
      '/personalized': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/personalized/, ''),
      },
      '/toplist': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/toplist/, ''),
      },
      '/playlist': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/playlist/, ''),
      },
      '/song': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/song/, ''),
      },
      '/top': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/top/, ''),
      },
      '/search': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/search/, ''),
      },
      '/cloudsearch': {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloudsearch/, ''),
      },
    }
  }
})
