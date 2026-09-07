import { motion } from 'framer-motion'
import { TrendingDown, EyeOff, Truck } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const cards = [
  {
    icon: TrendingDown,
    label: 'Comisiones Ahogantes',
    text: 'Hasta un 30% de tu margen de ganancia desaparece en manos de intermediarios, haciendo insostenible el crecimiento a largo plazo.',
    accent: 'rgba(201,168,76,0.1)',
    iconColor: '#C9A84C',
  },
  {
    icon: EyeOff,
    label: 'Pérdida de Control',
    text: 'Desconexión total con tu cliente final. Pierdes el control sobre la experiencia de usuario y el acceso a tus propios datos de venta.',
    accent: 'rgba(124,28,42,0.15)',
    iconColor: '#E87070',
  },
  {
    icon: Truck,
    label: 'Incertidumbre Logística',
    text: 'Tiempos de entrega impredecibles, flotas sin supervisión directa y una cadena de suministro que daña la reputación de tu producto.',
    accent: 'rgba(201,168,76,0.06)',
    iconColor: '#9CA3AF',
  },
]

export default function Slide02Problem() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col h-full justify-center gap-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
            02 — Diagnóstico
          </p>
          <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            El Diagnóstico Actual
          </h2>
          <div className="mt-4 divider-gold w-24" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-glass card-glass-hover rounded-2xl p-8 md:p-10 min-h-[320px] flex flex-col relative overflow-hidden"
                style={{ boxShadow: `inset 0 0 60px ${card.accent}` }}
              >
                {/* Number watermark */}
                <span
                  className="absolute top-4 right-5 font-jakarta font-black text-6xl leading-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.03)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${card.accent}`, border: `1px solid ${card.iconColor}25` }}
                >
                  <Icon size={20} style={{ color: card.iconColor }} strokeWidth={1.5} />
                </div>

                <h3 className="font-jakarta font-bold text-white text-xl mb-3 leading-snug">
                  {card.label}
                </h3>
                <p className="font-inter text-white/45 text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
