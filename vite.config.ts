import path from 'node:path'
import { defineConfig } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import react from '@vitejs/plugin-react'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: ViteReactSSGOptions
  }
}

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
            if (
              id.includes('@tiptap') ||
              id.includes('prosemirror') ||
              id.includes('lowlight')
            ) {
              return 'vendor-tiptap'
            }
          }
        },
      },
    },
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    formatting: 'none',
    includedRoutes(paths: string[]) {
      return paths.filter((p: string) => {
        const clean = p.startsWith('/') ? p : `/${p}`
        return !clean.startsWith('/admin') && !p.startsWith('/admin')
      })
    },

  },
})
