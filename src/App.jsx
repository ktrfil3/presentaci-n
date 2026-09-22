import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MiipLogo from './MiipLogo'
import SoundToggle from './SoundToggle'

import Slide00Blank from './slides/Slide00Blank'
import Slide01Hero from './slides/Slide01Hero'
import Slide02Problem from './slides/Slide02Problem'
import Slide03Impact from './slides/Slide03Impact'
import Slide04Products from './slides/Slide04Products'
import Slide05Fusion from './slides/Slide05Fusion'
import Slide06Brand from './slides/Slide06Brand'
import Slide07Value from './slides/Slide07Value'
import Slide08App from './slides/Slide08App'
import Slide09Finance from './slides/Slide09Finance'
import Slide10Dashboard from './slides/Slide10Dashboard'
import Slide11Logistics from './slides/Slide11Logistics'
import Slide12Offer from './slides/Slide12Offer'
import Slide13Roadmap from './slides/Slide13Roadmap'
import Slide14CTA from './slides/Slide14CTA'

const slides = [
  Slide00Blank,
  Slide01Hero,
  Slide02Problem,
  Slide03Impact,
  Slide04Products,
  Slide05Fusion,
  Slide06Brand,
  Slide07Value,
  Slide08App,
  Slide09Finance,
  Slide10Dashboard,
  Slide11Logistics,
  Slide12Offer,
  Slide13Roadmap,
  Slide14CTA,
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

  const progress = current === 0 ? 0 : (current / (TOTAL - 1)) * 100

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
      <div className={`absolute top-4 right-6 z-50 flex items-center gap-6 transition-opacity duration-700 ${current === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SoundToggle />
        <div className="font-inter text-xs tracking-widest text-white/30 font-medium">
          {String(current).padStart(2, '0')} / {String(TOTAL - 1).padStart(2, '0')}
        </div>
      </div>

      {/* MiiP logo top-left */}
      {current !== 0 && current !== 4 && current !== 11 && (
        <div className="absolute top-4 left-6 z-50 opacity-80 h-10 flex items-center">
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
