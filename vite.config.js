import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/, // Incluye archivos .js y .jsx
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
