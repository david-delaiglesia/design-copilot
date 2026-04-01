import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': path.resolve(__dirname, '../ds/src/components'),
      '@ds-assets': path.resolve(__dirname, '../ds/src/assets'),
    },
  },
})
