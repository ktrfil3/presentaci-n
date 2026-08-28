import { motion } from 'framer-motion'
import { BarChart2, ListOrdered, LayoutDashboard } from 'lucide-react'
import dashImg from '../assets/dash.jpg'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  { icon: ListOrdered, text: 'Gestión de Catálogo: Actualiza precios y disponibilidad al instante.' },
  { icon: LayoutDashboard, text: 'Monitor de Pedidos: Recepción y despacho sincronizado.' },
  { icon: BarChart2, text: 'Analítica Avanzada: Conoce tu volumen de ventas y horas pico.' },
]

export default function Slide07Dashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center overflow-hidden px-10 py-10 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-2 font-medium">
            07 — Herramienta
          </p>
          <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            Panel del Aliado
          </h2>
          <div className="mt-3 divider-gold w-20" />
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="font-jakarta font-semibold text-white/80 text-lg leading-snug">
            Control total de tu menú y{' '}
            <span className="gradient-gold-text">métricas en tiempo real.</span>
          </p>
          <p className="font-inter text-white/40 text-sm mt-1 leading-relaxed max-w-xl">
            Toma las riendas de tu negocio operativo digital desde un único centro de comando web o tablet.
          </p>
        </motion.div>

        {/* Feature chips — compact horizontal */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg card-glass text-xs font-inter text-white/55"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <Icon size={12} style={{ color: '#C9A84C' }} strokeWidth={1.5} />
                <span>{f.text}</span>
              </div>
            )
          })}
        </motion.div>

        {/* Dashboard mockup — Image replacement */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden flex-shrink-0"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 0 60px rgba(201,168,76,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
            height: 'min(280px, 36vh)',
          }}
        >
          <img
            src={dashImg}
            alt="MiiP Dashboard Mockup"
            className="w-full h-full object-cover opacity-60"
            style={{
              objectPosition: 'top',
              mixBlendMode: 'screen', // Optionally helps blend with dark background
              filter: 'grayscale(10%)' // Slightly dimmed effect
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
