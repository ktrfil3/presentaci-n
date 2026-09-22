import { motion } from 'framer-motion'
import { Navigation, Clock, Package, Bike } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const stats = [
  { icon: Bike, label: 'Repartidores Activos', val: 'Red Local' },
  { icon: Clock, label: 'Tiempo de Asignación', val: '< 90 seg' },
  { icon: Package, label: 'Estado del Pedido', val: 'Tiempo Real' },
]

export default function Slide14Logistics() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* Left — Map simulation */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: '100%',
              maxWidth: 440,
              aspectRatio: '4/3',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 80px rgba(201,168,76,0.07)',
            }}
          >
            {/* Fake map grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* "Roads" */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/[0.06]" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/[0.06]" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/[0.06]" />
            </div>

            {/* Rider dots */}
            {[
              { top: '25%', left: '20%', active: true },
              { top: '55%', left: '60%', active: false },
              { top: '70%', left: '30%', active: true },
              { top: '20%', left: '75%', active: false },
              { top: '45%', left: '45%', active: true },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center"
                style={{ top: d.top, left: d.left, transform: 'translate(-50%,-50%)' }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: d.active ? '#C9A84C' : 'rgba(255,255,255,0.15)',
                    boxShadow: d.active ? '0 0 12px rgba(201,168,76,0.7)' : 'none',
                  }}
                />
                {d.active && (
                  <div
                    className="absolute w-6 h-6 rounded-full animate-ping"
                    style={{ background: 'rgba(201,168,76,0.2)' }}
                  />
                )}
              </div>
            ))}

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }}>
              <path
                d="M 80 180 Q 160 120 220 160 T 340 130"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div
                className="px-4 py-1.5 rounded-full text-[9px] font-inter tracking-widest uppercase font-medium"
                style={{
                  background: 'rgba(9,9,11,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'rgba(201,168,76,0.7)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Mapa de Cobertura
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Content */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              14 — Operación
            </p>
            <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Logística Inteligente
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Navigation size={18} style={{ color: '#C9A84C' }} strokeWidth={1.5} />
            <p className="font-jakarta font-semibold text-white/80 text-lg">
              Rutas Inteligentes ={' '}
              <span className="gradient-gold-text">Entregas Eficientes</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="font-inter text-white/45 text-sm leading-relaxed">
              Nuestro algoritmo de asignación mapea la red de repartidores en la ciudad para garantizar que el motorizado más cercano y adecuado atienda tu pedido, reduciendo los tiempos de espera y garantizando que el producto llegue en condiciones óptimas.
            </p>
          </motion.div>

          {/* Stat badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className="card-glass rounded-xl p-4 flex flex-col gap-2"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon size={14} style={{ color: '#C9A84C', opacity: 0.6 }} strokeWidth={1.5} />
                  <p className="font-jakarta font-bold text-white text-sm">{s.val}</p>
                  <p className="font-inter text-white/30 text-[10px] tracking-wider uppercase">{s.label}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
