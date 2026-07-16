import { motion, useMotionValue, useTransform } from 'framer-motion'

/**
 * One brand eye: cream almond, coloured iris, dark pupil, drawn to match
 * the Lumen.aid Instagram illustration. Decorative only; render inside an
 * aria-hidden container.
 *
 * `mx`/`my` are optional shared, normalised (-0.5 to 0.5) pointer motion
 * values from EyesCluster; the pupil drifts a few pixels toward the cursor.
 * Without them the eye is static.
 */
export default function Eye({ iris = '#C63D3D', mx, my, className = '' }) {
  const staticX = useMotionValue(0)
  const staticY = useMotionValue(0)
  const px = useTransform(mx ?? staticX, (v) => v * 9)
  const py = useTransform(my ?? staticY, (v) => v * 5)

  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" focusable="false">
      <path d="M2 20 C16 3, 48 3, 62 20 C48 37, 16 37, 2 20 Z" fill="#F1E7D4" />
      <circle cx="32" cy="20" r="10.5" fill={iris} />
      <motion.circle cx="32" cy="20" r="5.2" fill="#17181A" style={{ x: px, y: py }} />
    </svg>
  )
}
