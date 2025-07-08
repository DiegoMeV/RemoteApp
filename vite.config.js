import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  server: {
    port: 3001,
    open: true,
  },
  plugins: [
    react(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Roles': './src/pages/administration/roles/Roles.jsx',
        './AplicationsRoutes': './src/containers/routes/applications/ApplicationsRoutes.jsx',
      },
      remotes: {
        'host-app': 'http://localhost:3000/assets/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'easy-peasy': {
          singleton: true,
        },
        zustand: {
          singleton: true,
        },
        '@tanstack/react-query': {
          singleton: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        tailwindcss: {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
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
