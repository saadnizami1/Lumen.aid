import Lenis from 'lenis'
import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useMotionPrefs } from './MotionPrefs'

/**
 * Lenis gives the page its weighty, eased scroll feel. It only remaps
 * wheel/touch input — keyboard scrolling (space, arrows, PgDn) stays native,
 * so it never traps keyboard users. It is not created at all when reduced
 * motion is on.
 */

const SmoothScrollContext = createContext({ scrollTo: () => {} })

export function SmoothScrollProvider({ children }) {
  const { reduced } = useMotionPrefs()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (reduced) return undefined
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const value = useMemo(
    () => ({
      scrollTo(target) {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        if (!el) return
        if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.2 })
        else el.scrollIntoView()
        // Move screen reader / keyboard context along with the visual jump.
        el.focus({ preventScroll: true })
      },
      jumpTop() {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
      },
    }),
    [],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}
