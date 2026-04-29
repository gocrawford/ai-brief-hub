import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site under /ai-brief-hub/
// In dev, base is '/' for fast local development.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/ai-brief-hub/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
