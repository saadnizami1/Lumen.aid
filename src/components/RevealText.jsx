import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useMotionPrefs } from '../context/MotionPrefs'

/**
 * Word-by-word rise-in reveal.
 *
 * Screen-reader safe: assistive tech gets the full sentence once (sr-only),
 * while the animated, word-split copy is aria-hidden so it's never read as
 * broken fragments. Under reduced motion the plain text renders directly.
 */
export default function RevealText({
  as: Comp = 'p',
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  once = true,
  ...rest
}) {
  const { reduced } = useMotionPrefs()

  if (reduced) {
    return (
      <Comp className={className} {...rest}>
        {text}
      </Comp>
    )
  }

  const words = text.split(' ')

  return (
    <Comp className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3, margin: '0px 0px -8% 0px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: '115%' },
                  visible: {
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>{' '}
          </Fragment>
        ))}
      </motion.span>
    </Comp>
  )
}
