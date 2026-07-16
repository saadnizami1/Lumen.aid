import { motion } from 'framer-motion'
import RevealText from '../components/RevealText'
import { useMotionPrefs } from '../context/MotionPrefs'

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.saadnizami.offlinedekho&hl=en'

/**
 * Samsung-style phone rendering the app's real home screen (recreated from
 * an actual screenshot): blue gradient, frosted card with the Urdu wake
 * phrase, START ANALYZING button. Exposed to screen readers as one image
 * with a description; every visual detail inside is presentational.
 */
function PhoneMockup() {
  const { reduced } = useMotionPrefs()

  return (
    <motion.div
      role="img"
      aria-label="The Offline Dekho app running on a Samsung phone. The screen says: to start, say idhar udhar dekhna. Below it is a start analyzing button, and a note that you can say any command to analyze."
      className="relative mx-auto w-full max-w-[270px]"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <div
        className="absolute -inset-12 rounded-full bg-[radial-gradient(closest-side,rgba(78,151,219,0.4),transparent_70%)] blur-2xl"
      />

      <motion.div
        className="relative md:-rotate-2"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Device body */}
        <div className="relative rounded-[2.7rem] bg-gradient-to-b from-[#23262b] to-[#101215] p-[9px] shadow-2xl ring-1 ring-white/20">
          {/* Side buttons */}
          <div className="absolute -right-[3px] top-24 h-14 w-[3px] rounded-r-md bg-[#2e3238]" />
          <div className="absolute -right-[3px] top-40 h-9 w-[3px] rounded-r-md bg-[#2e3238]" />

          {/* Screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.15rem] bg-gradient-to-b from-[#54A0E0] via-[#3F80C6] to-[#33639F]">
            {/* Punch-hole camera */}
            <div className="absolute left-1/2 top-2.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_2px_rgba(255,255,255,0.4)]" />

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 pt-2 text-[8px] font-semibold text-white/90">
              <span>13:26</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 10 8" className="h-[7px] w-[9px]" fill="currentColor">
                  <path d="M0 8h2V5H0zm3 0h2V3H3zm3 0h2V1.5H6zm3 0h1V0H9z" />
                </svg>
                <svg viewBox="0 0 12 8" className="h-[7px] w-[10px]" fill="currentColor">
                  <path d="M6 8 0 2.2A8.6 8.6 0 0 1 6 0a8.6 8.6 0 0 1 6 2.2z" />
                </svg>
                <span className="relative inline-flex h-[8px] w-[14px] items-center rounded-[2px] border border-white/80 px-[1px]">
                  <span className="h-[4px] w-1/2 rounded-[1px] bg-white/90" />
                </span>
              </span>
            </div>

            {/* App header */}
            <div className="mt-4 flex items-start justify-between px-4">
              <div>
                <p className="font-display text-xl font-bold leading-none text-white">Dekho</p>
                <p className="mt-1.5 text-[6.5px] uppercase tracking-[0.16em] text-white/80">
                  Offline · A project by Lumen.aid
                </p>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 backdrop-blur">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="currentColor">
                  <circle cx="8" cy="5.5" r="2.6" />
                  <path d="M2.8 13.5a5.2 5.2 0 0 1 10.4 0z" />
                </svg>
              </span>
            </div>

            {/* Frosted command card */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/25 bg-white/10 px-4 pb-5 pt-6 text-center shadow-lg backdrop-blur-md">
              <p className="text-[9.5px] text-white/85">to start say</p>
              <p dir="rtl" lang="ur" className="mt-2.5 text-2xl font-bold leading-snug text-white">
                ادھر اُدھر دیکھنا
              </p>
              <div className="mt-6 rounded-lg border border-white/30 bg-white/20 py-2.5 text-[9px] font-semibold tracking-[0.22em] text-white">
                START ANALYZING
              </div>
            </div>

            {/* Listening hint */}
            <div className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-1.5 text-[8.5px] text-white/85">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#4ade80]"
                animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              Say any command to analyze
            </div>

            {/* Gesture handle */}
            <div className="absolute bottom-2 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-white/50" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Say the phrase',
    body: 'Say "idhar udhar dekhna" and the app starts analyzing. Everything works by voice, so there are no buttons to hunt for.',
  },
  {
    num: '02',
    title: 'It looks',
    body: 'A computer vision model running entirely on your phone recognises the scene and the objects in view. Nothing is uploaded anywhere; the camera never needs a connection.',
  },
  {
    num: '03',
    title: 'It speaks',
    body: 'The app describes what it sees in clear spoken words, so your ears can do the looking.',
  },
]

export default function OurApp() {
  const { reduced } = useMotionPrefs()

  return (
    <div className="min-h-svh bg-night px-5 pb-24 pt-28 text-cream md:px-10 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="kicker text-mint">Our app · Free on Android</p>
            <RevealText
              as="h1"
              text="Offline Dekho"
              className="mt-4 font-marker text-[clamp(2.4rem,7vw,5rem)] uppercase leading-[1.1]"
            />
            <p className="mt-6 max-w-md font-display text-xl leading-snug text-cream md:text-2xl">
              A pair of eyes in your pocket.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash md:text-lg">
              Offline Dekho is our free Android app for people who are permanently blind. Point
              your phone at the world and it tells you, out loud, what is in front of you. No
              internet needed, ever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill bg-cream text-night hover:bg-mint hover:text-night"
              >
                Get it on Google Play
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="text-sm text-ash">Free · Android · Works with no signal</p>
            </div>
          </div>

          <PhoneMockup />
        </div>

        <div className="mt-24 max-w-2xl">
          <h2 className="font-marker text-2xl uppercase md:text-3xl">Why we built it</h2>
          <p className="mt-5 text-base leading-relaxed text-ash md:text-lg">
            For most of the 1.8 million blind people in Pakistan, sight is not coming back.
            What can change is how much of the world they can navigate on their own. Offline
            Dekho is built for exactly that: everyday independence, one spoken description at
            a time.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="font-marker text-2xl uppercase md:text-3xl">
            How the computer vision works
          </h2>
          <ol className="mt-10 grid list-none gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                className="border-t-2 border-white/15 pt-6"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p aria-hidden="true" className="font-marker text-lg text-mint">
                  {step.num}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ash">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-20 max-w-2xl">
          <h2 className="font-marker text-2xl uppercase md:text-3xl">Why offline matters</h2>
          <p className="mt-5 text-base leading-relaxed text-ash md:text-lg">
            Most vision apps need a fast internet connection, which makes them useless in half
            the places daily life actually happens in Pakistan. Offline Dekho runs its computer
            vision on the device itself: it works in a bazaar with no signal, costs nothing in
            data, and every image stays on your phone. Private by design.
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mt-8 bg-poppy text-white hover:bg-cream hover:text-night"
          >
            Download Offline Dekho
            <span className="sr-only"> (opens Google Play in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
