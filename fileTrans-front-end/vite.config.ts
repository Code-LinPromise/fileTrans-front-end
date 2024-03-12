import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from  "tailwindcss"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:27149/',
        changeOrigin: true,
      },
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss, 
        autoprefixer,
      ]
    }
  }
})
