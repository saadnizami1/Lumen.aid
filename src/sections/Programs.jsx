import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MediaPlaceholder from '../components/MediaPlaceholder'
import RevealText from '../components/RevealText'
import useMediaQuery from '../hooks/useMediaQuery'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * "What we do" — four chapters that travel horizontally while the reader
 * scrolls vertically (sticky + translateX, driven only by scroll position).
 * Each chapter carries its own brand background (blue / teal / night), like
 * the Instagram grid.
 *
 * ACCESSIBILITY NOTE — animated variant vs. accessible equivalent:
 * Horizontal travel is the most disorienting pattern on the page for
 * screen-reader and reduced-motion users, so under `prefers-reduced-motion`
 * (or the hero toggle) and on small screens the chapters render as a plain
 * vertical sequence instead (same markup order either way). The only
 * focusable elements inside chapters are the video controls; focusing them
 * from the keyboard aligns the scroll to that chapter (see alignChapter), so
 * Tab never leaves focus stranded off-screen.
 */

/* MEDIA: drop files into public/media/ with these exact names. Until a file
   exists (or if it fails to load) the eye placeholder shows instead. Update
   each `alt` to describe what the real photo/video actually shows. */
const CHAPTERS = [
  {
    num: '01',
    title: 'Fundraisers',
    body: 'Community events like café screenings and campus drives, where everything raised goes directly to the blind community.',
    iris: '#C63D3D',
    bg: 'bg-blue',
    media: {
      type: 'image',
      src: '/media/01-fundraisers.jpg',
      alt: 'A Lumen.aid fundraiser evening: a musician plays acoustic guitar in a room lined with paintings while the audience listens from bean bags and rugs.',
    },
  },
  {
    num: '02',
    title: 'Assistive support',
    body: 'White canes, screen-reader setup and everyday tools, funded by what we raise and given free to the people who need them.',
    iris: '#3E6FB3',
    bg: 'bg-teal',
    media: {
      type: 'image',
      src: '/media/02-assistive-support.jpg',
      alt: 'A hand holds a phone running our Offline Dekho app; the camera is pointed at stuffed toys and the screen reads: I see a teddy bear.',
    },
  },
  {
    num: '03',
    title: 'Partnerships',
    body: 'We work alongside established organisations like LRBT, which provides free eye care across Pakistan, and connect people to services that already exist.',
    iris: '#35B48C',
    bg: 'bg-night',
    media: {
      type: 'image',
      src: '/media/03-partnerships.jpg',
      alt: 'Five members of the Lumen.aid team stand at the entrance gate of Layton Rahmatulla Benevolent Trust in Lahore during a visit.',
    },
  },
  {
    num: '04',
    title: 'Awareness',
    body: 'Interviews and social content that put blind voices first, on campus and online.',
    iris: '#6B4A32',
    bg: 'bg-blue',
    media: {
      type: 'video',
      src: '/media/04-awareness.mp4',
      alt: 'Clips from our interview series with members of the blind community.',
    },
  },
]

function IconPlay() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M4.5 2.5v11l9-5.5z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <rect x="3.2" y="2.5" width="3.4" height="11" rx="1" />
      <rect x="9.4" y="2.5" width="3.4" height="11" rx="1" />
    </svg>
  )
}

function IconSoundOn() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M1.5 6h2.8L8 2.8v10.4L4.3 10H1.5z" fill="currentColor" />
      <path
        d="M10.3 5.6a3.4 3.4 0 0 1 0 4.8M12.3 3.8a6.1 6.1 0 0 1 0 8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSoundOff() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M1.5 6h2.8L8 2.8v10.4L4.3 10H1.5z" fill="currentColor" />
      <path
        d="M10.3 6l4 4m0-4l-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Square media frame: the photos are 1:1 posts, so nothing gets cropped.
    The video gets custom play/pause + speaker buttons (44px targets) instead
    of the browser's control strip; it starts as silent b-roll and the
    speaker button opts into audio. */
function ChapterMedia({ chapter, horizontal, onControlFocus }) {
  const { reduced } = useMotionPrefs()
  const [failed, setFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const frame = `relative overflow-hidden rounded-2xl bg-black/25 shadow-2xl ring-1 ring-white/10 ${
    horizontal ? 'aspect-square h-[48vh] w-auto max-w-full' : 'mx-auto aspect-square w-full max-w-md'
  }`

  const { media } = chapter
  if (!media || failed) {
    return <MediaPlaceholder iris={chapter.iris} className={frame} />
  }

  if (media.type === 'video') {
    const controlBtn =
      'flex h-11 w-11 items-center justify-center rounded-full bg-night/75 text-cream backdrop-blur transition-colors hover:bg-night'
    const togglePlay = () => {
      const v = videoRef.current
      if (!v) return
      if (v.paused) v.play()
      else v.pause()
    }
    const toggleMute = () => {
      const v = videoRef.current
      if (!v) return
      v.muted = !v.muted
      if (!v.muted && v.paused) v.play()
    }
    return (
      <div className={frame}>
        <video
          ref={videoRef}
          src={media.src}
          className="h-full w-full object-cover"
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={() => setMuted(videoRef.current ? videoRef.current.muted : true)}
          onError={() => setFailed(true)}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onFocus={onControlFocus}
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className={controlBtn}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          <button
            type="button"
            onFocus={onControlFocus}
            onClick={toggleMute}
            aria-pressed={!muted}
            aria-label={muted ? 'Unmute video sound' : 'Mute video sound'}
            className={controlBtn}
          >
            {muted ? <IconSoundOff /> : <IconSoundOn />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={frame}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        className={`h-full w-full object-cover ${
          reduced ? '' : 'transition-transform duration-700 ease-out hover:scale-[1.04]'
        }`}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function Chapter({ chapter, horizontal, onControlFocus }) {
  return (
    <article
      className={`${chapter.bg} text-white ${
        horizontal
          ? 'flex h-full w-screen shrink-0 items-center px-5 pt-24 pb-8 md:px-10'
          : 'px-5 py-20 md:px-10'
      }`}
    >
      <div
        className={`grid w-full items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16 ${
          horizontal ? 'mx-auto max-w-6xl' : ''
        }`}
      >
        <div>
          <p aria-hidden="true" className="font-marker text-lg text-cream/70">
            {chapter.num}
          </p>
          <h3 className="mt-3 max-w-[12ch] font-marker text-[clamp(2rem,4.6vw,3.9rem)] uppercase leading-[1.1]">
            {chapter.title}
          </h3>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
            {chapter.body}
          </p>
        </div>
        <ChapterMedia chapter={chapter} horizontal={horizontal} onControlFocus={onControlFocus} />
      </div>
    </article>
  )
}

export default function Programs() {
  const { reduced } = useMotionPrefs()
  const desktop = useMediaQuery('(min-width: 768px)')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const count = CHAPTERS.length
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(count - 1) * 100}vw`])
  const chapterLabel = useTransform(scrollYProgress, (v) => {
    const n = Math.min(count, Math.max(1, Math.round(v * (count - 1)) + 1))
    return String(n).padStart(2, '0')
  })

  const horizontal = desktop && !reduced

  // Keyboard focus inside a chapter (the video controls) jumps the scroll
  // position so that chapter is the one on screen.
  const alignChapter = (index) => () => {
    if (!horizontal || !ref.current) return
    const top = ref.current.getBoundingClientRect().top + window.scrollY + index * window.innerHeight
    window.scrollTo(0, top)
  }

  return (
    <section ref={ref} id="programs" tabIndex={-1} aria-labelledby="programs-title" className="relative">
      {horizontal ? (
        <div style={{ height: `${count * 100}vh` }} className="relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div style={{ x }} className="flex h-full will-change-transform">
              {CHAPTERS.map((chapter, i) => (
                <Chapter
                  key={chapter.num}
                  chapter={chapter}
                  horizontal
                  onControlFocus={alignChapter(i)}
                />
              ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-end justify-between px-5 pt-16 text-white md:px-10">
              <div>
                <p className="kicker">What we do</p>
                <h2 id="programs-title" className="mt-2 font-marker text-2xl uppercase md:text-3xl">
                  Four ways in
                </h2>
              </div>
              <p aria-hidden="true" className="font-marker text-sm tracking-[0.3em] text-white/70">
                <motion.span className="text-white">{chapterLabel}</motion.span> /{' '}
                {String(count).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-blue px-5 pt-20 text-white md:px-10">
            <p className="kicker">What we do</p>
            <RevealText
              as="h2"
              id="programs-title"
              text="Four ways in"
              className="mt-2 pb-4 font-marker text-[clamp(1.9rem,7vw,3.2rem)] uppercase"
            />
          </div>
          <div>
            {CHAPTERS.map((chapter, i) => (
              <Chapter
                key={chapter.num}
                chapter={chapter}
                horizontal={false}
                onControlFocus={alignChapter(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
