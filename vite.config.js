import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ARTICLES } from './src/content/articles.js'
import { SITE_URL } from './src/site.js'

/** Writes sitemap.xml at build time so new articles never need a manual edit. */
function sitemap() {
  return {
    name: 'lumenaid-sitemap',
    apply: 'build',
    generateBundle() {
      const paths = [
        '/',
        '/app',
        '/articles',
        ...ARTICLES.map((a) => `/articles/${a.slug}`),
        '/team',
      ]
      const urls = paths
        .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`)
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemap()],
})
