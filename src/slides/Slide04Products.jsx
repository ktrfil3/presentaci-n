import { motion } from 'framer-motion'
import { ShoppingBag, Wallet, Truck } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const products = [
  {
    icon: ShoppingBag,
    title: 'Canal de ventas',
    subtitle: 'Para el cliente.',
    color: 'from-wine-500/30 to-transparent',
    border: 'border-wine-500/40'
  },
  {
    icon: Wallet,
    title: 'Motor financiero',
    subtitle: 'Para la caja.',
    color: 'from-gold-500/30 to-transparent',
    border: 'border-gold-500/40'
  },
  {
    icon: Truck,
    title: 'Red logística',
    subtitle: 'Para la cocina.',
    color: 'from-white/20 to-transparent',
    border: 'border-white/20'
  }
]

export default function Slide04Products() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-wine opacity-40 mix-blend-screen" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-6xl px-8"
      >
        <motion.p
          variants={cardVariants}
          className="text-center font-inter text-gold-500 text-sm tracking-[0.25em] uppercase mb-20 font-medium"
        >
          04 — Productos
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`relative card-glass p-12 flex flex-col items-center text-center rounded-2xl border ${p.border} overflow-hidden group hover:-translate-y-2 transition-transform duration-500`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 mb-8 p-6 rounded-full bg-white/5 border border-white/10 shadow-xl">
                <p.icon size={56} className="text-white/90 stroke-[1.5]" />
              </div>
              
              <h3 className="relative z-10 font-jakarta font-bold text-3xl text-white mb-4 tracking-tight">
                {p.title}
              </h3>
              
              <p className="relative z-10 font-inter text-white/60 text-xl font-light">
                {p.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
