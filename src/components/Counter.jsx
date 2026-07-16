import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * Count-up number. The animating copy is aria-hidden (screen readers should
 * never hear a stream of intermediate values); the final figure is exposed
 * once via sr-only text. Reduced motion renders the final value immediately.
 */
export default function Counter({ value, prefix = '', suffix = '', duration = 1.8, className = '' }) {
  const { reduced } = useMotionPrefs()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return undefined
    }
    if (!inView) return undefined
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  const format = (n) => `${prefix}${n.toLocaleString('en-US')}${suffix}`

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(display)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}
