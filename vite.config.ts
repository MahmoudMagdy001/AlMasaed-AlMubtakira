import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'vendor-supabase'
            if (id.includes('@tanstack/react-query')) return 'vendor-query'
            if (id.includes('lucide-react')) return 'vendor-icons'
          }
        },
      },
    },
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    formatting: 'none',
    includedRoutes(paths) {
      return paths.filter((p) => {
        const clean = p.startsWith('/') ? p : `/${p}`
        return !clean.startsWith('/admin') && !p.startsWith('/admin')
      })
    },

  },
})
