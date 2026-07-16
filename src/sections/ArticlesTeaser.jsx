import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ARTICLES, MEDIUM_URL, readingMinutes } from '../content/articles'
import RevealText from '../components/RevealText'
import { useMotionPrefs } from '../context/MotionPrefs'

/** Home page teaser for the reading room. */
export default function ArticlesTeaser() {
  const { reduced } = useMotionPrefs()

  return (
    <section
      id="articles"
      tabIndex={-1}
      aria-labelledby="articles-title"
      className="relative bg-blue px-5 py-28 text-white md:px-10 md:py-36"
    >
      <p className="kicker text-cream">Articles</p>
      <RevealText
        as="h2"
        id="articles-title"
        text="We write about eye health"
        className="mt-4 max-w-[16ch] font-marker text-[clamp(2rem,6.5vw,4.8rem)] uppercase leading-[1.1]"
      />
      <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
        Plain language explainers on the conditions behind vision loss, written by our team.
        Read them here in a page built for comfortable reading, or on Medium.
      </p>

      <ul className="mt-14 list-none">
        {ARTICLES.map((article, i) => (
          <motion.li
            key={article.slug}
            className="border-t border-white/20 last:border-b"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/articles/${article.slug}`} className="group block py-8 md:py-10">
              <div className="grid items-start gap-4 md:grid-cols-[1.2fr_1fr_auto] md:gap-10">
                <h3 className="max-w-[26ch] font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {article.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                  {article.dek}
                </p>
                <p className="flex items-center gap-3 self-center font-sans text-sm text-cream/90">
                  {readingMinutes(article)} min read
                  <span
                    aria-hidden="true"
                    className="inline-block text-cream transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                  >
                    →
                  </span>
                </p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Link to="/articles" className="pill bg-cream text-night hover:bg-poppy hover:text-white">
          Open the reading room
        </Link>
        <a
          href={MEDIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pill border border-white/50 text-white hover:bg-cream hover:text-night"
        >
          Follow us on Medium
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  )
}
