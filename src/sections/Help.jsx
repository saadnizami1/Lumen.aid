import { motion } from 'framer-motion'
import RevealText from '../components/RevealText'
import { useMotionPrefs } from '../context/MotionPrefs'

const WAYS = [
  {
    title: 'Donate',
    body: 'Every rupee goes to the community: devices, events, support. We will tell you what we raised and where it went.',
    cta: 'Donate',
    href: 'https://forms.gle/T6TPFQmysxXvZzkF9',
    accent: true,
  },
  {
    title: 'Volunteer',
    body: 'Time and skills: event help, audio recording, translation, design, code. Remote or in Lahore.',
    cta: 'Volunteer with us',
    href: 'https://forms.gle/kSQvJJFXm64S2Jbp8',
    accent: false,
  },
  {
    title: 'Partner',
    body: 'Cafés, campuses, companies, established NGOs: run an event with us or support one.',
    cta: 'Partner with us',
    href: 'https://forms.gle/7raZLSpcHtqZomsJ8',
    accent: false,
  },
]

export default function Help() {
  const { reduced } = useMotionPrefs()

  return (
    <section
      id="help"
      tabIndex={-1}
      aria-labelledby="help-title"
      className="relative bg-night px-5 py-28 text-cream md:px-10 md:py-40"
    >
      <p className="kicker text-mint">How to help</p>
      <RevealText
        as="h2"
        id="help-title"
        text="Pick one. It matters."
        className="mt-4 max-w-[14ch] font-marker text-[clamp(2rem,6.5vw,4.8rem)] uppercase leading-[1.1]"
      />

      <ul className="mt-16 list-none">
        {WAYS.map((way, i) => (
          <motion.li
            key={way.title}
            className="group border-t border-white/10 py-10 last:border-b md:py-14"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid items-start gap-6 md:grid-cols-[1fr_1.2fr_auto] md:gap-12">
              <h3 className="font-marker text-[clamp(1.8rem,5vw,3.6rem)] uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 group-focus-within:translate-x-2">
                {way.title}
                <span
                  aria-hidden="true"
                  className="ml-3 inline-block text-poppy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  →
                </span>
              </h3>
              <p className="max-w-md text-base leading-relaxed text-ash md:text-lg">{way.body}</p>
              <a
                href={way.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`pill self-center ${
                  way.accent
                    ? 'bg-poppy text-white hover:bg-cream hover:text-night'
                    : 'border border-cream/50 text-cream hover:bg-cream hover:text-night'
                }`}
              >
                {way.cta}
                <span className="sr-only"> (opens a Google Form in a new tab)</span>
              </a>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="mt-10 max-w-xl text-sm leading-relaxed text-ash">
        All funds go towards the blind community. If you would like to know what your support
        made possible, email us at{' '}
        <a href="mailto:lumenaid.pk@gmail.com" className="link-underline text-cream">
          lumenaid.pk@gmail.com
        </a>{' '}
        any time.
      </p>
    </section>
  )
}
