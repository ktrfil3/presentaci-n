import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MiipLogo from './MiipLogo'
import SoundToggle from './SoundToggle'

import Slide01Hero from './slides/Slide01Hero'
import Slide02Problem from './slides/Slide02Problem'
import Slide03Impact from './slides/Slide03Impact'
import Slide04Brand from './slides/Slide04Brand'
import Slide05Value from './slides/Slide05Value'
import Slide06App from './slides/Slide06App'
import Slide07Dashboard from './slides/Slide07Dashboard'
import Slide08Logistics from './slides/Slide08Logistics'
import Slide09Offer from './slides/Slide09Offer'
import Slide10Roadmap from './slides/Slide10Roadmap'
import Slide11CTA from './slides/Slide11CTA'

const slides = [
  Slide01Hero,
  Slide02Problem,
  Slide03Impact,
  Slide04Brand,
  Slide05Value,
  Slide06App,
  Slide07Dashboard,
  Slide08Logistics,
  Slide09Offer,
  Slide10Roadmap,
  Slide11CTA,
]

const TOTAL = slides.length

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = useCallback(() => {
    if (current < TOTAL - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const SlideComponent = slides[current]

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
    }),
  }

  const progress = ((current + 1) / TOTAL) * 100

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden select-none">

      {/* Ambient background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-wine" />
        <div className="absolute inset-0 bg-radial-gold" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #dba71aff, #F5D98B)' }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Top-right controls */}
      <div className="absolute top-4 right-6 z-50 flex items-center gap-6">
        <SoundToggle />
        <div className="font-inter text-xs tracking-widest text-white/30 font-medium">
          {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </div>
      </div>

      {/* MiiP logo top-left */}
      {current !== 3 && current !== 10 && (
        <div className="absolute top-2 left-5 z-50 opacity-80">
          <MiipLogo width={72} />
        </div>
      )}

      {/* Slides */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <motion.button
          id="btn-prev"
          onClick={goPrev}
          disabled={current === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-11 h-11 rounded-full card-glass border border-white/10
                     text-white/40 hover:text-white/80 hover:border-gold-500/40
                     disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-[6px]">
          {slides.map((_, i) => (
            <button
              key={i}
              id={`dot-${i}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-5 h-[6px] dot-active'
                  : 'w-[6px] h-[6px] bg-white/15 hover:bg-white/30'
                }`}
            />
          ))}
        </div>

        <motion.button
          id="btn-next"
          onClick={goNext}
          disabled={current === TOTAL - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-11 h-11 rounded-full card-glass border border-white/10
                     text-white/40 hover:text-white/80 hover:border-gold-500/40
                     disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  )
}
