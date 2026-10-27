import EyesCluster from '../components/EyesCluster'
import { useSeo } from '../hooks/useSeo'

/* TODO: swap for the dedicated join-the-team link when it's shared; the
   volunteer form stands in until then. */
const JOIN_URL = 'https://forms.gle/kSQvJJFXm64S2Jbp8'

/* Fifteen eyes for fifteen people. When names, roles and photos are ready,
   this page can grow member cards; for now it says exactly what's true. */
const TEAM_EYES = [
  { iris: '#C63D3D', w: '13%', x: '2%', y: '8%', r: -8 },
  { iris: '#3E6FB3', w: '16%', x: '18%', y: '2%', r: 5 },
  { iris: '#35B48C', w: '12%', x: '37%', y: '10%', r: -12 },
  { iris: '#6B4A32', w: '17%', x: '52%', y: '0%', r: 8 },
  { iris: '#C63D3D', w: '13%', x: '72%', y: '8%', r: -5 },
  { iris: '#3E6FB3', w: '11%', x: '87%', y: '14%', r: 12 },
  { iris: '#35B48C', w: '15%', x: '6%', y: '38%', r: 10 },
  { iris: '#6B4A32', w: '12%', x: '26%', y: '33%', r: -6 },
  { iris: '#C63D3D', w: '16%', x: '41%', y: '40%', r: 4 },
  { iris: '#3E6FB3', w: '12%', x: '61%', y: '34%', r: -10 },
  { iris: '#35B48C', w: '15%', x: '77%', y: '42%', r: 7 },
  { iris: '#3E6FB3', w: '12%', x: '12%', y: '70%', r: -14 },
  { iris: '#C63D3D', w: '14%', x: '30%', y: '66%', r: 9 },
  { iris: '#35B48C', w: '13%', x: '52%', y: '72%', r: -4 },
  { iris: '#6B4A32', w: '16%', x: '70%', y: '68%', r: 11 },
]

export default function Team() {
  useSeo({
    title: 'Team',
    description:
      'Fifteen students based in Lahore working to make life more accessible for the blind community in Pakistan.',
    path: '/team',
  })

  return (
    <div className="min-h-svh bg-teal px-5 pb-24 pt-28 text-white md:px-10 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-cream">Team</p>
        <h1 className="mt-4 font-marker text-[clamp(2.2rem,6.5vw,4.5rem)] uppercase leading-[1.1]">
          A team of fifteen
        </h1>
        <p className="mt-6 max-w-xl font-display text-xl leading-snug text-cream md:text-2xl">
          Fifteen students based in Lahore, most of us in our A Levels, working to make life
          more accessible for the blind community in Pakistan.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
          Names, faces and roles will be added here soon. Until then, you can find all of us at
          the next fundraiser.
        </p>

        <EyesCluster eyes={TEAM_EYES} className="mx-auto mt-14 aspect-[16/9] max-w-2xl" />

        <div className="mt-20">
          <h2 className="font-marker text-2xl uppercase md:text-3xl">Join the team</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Want in? We are recruiting. The two roles we need most right now:
          </p>
          <ul className="mt-6 flex list-none flex-wrap gap-3">
            <li className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold">Media</li>
            <li className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold">
              Marketing
            </li>
          </ul>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
            Other skills are welcome too: design, code, events, translation.
          </p>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mt-8 bg-poppy text-white hover:bg-cream hover:text-night"
          >
            Apply to join
            <span className="sr-only"> (opens a form in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
