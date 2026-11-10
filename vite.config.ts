import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
	  devOptions: {
		enabled: true,
	  },
      includeAssets: ['favicon.svg', 'icons'],
      manifest: {
        name: 'JapApp - Apprentissage du japonais',
        short_name: 'JapApp',
        description: 'Application d\'apprentissage du japonais, mobile-first, ludique et hors ligne.',
        theme_color: '#4a90d9',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,txt,woff2}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.json$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'json-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  base: process.env.NODE_ENV === 'production' ? '/japapp/' : '/',
  server: {
    host: '0.0.0.0', // Accessible depuis le réseau local (téléphone, autre PC)
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
} as any)
