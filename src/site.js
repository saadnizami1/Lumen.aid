/**
 * The production origin. Used for canonical URLs, Open Graph tags and the
 * generated sitemap (vite.config.js reads it too), so the domain lives in
 * exactly one place. No React imports here — the build config imports this
 * file directly in Node.
 */
export const SITE_URL = 'https://lumenaid.help'
export const SITE_NAME = 'Lumen.aid'
