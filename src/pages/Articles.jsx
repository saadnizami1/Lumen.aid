import { Link } from 'react-router-dom'
import { ARTICLES, MEDIUM_URL, readingMinutes } from '../content/articles'
import { useSeo } from '../hooks/useSeo'

export default function Articles() {
  useSeo({
    title: 'The reading room',
    description:
      'Plain language explainers on the conditions behind vision loss, written by the Lumen.aid team.',
    path: '/articles',
  })

  return (
    <div className="min-h-svh bg-cream px-5 pb-24 pt-28 text-night md:px-10 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="kicker">Articles</p>
        <h1 className="mt-4 font-marker text-[clamp(2.2rem,6.5vw,4.5rem)] uppercase leading-[1.1]">
          The reading room
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-soot md:text-lg">
          Plain language explainers on the conditions behind vision loss, written by our team.
          Read them right here, or on Medium where new pieces land regularly.
        </p>
        <a
          href={MEDIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pill mt-6 border border-night/40 text-night hover:bg-night hover:text-cream"
        >
          Follow us on Medium
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <ul className="mt-14 list-none">
          {ARTICLES.map((article) => (
            <li key={article.slug} className="border-t-2 border-night/15 last:border-b-2">
              <Link to={`/articles/${article.slug}`} className="group block py-9">
                <h2 className="max-w-[28ch] font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                  {article.title}
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block text-poppy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    →
                  </span>
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-soot">{article.dek}</p>
                <p className="mt-4 font-sans text-sm text-soot">
                  By {article.author} · {readingMinutes(article)} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
