import { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { MotionPrefsProvider, useMotionPrefs } from './context/MotionPrefs'
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScroll'
import SkipLink from './components/SkipLink'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Footer from './sections/Footer'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Team from './pages/Team'
import OurApp from './pages/OurApp'

/** On route change: jump to the top instantly and move focus to main so
    screen reader / keyboard context lands on the new page. */
function RouteReset() {
  const { pathname, state } = useLocation()
  const { jumpTop } = useSmoothScroll()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    jumpTop()
    if (!state?.scrollTo) {
      document.getElementById('main')?.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}

function Site() {
  const { reduced } = useMotionPrefs()

  return (
    // reducedMotion="always" makes framer-motion skip transform/layout
    // animations globally; individual scenes additionally swap to their
    // static equivalents via useMotionPrefs().
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <SmoothScrollProvider>
        <BrowserRouter>
          <RouteReset />
          <SkipLink />
          <Nav />
          <Cursor />
          <ScrollProgress />
          <main id="main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<Article />} />
              <Route path="/team" element={<Team />} />
              <Route path="/app" element={<OurApp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <div className="grain" aria-hidden="true" />
        </BrowserRouter>
      </SmoothScrollProvider>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <MotionPrefsProvider>
      <Site />
    </MotionPrefsProvider>
  )
}
