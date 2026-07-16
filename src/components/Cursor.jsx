import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * Custom cursor: an amber dot with a trailing ring that swells over
 * interactive elements.
 *
 * Deliberate accessibility decisions:
 *  - The native OS cursor is NOT hidden. Replacing it with a laggy ring
 *    would hurt exactly the low-vision users this org serves; the ring is
 *    an augmentation, not a replacement.
 *  - Renders only on fine-pointer devices, never under reduced motion,
 *    and is aria-hidden + pointer-transparent throughout.
 */
export default function Cursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const { reduced } = useMotionPrefs()
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 35, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 35, mass: 0.6 })

  const active = finePointer && !reduced

  useEffect(() => {
    if (!active) return undefined
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      if (!(e.target instanceof Element)) return
      setHovering(Boolean(e.target.closest('a, button, [data-cursor]')))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="absolute h-9 w-9 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 2 : 1, opacity: hovering ? 0.95 : 0.65 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  )
}
