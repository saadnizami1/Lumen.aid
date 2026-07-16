import { motion, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/** Thin reading-progress rail on the right edge. Decorative only. The
    article reader has its own progress bar, so the rail steps aside there. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const { pathname } = useLocation()

  if (/^\/articles\/./.test(pathname)) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-[80] hidden h-full w-[3px] bg-white/15 mix-blend-difference md:block"
    >
      <motion.div className="h-full w-full origin-top bg-white" style={{ scaleY }} />
    </div>
  )
}
