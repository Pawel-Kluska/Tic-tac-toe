import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  host: true,
  strictPort: true,
  server: {
    port: 3000,
  }
})
