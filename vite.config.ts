import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev6.dansmultipro.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
