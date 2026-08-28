import { motion } from 'framer-motion'
import { QrCode, ArrowRight } from 'lucide-react'
import MiipLogo from '../MiipLogo'
import qrImg from '../assets/qr.svg'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Slide11CTA() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(245,166,35,0.07) 0%, transparent 60%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* Left column — Logo grande */}
        <div className="flex flex-col justify-center gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-6 font-medium">
              11 — Únete
            </p>

            {/* Logo con glow */}
            <div
              style={{
                filter: 'drop-shadow(0 0 35px rgba(245,166,35,0.3)) drop-shadow(0 0 70px rgba(245,166,35,0.12))',
              }}
            >
              <MiipLogo width={320} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="divider-gold w-24" />

          <motion.p
            variants={itemVariants}
            className="font-jakarta font-semibold text-white/60 leading-snug"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            Construyendo el futuro
            <br />
            del comercio local.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-white/20 text-xs font-inter tracking-widest uppercase"
          >
            <div className="w-1 h-1 rounded-full bg-gold-500 animate-pulse_glow" />
            2026 — Primera conferencia de aliados
          </motion.div>
        </div>

        {/* Right column — QR block */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <div
            className="relative flex flex-col items-center gap-0 overflow-hidden rounded-3xl"
            style={{
              width: '100%',
              maxWidth: 340,
              background: 'rgba(255,255,255,0.96)',
              boxShadow: '0 0 80px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* QR area */}
            <div className="w-full flex flex-col items-center justify-center p-8 gap-5">
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{ maxHeight: 220 }}
              >
                <img src={qrImg} alt="MiiP QR Code" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Bottom action */}
            <div
              className="w-full flex flex-col items-center gap-2 px-8 pb-7"
              style={{ background: '#09090b' }}
            >
              <div
                className="w-full h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)' }}
              />
              <div className="pt-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ArrowRight size={13} style={{ color: '#F5A623' }} strokeWidth={2} />
                  <p className="font-jakarta font-black text-white text-xl tracking-wider">
                    ÚNETE COMO ALIADO
                  </p>
                </div>
                <p className="font-inter text-white/35 text-xs tracking-widest uppercase">
                  Escanea para registro prioritario
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
