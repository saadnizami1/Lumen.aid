import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import EyesCluster from '../components/EyesCluster'
import { useMotionPrefs } from '../context/MotionPrefs'

const EASE = [0.22, 1, 0.36, 1]

// The headline is the org's own line from Instagram. Each word tilts a
// little, like the hand-lettered posts. The h1 keeps natural word order in
// real text nodes, so screen readers hear one normal sentence.
const WORDS = ['Not', 'everyone', 'experiences', 'light', 'the', 'same', 'way.']
const TILTS = [-2.5, 1.5, -1, 2, -1.5, 1, -2]

export default function Hero() {
  const { reduced, setOverride } = useMotionPrefs()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={ref}
      id="top"
      tabIndex={-1}
      aria-label="Lumen.aid introduction"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-teal px-5 pb-10 pt-28 text-white md:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_110%,rgba(0,0,0,0.22),transparent_65%)]"
      />

      <motion.div
        className="relative grid flex-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr]"
        style={reduced ? undefined : { opacity: fade }}
      >
        <div>
          <motion.p
            className="kicker text-cream"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Lumen.aid · Lahore, Pakistan · Est. 2024
          </motion.p>

          <h1 className="mt-8 max-w-[16ch] font-marker text-[clamp(2.1rem,6.5vw,5.2rem)] uppercase leading-[1.15]">
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                className="relative mr-[0.35em] inline-block"
                style={{ rotate: TILTS[i] }}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.09 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md font-display text-xl leading-snug text-cream md:text-2xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          >
            Empowering visually impaired communities in Pakistan.
          </motion.p>
        </div>

        <motion.div
          aria-hidden="true"
          className="mx-auto w-full max-w-xs md:max-w-sm"
          style={reduced ? undefined : { y: drift }}
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        >
          <EyesCluster />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex flex-wrap items-end justify-between gap-6"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-sm text-cream/90">A youth led initiative for the blind community</p>

        {/* The site-wide motion switch lives here on the landing page; the OS
            prefers-reduced-motion setting is honoured everywhere regardless. */}
        <button
          type="button"
          aria-pressed={reduced}
          onClick={() => setOverride(reduced ? 'full' : 'reduced')}
          title="Turns page animations off or on"
          className={`pill border text-xs ${
            reduced
              ? 'border-white bg-white/20 text-white'
              : 'border-white/40 text-white/90 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span aria-hidden="true" className="mr-1.5">
            {reduced ? '◼' : '◍'}
          </span>
          Reduce motion
        </button>
      </motion.div>
    </section>
  )
}
