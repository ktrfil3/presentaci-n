import { motion } from 'framer-motion'
import MiipLogo from '../MiipLogo'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Slide04Brand() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Gold burst glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 55% at 50% 48%, rgba(245,166,35,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 85% 85% at 50% 48%, rgba(201,168,76,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-6 px-8"
      >
        {/* Logo principal — grande y centrado con glow */}
        <motion.div
          variants={itemVariants}
          style={{
            filter: 'drop-shadow(0 0 50px rgba(245,166,35,0.4)) drop-shadow(0 0 100px rgba(245,166,35,0.18))',
          }}
        >
          <MiipLogo width={440} />
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="divider-gold w-64" />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-inter font-light text-white/50 tracking-[0.25em] uppercase"
          style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
        >
          El nuevo estándar del comercio local.
        </motion.p>

        {/* Decorative dots */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 2 ? 6 : 4,
                height: i === 2 ? 6 : 4,
                background: i === 2 ? '#F5A623' : 'rgba(245,166,35,0.25)',
                boxShadow: i === 2 ? '0 0 8px rgba(245,166,35,0.6)' : 'none',
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
