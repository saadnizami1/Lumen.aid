import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Single source of truth for motion preferences.
 *
 * `reduced` is true when either:
 *  - the OS-level `prefers-reduced-motion: reduce` setting is on, or
 *  - the visitor used the visible "Reduce motion" toggle in the nav
 *    (persisted to localStorage, and it can also re-enable motion for
 *    someone whose OS setting is on but who wants the full experience).
 *
 * Every scroll-driven scene in the site checks this flag and renders a
 * static, stacked equivalent instead of the animated one.
 */

const STORAGE_KEY = 'lumenaid:motion'

const MotionPrefsContext = createContext({
  reduced: false,
  override: null,
  setOverride: () => {},
})

function readStoredOverride() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'reduced' || v === 'full' ? v : null
  } catch {
    return null
  }
}

export function MotionPrefsProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [override, setOverride] = useState(readStoredOverride)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setSystemReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    try {
      if (override) window.localStorage.setItem(STORAGE_KEY, override)
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Private browsing modes may block storage; the toggle still works for the session.
    }
  }, [override])

  const reduced = override ? override === 'reduced' : systemReduced
  const value = useMemo(() => ({ reduced, override, setOverride }), [reduced, override])

  return <MotionPrefsContext.Provider value={value}>{children}</MotionPrefsContext.Provider>
}

export function useMotionPrefs() {
  return useContext(MotionPrefsContext)
}
