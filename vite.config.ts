import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/oliver-blog/',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})