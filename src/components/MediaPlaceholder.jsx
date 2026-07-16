import Eye from './Eye'

/**
 * Decorative image slot. When a real photograph is ready, replace the whole
 * <MediaPlaceholder /> with:
 *
 *   <img src="..." alt="describe the photo" className="h-full w-full object-cover rounded-lg" loading="lazy" />
 *
 * Until then it renders as an intentional brand illustration (not a dev
 * note), and is hidden from screen readers so nobody is told about a photo
 * that isn't there yet.
 */
export default function MediaPlaceholder({ iris = '#C63D3D', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden bg-black/20 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 20% 10%, rgba(241,231,212,0.10), transparent 60%),' +
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
        }}
      />
      <Eye iris={iris} className="relative w-2/5 max-w-[220px] -rotate-6" />
    </div>
  )
}
