import { useState } from 'react'
import { motion } from 'framer-motion'
import Counter from '../components/Counter'
import RevealText from '../components/RevealText'
import { useMotionPrefs } from '../context/MotionPrefs'

/* Update these figures as fundraisers happen; drop any stat that can't be
   backed up rather than rounding it up. */
const STATS = [
  { value: 150000, prefix: 'PKR ', suffix: '+', label: 'raised at fundraisers for the blind community', color: 'text-teal' },
  { value: 3, prefix: '', suffix: '', label: 'fundraisers & community events held', color: 'text-blue' },
  { value: 5, prefix: '', suffix: '', label: 'organisations visited & partnered with', color: 'text-poppy' },
  { value: 500, prefix: '', suffix: '+', label: 'people reached on campus & online', color: 'text-night' },
]

const DUA =
  'اللہ ہم سب کو ہمیشہ انسانیت کی خدمت کی توفیق دے، نابینا افراد کی مدد کا یہ سفر جاری رکھے، اور آپ کو ہمیشہ بھلائی کی راہ پر قائم رکھے۔ آمین۔'

const DUA_ENGLISH =
  'May Allah always grant you the ability to serve humanity, keep this journey of helping the blind going, and keep you firm on the path of goodness. Ameen.'

/** The dua, in classical Nastaliq. Tapping it swaps to English and back;
    it's a real button so keyboard and screen reader users get the same. */
function Dua() {
  const [english, setEnglish] = useState(false)

  return (
    <>
      <blockquote>
        <button
          type="button"
          onClick={() => setEnglish((v) => !v)}
          aria-pressed={english}
          className="mx-auto block w-full max-w-3xl rounded-lg text-center"
        >
          {english ? (
            <span className="font-display text-[clamp(1.3rem,2.9vw,2.1rem)] font-medium leading-snug tracking-tight">
              {DUA_ENGLISH}
            </span>
          ) : (
            <span
              lang="ur"
              dir="rtl"
              className="font-urdu text-[clamp(1.25rem,2.8vw,2rem)] leading-[2.3]"
            >
              {DUA}
            </span>
          )}
        </button>
      </blockquote>
      <figcaption className="mt-6 flex flex-col items-center gap-3 text-sm text-soot">
        <span className="text-xs uppercase tracking-[0.2em]">
          {english ? 'Tap to see the original Urdu' : 'Tap the dua to read it in English'}
        </span>
        <span className="font-semibold text-night">
          A prayer from one of the patients we helped receive cataract surgery
        </span>
      </figcaption>
    </>
  )
}

export default function Impact() {
  const { reduced } = useMotionPrefs()

  return (
    <section
      id="impact"
      tabIndex={-1}
      aria-labelledby="impact-title"
      className="relative bg-cream px-5 py-28 text-night md:px-10 md:py-40"
    >
      <p className="kicker">Impact</p>
      <RevealText
        as="h2"
        id="impact-title"
        text="What we’ve done so far"
        className="mt-4 max-w-[16ch] font-marker text-[clamp(2rem,6.5vw,4.8rem)] uppercase leading-[1.1]"
      />
      <p className="mt-6 max-w-xl text-base leading-relaxed text-soot md:text-lg">
        We&rsquo;re young and small, so the numbers are too. We&rsquo;d rather report them
        honestly than inflate them.
      </p>

      <dl className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          // DOM order dt then dd (valid HTML, natural for screen readers);
          // flex-col-reverse keeps the number visually on top.
          <motion.div
            key={stat.label}
            className="flex flex-col-reverse border-t-2 border-night/15 pt-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <dt className="mt-3 max-w-[24ch] text-sm leading-relaxed text-soot">{stat.label}</dt>
            <dd className={`font-marker text-[clamp(2rem,4.5vw,3.6rem)] leading-none ${stat.color}`}>
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </motion.div>
        ))}
      </dl>

      <motion.figure
        className="mx-auto mt-28 max-w-3xl text-center md:mt-36"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Dua />
      </motion.figure>
    </section>
  )
}
