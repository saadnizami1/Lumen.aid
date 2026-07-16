/**
 * Renders a word as Grade-1 braille cells built from real dots (not the
 * unicode glyphs, so rendering is guaranteed and the dots can be styled).
 * Purely decorative — always aria-hidden; pass the word visually elsewhere
 * if it carries meaning. Scale it with font-size (dots are em-based).
 */

const BRAILLE = {
  a: [1], b: [1, 2], c: [1, 4], d: [1, 4, 5], e: [1, 5],
  f: [1, 2, 4], g: [1, 2, 4, 5], h: [1, 2, 5], i: [2, 4], j: [2, 4, 5],
  k: [1, 3], l: [1, 2, 3], m: [1, 3, 4], n: [1, 3, 4, 5], o: [1, 3, 5],
  p: [1, 2, 3, 4], q: [1, 2, 3, 4, 5], r: [1, 2, 3, 5], s: [2, 3, 4], t: [2, 3, 4, 5],
  u: [1, 3, 6], v: [1, 2, 3, 6], w: [2, 4, 5, 6], x: [1, 3, 4, 6], y: [1, 3, 4, 5, 6],
  z: [1, 3, 5, 6],
}

export default function BrailleWord({ word, className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-[0.85em] ${className}`}>
      {word
        .toLowerCase()
        .split('')
        .map((ch, i) => {
          const dots = BRAILLE[ch] || []
          return (
            <span
              key={`${ch}-${i}`}
              className="grid grid-rows-3 gap-[0.34em]"
              style={{ gridAutoFlow: 'column' }}
            >
              {[1, 2, 3, 4, 5, 6].map((d) => (
                <span
                  key={d}
                  className={`h-[0.3em] w-[0.3em] rounded-full bg-current ${
                    dots.includes(d) ? '' : 'opacity-15'
                  }`}
                />
              ))}
            </span>
          )
        })}
    </span>
  )
}
