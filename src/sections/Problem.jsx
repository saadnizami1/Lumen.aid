import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * "The problem" — a pinned scene. The section is 4 viewports tall; a sticky
 * full-screen stage crossfades one statement at a time as the reader scrolls.
 *
 * ACCESSIBILITY NOTE — animated variant vs. accessible equivalent:
 * The pinned scene is purely scroll-position-driven (no wheel hijacking, so
 * keyboard Space/PgDn still works), but crossfading absolutely-positioned
 * panels are a poor experience for screen readers and for anyone with
 * vestibular sensitivity. Under `prefers-reduced-motion` (or the nav toggle)
 * and on small screens, the SAME content renders as a plain stacked column —
 * see <StackedPanels/> below. DOM order always matches reading order.
 */

const PANELS = [
  {
    figure: '1.8M',
    text: 'An estimated 1.8 million people in Pakistan are blind.',
  },
  {
    figure: '20M',
    text: 'Around 20 million live with some form of visual impairment.',
  },
  {
    figure: '3/4',
    text: 'Around three quarters of it is preventable or treatable.',
  },
  {
    figure: 'ACCESS',
    text: 'Most of the barrier isn’t medical. It’s access: tools, schools, streets, work. That’s where we focus.',
  },
]

function StickyPanel({ progress, index, count, panel }) {
  const seg = 1 / count
  const start = index * seg
  const end = start + seg
  const fadePad = seg * 0.22

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, 0.0001, end - fadePad, end]
      : index === count - 1
        ? [start, start + fadePad, 0.9999, 1]
        : [start, start + fadePad, end - fadePad, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, index === count - 1 ? 1 : 0],
  )
  const y = useTransform(progress, [start, end], [36, -36])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center px-5 md:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap font-marker text-[clamp(6rem,24vw,22rem)] leading-none text-cream/[0.05]">
          {panel.figure}
        </span>
      </div>
      <motion.div style={{ y }} className="relative max-w-3xl text-center">
        <p className="font-display text-[clamp(1.6rem,3.6vw,3.1rem)] font-medium leading-tight tracking-tight text-cream">
          {panel.text}
        </p>
      </motion.div>
    </motion.div>
  )
}

/** Accessible / mobile equivalent: same content, plain vertical flow. */
function StackedPanels({ animate }) {
  return (
    <div className="flex flex-col">
      {PANELS.map((panel, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, y: 28 } : false}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[60svh] flex-col justify-center border-t border-white/5 py-16 first:border-t-0"
        >
          <p
            aria-hidden="true"
            className="select-none font-marker text-[clamp(3rem,15vw,6.5rem)] leading-none text-cream/10"
          >
            {panel.figure}
          </p>
          <p className="mt-6 max-w-xl font-display text-[clamp(1.4rem,5.5vw,2.1rem)] font-medium leading-tight tracking-tight text-cream">
            {panel.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Problem() {
  const { reduced } = useMotionPrefs()
  const desktop = useMediaQuery('(min-width: 768px)')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const pinned = desktop && !reduced

  return (
    <section
      ref={ref}
      id="problem"
      tabIndex={-1}
      aria-labelledby="problem-title"
      className="relative bg-night"
    >
      {pinned ? (
        <div style={{ height: `${PANELS.length * 100}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
            <div className="px-5 pt-24 md:px-10">
              <p className="kicker text-mint">The problem</p>
              <h2 id="problem-title" className="sr-only">
                The problem
              </h2>
            </div>
            <div className="relative flex-1">
              {PANELS.map((panel, i) => (
                <StickyPanel
                  key={i}
                  progress={scrollYProgress}
                  index={i}
                  count={PANELS.length}
                  panel={panel}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-24 md:px-10">
          <p className="kicker text-mint">The problem</p>
          <h2 id="problem-title" className="sr-only">
            The problem
          </h2>
          <StackedPanels animate={!reduced} />
        </div>
      )}
    </section>
  )
}
