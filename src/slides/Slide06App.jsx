import { motion } from 'framer-motion'
import { CheckCircle, Smartphone } from 'lucide-react'
import mockupGif from '../assets/mockup.gif'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  'Navegación fluida por menús y carritos de compra optimizados para conversión.',
  'Integración directa (Checkout) con Pago Móvil, Zelle y tarjetas para cero fricción.',
  'Seguimiento de órdenes en tiempo real para total tranquilidad del usuario.',
]

export default function Slide06App() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* Left column — Content */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              06 — Producto
            </p>
            <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Experiencia del Cliente
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="font-jakarta font-semibold text-white/80 text-xl leading-snug">
              Diseño intuitivo.{' '}
              <span className="gradient-gold-text">Pagos locales nativos.</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: '#C9A84C' }}
                  strokeWidth={1.5}
                />
                <p className="font-inter text-white/55 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-inter font-medium tracking-wider uppercase"
              style={{
                background: 'rgba(201,168,76,0.06)',
                borderColor: 'rgba(201,168,76,0.2)',
                color: '#C9A84C',
              }}
            >
              <Smartphone size={13} strokeWidth={1.5} />
              App Mobile — iOS &amp; Android
            </div>
          </motion.div>
        </div>

        {/* Right column — Mockup placeholder */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-full absolute left-[500px]"
        >
          {/* We use a simple trick to ensure it plays from start when mounted */}
          <img
            key={Date.now()}
            src={mockupGif}
            alt="MiiP App Mockup"
            className="w-full max-w-[90%] h-auto object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.15))'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
