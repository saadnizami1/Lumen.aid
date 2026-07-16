import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useMotionPrefs } from '../context/MotionPrefs'
import { useSmoothScroll } from '../context/SmoothScroll'

const SECTION_LINKS = [
  ['#problem', 'The problem'],
  ['#programs', 'What we do'],
  ['#impact', 'Impact'],
]

const PAGE_LINKS = [
  ['/app', 'Our app'],
  ['/articles', 'Articles'],
  ['/team', 'Team'],
]

/**
 * Floating pill header. On the home page it stays out of the way of the
 * opening scene, fading in once the reader scrolls past it; it is only
 * *visually* hidden (index.css forces it visible on :focus-within). On other
 * pages it is always shown. On article reader pages it steps aside entirely;
 * the reader brings its own chrome. Below lg, links live in a disclosure
 * menu behind the Menu button.
 */
export default function Nav() {
  const { reduced } = useMotionPrefs()
  const { scrollTo } = useSmoothScroll()
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Set when the visitor opens the bar from the landing hero via the small
  // corner button; resets once they scroll past the hero.
  const [revealed, setRevealed] = useState(false)
  const menuButtonRef = useRef(null)
  const brandRef = useRef(null)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const past = v > window.innerHeight * 0.55
    setPastHero(past)
    if (past) setRevealed(false)
  })

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const isReader = /^\/articles\/./.test(location.pathname)
  if (isReader) return null

  const hidden = isHome && !pastHero && !reduced && !menuOpen && !revealed

  const onSection = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (isHome) scrollTo(href)
    else navigate('/', { state: { scrollTo: href } })
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
  }

  const menuItem =
    'block rounded-xl px-4 py-3 text-base text-cream/85 hover:bg-white/10 hover:text-cream'

  return (
    <>
      {/* Landing hero keeps the bar out of the story's way; this small
          corner button brings it up without scrolling. Unmounts once the
          bar is visible (focus moves to the wordmark inside the bar). */}
      {hidden && (
        <button
          type="button"
          onClick={() => {
            setRevealed(true)
            requestAnimationFrame(() => brandRef.current?.focus())
          }}
          aria-label="Show menu"
          aria-expanded="false"
          className="fixed right-4 top-4 z-[69] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-night/85 text-cream shadow-xl backdrop-blur transition-colors hover:bg-night"
        >
          <span aria-hidden="true">☰</span>
        </button>
      )}
    <header
      data-hidden={hidden ? 'true' : 'false'}
      className="site-nav fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4"
      onKeyDown={onKeyDown}
    >
      <div className="relative w-full max-w-5xl">
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-night/85 px-4 py-2.5 text-cream shadow-xl backdrop-blur sm:px-5"
        >
          <Link
            ref={brandRef}
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault()
                setMenuOpen(false)
                scrollTo('#top')
              }
            }}
            className="text-lg font-bold tracking-tight"
            aria-label="Lumen.aid, back to the start"
          >
            Lumen<span className="text-poppy">.</span>aid
          </Link>

          <div className="hidden items-center gap-5 text-sm lg:flex">
            {SECTION_LINKS.map(([href, label]) => (
              <a
                key={href}
                href={`/${href}`}
                onClick={(e) => onSection(e, href)}
                className="link-underline opacity-75"
              >
                {label}
              </a>
            ))}
            {PAGE_LINKS.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                aria-current={location.pathname === to ? 'page' : undefined}
                className={`link-underline ${location.pathname === to ? 'opacity-100' : 'opacity-75'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/#help"
              onClick={(e) => onSection(e, '#help')}
              className="pill bg-poppy px-4 text-white hover:bg-cream hover:text-night sm:px-5"
            >
              Donate
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="pill border border-white/20 px-3 text-cream/85 hover:border-white/40 hover:text-cream lg:hidden"
            >
              <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-white/10 bg-night/95 p-3 shadow-xl backdrop-blur lg:hidden"
        >
          <nav aria-label="Menu" className="flex flex-col">
            {SECTION_LINKS.map(([href, label]) => (
              <a key={href} href={`/${href}`} onClick={(e) => onSection(e, href)} className={menuItem}>
                {label}
              </a>
            ))}
            {PAGE_LINKS.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                aria-current={location.pathname === to ? 'page' : undefined}
                className={menuItem}
              >
                {label}
              </Link>
            ))}
            <a href="/#help" onClick={(e) => onSection(e, '#help')} className={`${menuItem} text-poppy`}>
              How to help / Donate
            </a>
          </nav>
        </div>
      </div>
    </header>
    </>
  )
}
