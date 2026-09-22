import { motion } from 'framer-motion'
import { Route, MapPin, Heart, Zap, ShieldCheck } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const mockupVariants = {
  hidden: { opacity: 0, x: 50, y: 20, rotate: -5 },
  show: { opacity: 1, x: 0, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  { icon: Route, title: 'Rutas Múltiples', desc: 'Hasta 3 pedidos por mismo local o zona.' },
  { icon: MapPin, title: 'Navegación Nativa', desc: 'Mapa integrado sin apps externas.' },
  { icon: Heart, title: 'Impacto Social', desc: '100% de la carrera para el Miiper (0% comisión).' },
  { icon: Zap, title: 'Cobro Instantáneo', desc: 'Liquidación automática por orden entregada.' },
]

export default function Slide13Miipers() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-radial-gold opacity-10" />

      <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          <motion.p variants={itemVariants} className="font-inter text-gold-500 text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            13 — Logística
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-jakarta font-bold text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-12">
            Red Miiper |<br />
            <span className="gradient-gold-text">100% Transparencia</span>
          </motion.h2>

          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                  <f.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-jakarta font-bold text-xl text-white mb-1">{f.title}</h3>
                  <p className="font-inter text-white/60 text-lg leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Phone Mockup */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-[320px] h-[650px] rounded-[2.5rem] border-[4px] border-zinc-900 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-zinc-900 rounded-full z-30" />

          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[#1a1a1a] z-0">
            {/* Grid to look like map */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />
            {/* Route path */}
            <svg className="absolute inset-0 w-full h-full text-gold-500/50" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 20 80 Q 50 60 40 40 T 70 20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
            </svg>
            <div className="absolute top-[18%] left-[65%] w-6 h-6 rounded-full bg-gold-500 border-4 border-black flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.5)] z-10" />
            <div className="absolute top-[38%] left-[38%] w-4 h-4 rounded-full bg-white border-2 border-black z-10" />
            <div className="absolute top-[78%] left-[18%] w-6 h-6 rounded-full bg-wine-500 border-4 border-black z-10" />
          </div>

          {/* App Header Overlay */}
          <div className="relative z-20 w-full h-24 bg-gradient-to-b from-black/80 to-transparent flex items-start px-6 pt-10">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <div className="ml-auto text-right">
              <div className="text-white/60 text-xs font-medium">Ganancia Hoy</div>
              <div className="text-gold-400 font-bold text-xl">$45.00</div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="relative z-20 mt-auto p-4">
            <div className="w-full bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-bold text-lg">Múltiple (2 pedidos)</span>
                <span className="text-gold-400 font-bold text-lg">$6.50</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
                <MapPin size={16} /> 1.2 km total • ~12 min
              </div>
              <button className="w-full h-12 rounded-xl bg-gold-500 text-black font-bold text-lg hover:bg-gold-400 transition-colors">
                Aceptar Ruta
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
