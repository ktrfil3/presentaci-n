import { motion } from 'framer-motion'
import { ShoppingBag, Wallet, Truck } from 'lucide-react'

export default function Slide05Fusion() {
  const cards = [
    { icon: ShoppingBag, xOffset: -400, label: 'Ventas' },
    { icon: Wallet, xOffset: 0, label: 'Finanzas' },
    { icon: Truck, xOffset: 400, label: 'Logística' }
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background container for merging */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full max-w-5xl h-[400px] flex items-center justify-center z-20">
        
        {/* Animated Cards */}
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ x: c.xOffset, opacity: 1, scale: 1 }}
            animate={{ 
              x: 0, 
              opacity: [1, 1, 0],
              scale: [1, 1, 0.4],
            }}
            transition={{ 
              duration: 2.2, 
              times: [0, 0.4, 1], // Wait at positions, move to center, shrink & fade
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.5
            }}
            className="absolute w-[300px] h-[340px] card-glass rounded-2xl border border-white/10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md"
          >
            <c.icon size={64} className="text-white/70 stroke-[1.5] mb-6" />
            <span className="font-jakarta font-semibold text-2xl text-white/70">{c.label}</span>
          </motion.div>
        ))}

        {/* Central glowing orb that appears when they merge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1, 1.1] }}
          transition={{ 
            duration: 2.8, 
            times: [0, 0.7, 0.9, 1], 
            ease: "easeOut", 
            delay: 0.5 
          }}
          className="absolute w-40 h-40 rounded-full bg-gold-500 shadow-[0_0_120px_rgba(201,168,76,0.8)] flex items-center justify-center mix-blend-screen"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full bg-white opacity-50 blur-md" 
          />
        </motion.div>
      </div>

      {/* Main Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-30 mt-80 text-center flex flex-col items-center"
      >
        <p className="font-inter text-gold-500 text-sm tracking-[0.25em] uppercase mb-6 font-medium">
          05 — Fusión
        </p>
        <h2 className="font-jakarta font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          No son tres herramientas separadas...
        </h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="mt-6"
        >
          <span className="gradient-gold-text text-3xl md:text-4xl font-semibold tracking-wide">
            Es un solo motor unificado.
          </span>
        </motion.div>
      </motion.div>

    </div>
  )
}
