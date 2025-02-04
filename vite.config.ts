import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Frontend na porta 5173
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend na porta 3000
        changeOrigin: true,
        secure: false
      }
    }
  }
})
