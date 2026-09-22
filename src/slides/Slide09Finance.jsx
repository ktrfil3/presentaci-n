import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, ArrowDownCircle, Cpu } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const paths = [
  {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    title: 'Monto Exacto',
    desc: 'Orden confirmada en <1 seg.'
  },
  {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    title: 'Pago Incompleto',
    desc: 'Notificación de diferencia + opción de pago en un clic.'
  },
  {
    icon: ArrowDownCircle,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    title: 'Pago en Exceso',
    desc: 'Aprobación inmediata + Devolución de excedente al banco.'
  }
]

export default function Slide09Finance() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gold opacity-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-6xl px-8 flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-inter text-gold-500 text-sm tracking-[0.25em] uppercase mb-4 font-medium flex items-center justify-center gap-2">
            09 — Finanzas
          </p>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-white tracking-tight">
            Validación Inteligente | Conciliación en Tiempo Real
          </h2>
        </motion.div>

        {/* 3-Way Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {paths.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative card-glass p-8 flex flex-col items-center text-center rounded-2xl border ${p.border}`}
            >
              <div className={`mb-6 p-5 rounded-full ${p.bg} border ${p.border}`}>
                <p.icon size={48} className={`${p.color} stroke-[1.5]`} />
              </div>
              
              <h3 className={`font-jakarta font-bold text-2xl mb-3 ${p.color}`}>
                {p.title}
              </h3>
              
              <p className="font-inter text-white/70 text-lg leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
