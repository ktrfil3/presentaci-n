import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Slide03Impact() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Strong red-wine radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,28,42,0.25) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 30% 70%, rgba(201,168,76,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Decorative circle rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-white/[0.02]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-8 max-w-5xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="font-inter text-white/25 text-xs tracking-[0.3em] uppercase mb-8 font-medium"
        >
          La pregunta clave
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="font-jakarta font-black text-white leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
        >
          ¿El delivery multiplica
          <br />
          tu negocio...
          <br />
          <span
            className="gradient-gold-text"
            style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.3))' }}
          >
            o frena tu margen?
          </span>
        </motion.h2>

        <motion.div variants={itemVariants} className="mt-10 divider-gold max-w-48 mx-auto" />
      </motion.div>
    </div>
  )
}
