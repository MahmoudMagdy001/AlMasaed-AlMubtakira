import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import react from '@vitejs/plugin-react'

import { getDynamicRoutes } from './scripts/get-dynamic-routes.mjs'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: ViteReactSSGOptions
  }
}

// Injects <link rel="preload"> for Tajawal Arabic 400 + 700 into every built HTML page.
// Font filenames are content-hashed, so we find them dynamically.
function injectFontPreloads(distDir: string) {
  if (!fs.existsSync(distDir)) return

  const assetsDir = path.join(distDir, 'assets')
  if (!fs.existsSync(assetsDir)) return

  const assetFiles = fs.readdirSync(assetsDir)
  const font400 = assetFiles.find(
    (f) => f.includes('tajawal-arabic-400') && f.endsWith('.woff2'),
  )
  const font700 = assetFiles.find(
    (f) => f.includes('tajawal-arabic-700') && f.endsWith('.woff2'),
  )

  const fonts = [font400, font700].filter(Boolean) as string[]
  if (fonts.length === 0) return

  const preloadTags = fonts
    .map(
      (f) =>
        `<link rel="preload" as="font" type="font/woff2" crossorigin="" href="/assets/${f}">`,
    )
    .join('')

  const htmlFiles: string[] = []
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) htmlFiles.push(full)
    }
  }
  walk(distDir)

  let injectedCount = 0
  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8')
    if (html.includes('rel="preload" as="font"')) continue
    if (html.includes('<meta charset="UTF-8">')) {
      html = html.replace(
        '<meta charset="UTF-8">',
        `${preloadTags}<meta charset="UTF-8">`,
      )
    } else {
      html = html.replace('</head>', `${preloadTags}</head>`)
    }
    fs.writeFileSync(file, html)
    injectedCount++
  }
  console.log(
    `[font-preload] Injected preload tags for ${fonts.length} Tajawal fonts into ${injectedCount} HTML files.`,
  )
}

function autoSitemapPlugin(): Plugin {
  return {
    name: 'auto-sitemap-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, _res, next) => {
        if (req.url === '/sitemap.xml' || req.url === '/sitemap.xml/') {
          try {
            const { execSync } = await import('node:child_process')
            execSync('node scripts/generate-sitemap.mjs', { stdio: 'pipe' })
          } catch (err) {
            console.warn('[auto-sitemap-plugin] Error updating sitemap in dev:', err)
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), autoSitemapPlugin()],
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
      // 1. Inject Tajawal font preloading tags across all prerendered HTML files
      const distDir = path.resolve(__dirname, 'dist')
      injectFontPreloads(distDir)

      // 2. Generate sitemap, robots, and merge redirects
      const { execSync } = await import('node:child_process')
      try {
        execSync('node scripts/generate-sitemap.mjs', { stdio: 'inherit' })
      } catch (err) {
        console.warn('Post-build sitemap generation error:', err)
      }
    },
  },
})
