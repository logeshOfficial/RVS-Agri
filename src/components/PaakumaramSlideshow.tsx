/**
 * PaakumaramSlideshow
 *
 * Auto-cycling image slideshow for the Paakumaram areca nut section.
 * Uses Framer Motion for smooth crossfade transitions.
 *
 * ─── TO ADD / REMOVE / REORDER IMAGES ───────────────────────────────────────
 * Edit: src/config/paakumaram.config.ts
 * No changes needed in this component file.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { paakumaramImages, SLIDESHOW_INTERVAL_MS } from '@/config/paakumaram.config'

/**
 * Resolve a public-folder filename to a full URL that works both in
 * local dev (base = "/") and on GitHub Pages (base = "/RVS-Agri/").
 *
 * import.meta.env.BASE_URL always has a trailing slash, e.g. "/" or "/RVS-Agri/"
 * so we just prefix the bare filename directly.
 */
function publicUrl(filename: string): string {
  if (filename.startsWith('http')) return filename
  // Strip any accidental leading slash from filename before joining
  const clean = filename.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PaakumaramSlideshow() {
  const images = paakumaramImages
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  // Auto-advance — resets cleanly on every slide change
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, SLIDESHOW_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next, paused, current])

  const currentSrc = publicUrl(images[current].src)

  return (
    <div
      className="relative rounded-3xl overflow-hidden aspect-[4/5] w-full group select-none bg-farm-cream/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Crossfade image stack ── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={currentSrc}
          alt={images[current].alt}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            // Fallback to pakku.jpg if a numbered file isn't uploaded yet
            const target = e.currentTarget
            const fallback = publicUrl('pakku.jpg')
            if (target.src !== fallback) target.src = fallback
          }}
        />
      </AnimatePresence>

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* ── Prev arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-black/50 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* ── Next arrow ── */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-black/50 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* ── Dots + pause ── */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
          className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     hover:bg-black/50"
        >
          {paused ? (
            <Play className="w-3 h-3 fill-white" />
          ) : (
            <Pause className="w-3 h-3 fill-white" />
          )}
        </button>

        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={[
                'rounded-full transition-all duration-300',
                i === current
                  ? 'bg-white w-5 h-2'
                  : 'bg-white/50 hover:bg-white/80 w-2 h-2',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20 overflow-hidden">
          <motion.div
            key={current}
            className="h-full bg-farm-leaf"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            transition={{ duration: SLIDESHOW_INTERVAL_MS / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  )
}
