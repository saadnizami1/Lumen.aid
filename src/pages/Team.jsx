import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RevealText from '../components/RevealText'
import { useMotionPrefs } from '../context/MotionPrefs'
import { useSeo } from '../hooks/useSeo'
import { DEPARTMENTS, TEAM_SIZE } from '../content/team'

/* TODO: swap for the dedicated join-the-team link when it's shared; the
   volunteer form stands in until then. */
const JOIN_URL = 'https://forms.gle/kSQvJJFXm64S2Jbp8'

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four',
  'twenty five', 'twenty six', 'twenty seven', 'twenty eight', 'twenty nine', 'thirty',
]

const words = (n) => WORDS[n] ?? String(n)
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * One node on the chart. Heads carry their title visibly; members carry
 * theirs only to assistive tech, which keeps thirteen repetitions of the same
 * label off the page while still naming everyone's role to a screen reader.
 *
 * Tiles are night at low alpha rather than white: white text on a lightened
 * tile drops below AA (white on bg-white/15 over teal is 3.99:1), while
 * night/20 to night/40 sits between 7:1 and 9.4:1.
 */
function Person({ member, department, executive }) {
  const lead = Boolean(member.lead)

  return (
    <li
      className={`rounded-xl px-4 py-3.5 ring-1 ${
        lead ? 'bg-night/40 ring-white/20' : 'bg-night/20 ring-white/10'
      } ${executive ? 'md:px-5 md:py-5' : ''}`}
    >
      <p
        className={`font-display tracking-tight text-white ${
          executive
            ? 'text-[1.3rem] font-semibold leading-tight md:text-[1.55rem]'
            : lead
              ? 'text-[1.15rem] font-semibold leading-tight md:text-[1.3rem]'
              : 'text-[1.05rem] font-medium leading-tight md:text-[1.15rem]'
        }`}
      >
        {member.name}
      </p>

      <p
        className={
          lead
            ? 'mt-1.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white md:text-[11px]'
            : 'sr-only'
        }
      >
        {lead ? member.role : `${department.name} team member`}
      </p>

      {member.link ? (
        <Link
          to={member.link.to}
          className="link-underline mt-2 inline-block font-sans text-[12.5px] text-white/90 hover:text-white"
        >
          {member.link.label}
        </Link>
      ) : null}
    </li>
  )
}

/**
 * One branch of the chart: a node hanging off the trunk that runs down the
 * left. The trunk and its stubs are structure, not ornament, so they are the
 * one place on this site that draws a line; they are aria-hidden because the
 * hierarchy they describe is already carried by the headings and roles.
 */
function Department({ department, index, reduced }) {
  const id = `dept-${index + 1}-title`
  const count = department.members.length
  const executive = Boolean(department.executive)

  return (
    <motion.section
      aria-labelledby={id}
      className="relative mt-8 first:mt-0 md:mt-10"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stub joining this node to the trunk. */}
      <span
        aria-hidden="true"
        className="absolute -left-5 top-[2.6rem] h-px w-5 bg-white/30 md:-left-10 md:w-10"
      />

      <div
        className={`rounded-2xl p-5 ring-1 md:p-7 ${
          executive ? 'bg-night/35 ring-cream/30' : 'bg-night/25 ring-white/12'
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p aria-hidden="true" className="font-marker text-2xl leading-none text-cream/90">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h2 id={id} className="font-marker text-2xl uppercase leading-[1.05] text-cream">
            {department.name}
          </h2>
          <p className="kicker ml-auto text-white">
            {cap(words(count))} {count === 1 ? 'person' : 'people'}
          </p>
        </div>

        <ul
          className={`mt-5 grid list-none gap-3 ${
            executive ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {department.members.map((member) => (
            <Person
              key={member.name}
              member={member}
              department={department}
              executive={executive}
            />
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

export default function Team() {
  useSeo({
    title: 'Team',
    description: `${cap(words(TEAM_SIZE))} students based in Lahore, working across ${words(
      DEPARTMENTS.length,
    )} departments to make life more accessible for the blind community in Pakistan.`,
    path: '/team',
  })

  const { reduced } = useMotionPrefs()

  return (
    <div className="min-h-svh bg-teal px-5 pb-24 pt-28 text-white md:px-10 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="kicker text-white">Team</p>
        <RevealText
          as="h1"
          text={`A team of ${words(TEAM_SIZE)}`}
          className="mt-4 font-marker text-[clamp(2.2rem,6.5vw,4.5rem)] uppercase leading-[1.1]"
        />
        {/* Cream on teal is 4.32:1, which is legal only as large text, so 24px
            (text-2xl) is the floor here and on every cream heading below. */}
        <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-cream md:text-[1.75rem]">
          {cap(words(TEAM_SIZE))} students based in Lahore, most of us in our A Levels, working
          to make life more accessible for the blind community in Pakistan.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
          This is how we are put together: {words(DEPARTMENTS.length)} departments, each one led
          by someone who answers for it.
        </p>

        {/* The chart. The trunk is one absolutely positioned hairline running
            the height of the branches; each section draws its own stub into
            it, so departments can be added or removed without retuning it. */}
        <div className="relative mt-16 pl-5 md:mt-20 md:pl-10">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-0 top-0 w-px bg-white/30"
          />
          {DEPARTMENTS.map((department, i) => (
            <Department key={department.name} department={department} index={i} reduced={reduced} />
          ))}
        </div>

        <motion.div
          className="mt-24 md:mt-32"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-marker text-2xl uppercase md:text-3xl">Join the team</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Want in? We are recruiting. The two roles we need most right now:
          </p>
          <ul className="mt-6 flex list-none flex-wrap gap-3">
            <li className="rounded-full bg-night/40 px-5 py-2.5 text-sm font-semibold">Media</li>
            <li className="rounded-full bg-night/40 px-5 py-2.5 text-sm font-semibold">
              Marketing
            </li>
          </ul>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90">
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
        </motion.div>
      </div>
    </div>
  )
}
