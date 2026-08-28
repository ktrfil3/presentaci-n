import { motion } from 'framer-motion'
import { Percent, Gift, Headphones } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const offers = [
  {
    icon: Percent,
    label: 'Comisión Preferencial',
    text: 'Tarifa especial y altamente competitiva garantizada por tus primeros 6 meses de operación en la plataforma.',
    tag: 'Exclusivo Fundadores',
    glow: 'rgba(201,168,76,0.15)',
    iconColor: '#C9A84C',
    borderColor: 'rgba(201,168,76,0.3)',
  },
  {
    icon: Gift,
    label: 'Onboarding sin Costo',
    text: 'Cero tarifas de integración. Subimos tu menú, configuramos tu perfil y te preparamos para vender gratis.',
    tag: '$0 Inversión Inicial',
    glow: 'rgba(167,139,250,0.12)',
    iconColor: '#A78BFA',
    borderColor: 'rgba(167,139,250,0.25)',
  },
  {
    icon: Headphones,
    label: 'Soporte 1-a-1',
    text: 'Acompañamiento en sitio y soporte técnico prioritario y directo. Nunca estarás hablando con un bot.',
    tag: 'Humano, siempre',
    glow: 'rgba(110,231,183,0.1)',
    iconColor: '#6EE7B7',
    borderColor: 'rgba(110,231,183,0.2)',
  },
]

export default function Slide09Offer() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
            09 — Oferta
          </p>
          <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
            Programa Aliados Fundadores
          </h2>
          <div className="mt-4 divider-gold w-24" />
        </motion.div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative rounded-2xl p-7 flex flex-col gap-4 cursor-default overflow-hidden transition-all duration-300"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${o.glow} 0%, rgba(255,255,255,0.03) 60%)`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                  boxShadow: '0 0 0 transparent',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 40px ${o.glow}, 0 0 80px ${o.glow.replace('0.1', '0.05').replace('0.12', '0.06').replace('0.15', '0.08')}`,
                  borderColor: o.borderColor,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Tag */}
                <div
                  className="self-start px-3 py-1 rounded-full text-[10px] font-inter font-semibold tracking-wider uppercase"
                  style={{
                    background: `${o.iconColor}15`,
                    color: o.iconColor,
                    border: `1px solid ${o.iconColor}30`,
                  }}
                >
                  {o.tag}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${o.iconColor}10`,
                    border: `1px solid ${o.iconColor}20`,
                  }}
                >
                  <Icon size={22} style={{ color: o.iconColor }} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-jakarta font-bold text-white text-xl mb-2">{o.label}</h3>
                  <p className="font-inter text-white/45 text-sm leading-relaxed">{o.text}</p>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${o.iconColor}50, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
