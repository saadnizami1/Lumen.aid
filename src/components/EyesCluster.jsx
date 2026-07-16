import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Eye from './Eye'
import useMediaQuery from '../hooks/useMediaQuery'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * Scattered cluster of brand eyes. On fine-pointer devices (and only with
 * motion enabled) the pupils follow the cursor and the eyes blink now and
 * then; otherwise the cluster is a static illustration. Always aria-hidden.
 */

const EYES = [
  { iris: '#C63D3D', w: '34%', x: '2%', y: '16%', r: -8 },
  { iris: '#3E6FB3', w: '46%', x: '34%', y: '0%', r: 5 },
  { iris: '#35B48C', w: '26%', x: '70%', y: '38%', r: -14 },
  { iris: '#6B4A32', w: '38%', x: '28%', y: '48%', r: 9 },
  { iris: '#C63D3D', w: '22%', x: '4%', y: '60%', r: 16 },
]

export default function EyesCluster({ eyes = EYES, className = 'aspect-[4/3]' }) {
  const { reduced } = useMotionPrefs()
  const finePointer = useMediaQuery('(pointer: fine)')
  const tracking = finePointer && !reduced

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 16 })
  const smy = useSpring(my, { stiffness: 60, damping: 16 })

  useEffect(() => {
    if (!tracking) return undefined
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [tracking, mx, my])

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      {eyes.map((eye, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: eye.x, top: eye.y, width: eye.w, rotate: eye.r }}
          animate={reduced ? undefined : { scaleY: [1, 1, 0.06, 1] }}
          transition={{
            duration: 4.5 + i * 1.2,
            times: [0, 0.93, 0.965, 1],
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          <Eye iris={eye.iris} mx={smx} my={smy} className="h-auto w-full" />
        </motion.div>
      ))}
    </div>
  )
}
