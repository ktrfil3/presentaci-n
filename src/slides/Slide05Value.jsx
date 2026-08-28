import { motion } from 'framer-motion'
import { ShieldCheck, Zap, MapPin } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const pillars = [
  {
    num: '01',
    icon: ShieldCheck,
    label: 'ECONOMÍA JUSTA',
    text: 'Estructuras de costos transparentes y comisiones mínimas diseñadas para proteger y maximizar tus márgenes sostenibles.',
    iconColor: '#C9A84C',
    gradientFrom: 'rgba(201,168,76,0.06)',
  },
  {
    num: '02',
    icon: Zap,
    label: 'EXPERIENCIA IMPECABLE',
    text: 'Velocidad y simplicidad absolutas. Una interfaz de usuario premium pensada para que tus clientes compren sin fricciones.',
    iconColor: '#A78BFA',
    gradientFrom: 'rgba(167,139,250,0.06)',
  },
  {
    num: '03',
    icon: MapPin,
    label: 'TECNOLOGÍA LOCAL',
    text: 'Plataforma adaptada a la realidad del mercado, con integración profunda a métodos de pago locales y soporte técnico dedicado.',
    iconColor: '#6EE7B7',
    gradientFrom: 'rgba(110,231,183,0.06)',
  },
]

export default function Slide05Value() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
            05 — Propuesta
          </p>
          <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
            Nuestros Pilares
          </h2>
          <div className="mt-4 divider-gold w-24" />
        </motion.div>

        {/* Pillar blocks */}
        <div className="flex flex-col gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-glass card-glass-hover rounded-2xl p-6 flex items-center gap-7 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${p.gradientFrom} 0%, rgba(255,255,255,0.02) 100%)`,
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
              >
                {/* Number */}
                <div className="hidden md:flex shrink-0 w-14 h-14 items-center justify-center">
                  <span
                    className="font-jakarta font-black text-4xl leading-none"
                    style={{ color: `${p.iconColor}20` }}
                  >
                    {p.num}
                  </span>
                </div>

                {/* Icon block */}
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${p.iconColor}12`,
                    border: `1px solid ${p.iconColor}25`,
                  }}
                >
                  <Icon size={22} style={{ color: p.iconColor }} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-inter text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: p.iconColor }}>
                      {p.num}
                    </span>
                    <div className="h-px flex-1 max-w-6" style={{ background: `${p.iconColor}30` }} />
                    <h3 className="font-jakarta font-bold text-white text-base md:text-lg tracking-wide">
                      {p.label}
                    </h3>
                  </div>
                  <p className="font-inter text-white/45 text-sm leading-relaxed">
                    {p.text}
                  </p>
                </div>

                {/* Accent bar left */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
                  style={{ background: `linear-gradient(180deg, ${p.iconColor}60, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
