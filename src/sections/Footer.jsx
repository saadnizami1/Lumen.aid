import { Link } from 'react-router-dom'
import BrailleWord from '../components/BrailleWord'
import { MEDIUM_URL } from '../content/articles'

const MAPS_URL =
  'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARAjGCcyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDQgFEC4YrwEYxwEYgAQyBwgGEAAYgAQyBwgHEAAYgAQyDQgIEC4YrwEYxwEYgAQyBwgJEAAYgATSAQgyMjQxajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KctAarHGCRk5MZl8IHUayxCN&daddr=1+Ring+Road%D8%8C+adj.+Sector+M,+Leel+Phase+5+D.H.A,+Lahore,+54000'

export default function Footer() {
  return (
    <footer
      id="contact"
      tabIndex={-1}
      aria-label="Contact and site information"
      className="relative border-t border-white/10 bg-night px-5 pb-10 pt-20 text-cream md:px-10"
    >
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            Lumen<span className="text-poppy">.</span>aid
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            Empowering visually impaired communities in Pakistan. Youth led, Lahore-based,
            est. 2024.
          </p>
          <BrailleWord word="light" className="mt-8 text-[11px] text-cream" />
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-ash">Explore</h2>
          <ul className="mt-5 flex list-none flex-col gap-3 text-sm">
            <li>
              <Link to="/app" className="link-underline text-cream opacity-90">
                Our app
              </Link>
            </li>
            <li>
              <Link to="/articles" className="link-underline text-cream opacity-90">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/team" className="link-underline text-cream opacity-90">
                Team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-ash">Contact</h2>
          <ul className="mt-5 flex list-none flex-col gap-3 text-sm">
            <li>
              <a
                href="mailto:lumenaid.pk@gmail.com"
                className="link-underline text-cream opacity-90"
              >
                lumenaid.pk@gmail.com
              </a>
            </li>
            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream opacity-90"
              >
                Lahore, Pakistan
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-ash">Elsewhere</h2>
          <ul className="mt-5 flex list-none flex-col gap-3 text-sm text-ash">
            <li>
              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream opacity-90"
              >
                Medium
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/lumen.aid/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream opacity-90"
              >
                Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lumen-aid-904256416/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream opacity-90"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ash">
        <p>© 2026 Lumen.aid · Lahore, Pakistan · Est. 2024</p>
        <p>No trackers, no cookies</p>
      </div>
    </footer>
  )
}
