import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.error('VITE_ADMIN_MF:', env.VITE_ADMIN_MF)

  return {
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
          '@mui/material': {
            singleton: false,
          },
          '@mui/icons-material': {
            singleton: false,
          },
          '@emotion/react': {
            singleton: false,
          },
          '@emotion/styled': {
            singleton: false,
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
  }
})
