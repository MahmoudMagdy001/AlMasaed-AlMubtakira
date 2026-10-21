import path from 'node:path'
import { defineConfig } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import react from '@vitejs/plugin-react'

import { getDynamicRoutes } from './scripts/get-dynamic-routes.mjs'

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
            if (
              id.includes('react/') ||
              id.includes('react-dom/') ||
              id.includes('react-router-dom/') ||
              id.includes('react-router/') ||
              id.includes('@remix-run') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-react'
            }
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
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter(
          (dep) =>
            !dep.includes('tiptap') &&
            !dep.includes('PostEditPage') &&
            !dep.includes('Admin') &&
            !dep.includes('prosemirror') &&
            !dep.includes('lowlight'),
        )
      },
    },
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    formatting: 'none',
    async includedRoutes(paths: string[]) {
      const staticRoutes = paths.filter((p: string) => {
        const clean = p.startsWith('/') ? p : `/${p}`
        return (
          !clean.startsWith('/admin') &&
          !p.startsWith('/admin') &&
          !clean.includes(':')
        )
      })
      const dynamicRoutes = await getDynamicRoutes()
      return Array.from(new Set([...staticRoutes, ...dynamicRoutes]))
    },
    async onFinished() {
      const { execSync } = await import('node:child_process')
      try {
        execSync('node scripts/generate-sitemap.mjs', { stdio: 'inherit' })
      } catch (err) {
        console.warn('Post-build sitemap generation error:', err)
      }
    },
  },
})
