import { motion } from 'framer-motion'
import backVideo from '../assets/back.mp4'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Slide01Hero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src={backVideo}
      />

      {/* Gradient Overlay for text readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.85) 100%)',
        }}
      />

      {/* Large radial glow center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Decorative horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-8 max-w-5xl mx-auto"
      >
        {/* Eyebrow label */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/25 bg-gold-500/5 text-gold-400 text-xs tracking-[0.2em] uppercase font-inter font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse_glow" />
            Pitch Deck — 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-jakarta font-black text-white text-glow-white leading-none tracking-tight"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
        >
          El valor de
          <br />
          <span className="gradient-gold-text">construir.</span>
        </motion.h1>

        {/* Divider */}
        <motion.div variants={itemVariants} className="my-10 divider-gold max-w-xs mx-auto" />

        {/* Presentador */}
        <motion.p
          variants={itemVariants}
          className="font-jakarta font-small text-white/60 text-md md:text-lg mb-8"
        >
          Presentador: <span className="text-white font-semibold">Gregorik Palma</span>
        </motion.p>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="font-inter text-white/35 text-sm md:text-base tracking-widest uppercase font-light"
        >
          Presiona → para comenzar
        </motion.p>
      </motion.div>

      {/* Corner decorative elements */}
      <div className="absolute bottom-16 left-8 w-16 h-16 border-l border-b border-white/5" />
      <div className="absolute top-16 right-8 w-16 h-16 border-r border-t border-white/5" />
    </div>
  )
}
