import { motion } from 'framer-motion'
import { Route, MapPin, Heart, Zap, ShieldCheck, Navigation } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const mockupVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

const mapVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, delay: 0.5 } }
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 2, ease: "easeInOut", delay: 1 } 
  }
}

const features = [
  { icon: Route, title: 'Rutas Múltiples', desc: 'Hasta 3 pedidos por mismo local o zona.' },
  { icon: MapPin, title: 'Navegación Nativa', desc: 'Mapa integrado sin apps externas.' },
  { icon: Heart, title: 'Impacto Social', desc: '100% de la carrera para el Miiper (0% comisión).' },
  { icon: Zap, title: 'Cobro Instantáneo', desc: 'Liquidación automática por orden entregada.' },
]

export default function Slide11Logistics() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* Left — iPhone 17 Pro Max Mockup */}
        <motion.div variants={mockupVariants} className="flex items-center justify-center relative">
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gold-500/10 blur-[80px] rounded-full scale-75" />

          <div className="relative" style={{ width: 300, height: 615 }}>
            {/* Hardware Buttons */}
            {/* Action Button */}
            <div className="absolute left-[-3px] top-[110px] w-[3px] h-[22px] bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-md shadow-sm" />
            {/* Volume Up */}
            <div className="absolute left-[-3px] top-[150px] w-[3px] h-[45px] bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-md shadow-sm" />
            {/* Volume Down */}
            <div className="absolute left-[-3px] top-[210px] w-[3px] h-[45px] bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-md shadow-sm" />
            {/* Power Button */}
            <div className="absolute right-[-3px] top-[170px] w-[3px] h-[65px] bg-gradient-to-l from-zinc-700 to-zinc-400 rounded-r-md shadow-sm" />

            {/* Titanium Frame */}
            <div className="absolute inset-0 rounded-[3.25rem] bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-300 p-[2px] shadow-[inset_0_0_4px_rgba(255,255,255,0.5),0_25px_50px_-12px_rgba(0,0,0,0.8)]">
              {/* Inner Bezel */}
              <div className="absolute inset-[2px] rounded-[3.1rem] bg-black p-[5px]">
                {/* Screen */}
                <div className="relative w-full h-full rounded-[2.85rem] bg-[#111] overflow-hidden flex flex-col">
                  
                  {/* Dynamic Island */}
                  <motion.div 
                    initial={{ width: 100 }}
                    animate={{ width: 110 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                    className="absolute top-2 left-1/2 -translate-x-1/2 h-7 bg-black rounded-full z-40 flex items-center justify-between px-2 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                  </motion.div>

                  {/* Status Bar */}
                  <div className="absolute top-3 w-full px-7 flex justify-between items-center z-30 text-[10px] font-medium text-white/90">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-white/50" />
                      <div className="w-4 h-2.5 bg-white rounded-sm" />
                    </div>
                  </div>

                  {/* Simulated Map Background */}
                  <motion.div variants={mapVariants} className="absolute inset-0 z-0">
                    {/* Dark map gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#1a1a1a] to-[#111]" />
                    
                    {/* Grid */}
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                      }}
                    />

                    {/* Animated Route path */}
                    <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.path 
                        variants={pathVariants}
                        d="M 25 75 Q 45 55 40 35 T 75 25" 
                        fill="none" 
                        stroke="#C9A84C" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4" 
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Nodes */}
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
                      className="absolute top-[23%] left-[73%] w-5 h-5 rounded-full bg-gold-500 border-[3px] border-black flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.6)] z-10" 
                    />
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: 'spring' }}
                      className="absolute top-[33%] left-[38%] w-3 h-3 rounded-full bg-white border-[2px] border-black z-10" 
                    />
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
                      className="absolute top-[73%] left-[23%] w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-black z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    >
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    </motion.div>
                    
                    {/* Radar Pulse on active driver */}
                    <motion.div
                      animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute top-[73%] left-[23%] w-5 h-5 rounded-full bg-emerald-500/50 z-0"
                    />
                  </motion.div>

                  {/* Top Overlay */}
                  <div className="relative z-20 w-full pt-12 pb-6 px-5 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5 shadow-inner">
                          <ShieldCheck size={18} className="text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Estado</div>
                          <div className="text-white font-semibold text-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En Ruta
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Ganancia</div>
                        <div className="text-gold-400 font-bold text-lg leading-none mt-1">$45.00</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Interactive Card */}
                  <div className="relative z-20 mt-auto p-4 w-full">
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.8, type: 'spring', bounce: 0.3 }}
                      className="w-full bg-zinc-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden relative"
                    >
                      {/* Glass glare */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-white font-bold text-sm block">Múltiple (2 pedidos)</span>
                          <span className="text-white/50 text-[10px] mt-0.5 block">McDonald's & KFC</span>
                        </div>
                        <span className="text-gold-400 font-black text-sm bg-gold-500/10 px-2 py-1 rounded-md">$6.50</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-medium">
                          <Navigation size={12} className="text-gold-500" /> 1.2 km rest.
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-medium">
                          <MapPin size={12} className="text-white/40" /> ~12 min
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-11 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold text-sm shadow-[0_0_15px_rgba(201,168,76,0.3)] flex items-center justify-center gap-2"
                      >
                        Aceptar Ruta
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-50" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Content from Slide13 */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              11 — Logística
            </p>
            <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Red Miiper |{' '}
              <span className="gradient-gold-text">Deliverys</span>
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shadow-[0_0_15px_rgba(201,168,76,0.1)]">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-white mb-0.5">{f.title}</h3>
                  <p className="font-inter text-white/60 text-sm leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
