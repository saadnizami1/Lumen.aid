import { useEffect } from 'react'
import { SITE_NAME, SITE_URL } from '../site'

/**
 * Per-page description, canonical URL and Open Graph tags.
 *
 * The site is client rendered, so index.html carries the site-wide defaults
 * for crawlers that do not run JavaScript; this hook upgrades them to the
 * real page values for everything that does (Google, and link unfurlers that
 * render the page). Call it once near the top of a page component.
 */

/* Owner copy rule (DEVELOPMENT.md): the browser tab reads just "Lumen.aid"
   on every page. The page name still goes into og:title, so a shared link
   says which page it is. Flip this to true for "Page | Lumen.aid" tab
   titles, which search results tend to show more usefully. */
const PER_PAGE_TAB_TITLES = false

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** `path` is the route this page lives at, e.g. '/articles/glaucoma'. */
export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const url = `${SITE_URL}${path === '/' ? '/' : path}`

    document.title = PER_PAGE_TAB_TITLES ? full : SITE_NAME
    setCanonical(url)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:title', title ? full : `${SITE_NAME} | Not everyone experiences light the same way`)
    setMeta('name', 'description', description)
    setMeta('property', 'og:description', description)
  }, [title, description, path])
}
