import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ARTICLES, MEDIUM_URL, readingMinutes } from '../content/articles'
import { useSeo } from '../hooks/useSeo'

/**
 * The reader. Kindle-style: a calm paper page, a comfortable measure,
 * adjustable text size, a paper/dark toggle and a progress bar. The global
 * nav steps aside on this route (see Nav.jsx); the reader brings its own
 * top bar. Both settings persist between visits.
 */

const MIN_SIZE = 16
const MAX_SIZE = 24

function readStored(key, fallback) {
  try {
    return window.localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function store(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage may be blocked; settings still apply for this visit.
  }
}

function Reader({ article }) {
  useSeo({ title: article.title, description: article.dek, path: `/articles/${article.slug}` })

  const index = ARTICLES.indexOf(article)
  const prev = ARTICLES[index - 1]
  const next = ARTICLES[index + 1]

  const [size, setSize] = useState(() => {
    const stored = Number(readStored('lumenaid:reader-size', '19'))
    return Number.isFinite(stored) ? Math.min(MAX_SIZE, Math.max(MIN_SIZE, stored)) : 19
  })
  const [theme, setTheme] = useState(() =>
    readStored('lumenaid:reader-theme', 'paper') === 'dark' ? 'dark' : 'paper',
  )

  useEffect(() => store('lumenaid:reader-size', String(size)), [size])
  useEffect(() => store('lumenaid:reader-theme', theme), [theme])

  const bodyRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  const paper = theme === 'paper'
  const muted = paper ? 'text-soot' : 'text-ash'
  const controlBtn = `pill border px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40 ${
    paper
      ? 'border-night/30 text-night hover:bg-night hover:text-cream'
      : 'border-white/30 text-cream hover:bg-cream hover:text-night'
  }`

  return (
    <div className={paper ? 'bg-cream text-night' : 'bg-night text-cream'}>
      <div
        className={`sticky top-0 z-40 border-b backdrop-blur ${
          paper ? 'border-night/10 bg-cream/95' : 'border-white/10 bg-night/95'
        }`}
      >
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 font-sans">
          <Link to="/articles" className={`link-underline text-sm ${muted}`}>
            ← All articles
          </Link>
          <Link to="/" className="text-base font-bold tracking-tight">
            Lumen<span className="text-poppy">.</span>aid
          </Link>
          <div className="flex items-center gap-2" role="group" aria-label="Reading settings">
            <button
              type="button"
              className={controlBtn}
              onClick={() => setSize((s) => Math.max(MIN_SIZE, s - 1))}
              disabled={size <= MIN_SIZE}
              aria-label="Make text smaller"
            >
              A-
            </button>
            <button
              type="button"
              className={controlBtn}
              onClick={() => setSize((s) => Math.min(MAX_SIZE, s + 1))}
              disabled={size >= MAX_SIZE}
              aria-label="Make text larger"
            >
              A+
            </button>
            <span className="sr-only" aria-live="polite">
              Text size {size} pixels
            </span>
            <button
              type="button"
              className={controlBtn}
              onClick={() => setTheme(paper ? 'dark' : 'paper')}
              aria-pressed={!paper}
            >
              {paper ? 'Dark page' : 'Light page'}
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="h-[3px] origin-left bg-poppy"
          style={{ scaleX: progress }}
        />
      </div>

      <article
        ref={bodyRef}
        style={{ fontSize: `${size}px` }}
        className="mx-auto max-w-[42rem] px-5 pb-24 pt-12 font-display leading-[1.75] md:pt-16"
      >
        <header className="font-sans">
          <p className={`kicker ${paper ? 'text-teal' : 'text-mint'}`}>Lumen.aid articles</p>
          <h1 className="mt-5 font-display text-[1.9em] font-bold leading-[1.15] tracking-tight">
            {article.title}
          </h1>
          <p className={`mt-5 text-sm ${muted}`}>
            By {article.author} · {readingMinutes(article)} min read ·{' '}
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Also on Medium
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </header>

        <div className="mt-10">
          {article.blocks.map((block, i) => {
            if (block.t === 'h2') {
              return (
                <h2 key={i} className="mt-[1.7em] text-[1.3em] font-semibold leading-snug tracking-tight">
                  {block.text}
                </h2>
              )
            }
            if (block.t === 'list') {
              return (
                <ul key={i} className="mt-[1em] list-disc space-y-[0.6em] pl-6">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            }
            const dropCap = i === 0
            return (
              <p
                key={i}
                className={`mt-[1em] ${
                  dropCap
                    ? 'first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-marker first-letter:text-[2.6em] first-letter:leading-[0.75] first-letter:text-poppy'
                    : ''
                }`}
              >
                {block.text}
              </p>
            )
          })}
        </div>

        <footer className="mt-16 font-sans text-base">
          <nav
            aria-label="More articles"
            className={`grid gap-6 border-t-2 pt-8 sm:grid-cols-2 ${
              paper ? 'border-night/15' : 'border-white/15'
            }`}
          >
            {prev ? (
              <Link to={`/articles/${prev.slug}`} className="group">
                <span className={`block text-xs uppercase tracking-[0.2em] ${muted}`}>
                  Previous
                </span>
                <span className="link-underline mt-2 inline-block font-display font-semibold leading-snug">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next && (
              <Link to={`/articles/${next.slug}`} className="group sm:text-right">
                <span className={`block text-xs uppercase tracking-[0.2em] ${muted}`}>Next</span>
                <span className="link-underline mt-2 inline-block font-display font-semibold leading-snug">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pill bg-poppy text-white hover:opacity-90"
            >
              Follow us on Medium
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link
              to="/"
              className={`pill border ${
                paper
                  ? 'border-night/30 text-night hover:bg-night hover:text-cream'
                  : 'border-white/30 text-cream hover:bg-cream hover:text-night'
              }`}
            >
              Back to home
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) return <Navigate to="/articles" replace />
  return <Reader article={article} />
}
