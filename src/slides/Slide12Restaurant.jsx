import { motion } from 'framer-motion'
import { Store, LayoutDashboard, Truck, LineChart, Bell } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const mockupVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  { icon: Store, title: 'Gestión Multi-Sucursal', desc: 'Menús y stock centralizados por sede.' },
  { icon: LayoutDashboard, title: 'Flujo Operativo', desc: 'Pedidos codificados por color y montos claros.' },
  { icon: Truck, title: 'Control Logístico', desc: 'Liberación de orden y reasignación de Miiper.' },
  { icon: LineChart, title: 'Finanzas en Vivo', desc: 'Dispersión inmediata + Dashboard e Informes Semanales.' },
]

export default function Slide12Restaurant() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-radial-wine opacity-20" />

      <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          <motion.p variants={itemVariants} className="font-inter text-gold-500 text-sm tracking-[0.25em] uppercase mb-4 font-medium">
            12 — Aliados
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-jakarta font-bold text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-12">
            Vista Restaurante |<br />
            <span className="gradient-gold-text">Control y Liquidez</span>
          </motion.h2>

          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-400">
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

        {/* Right: Mockup Tablet/POS */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="show"
          className="relative w-full aspect-[4/3] rounded-3xl border-4 border-white/10 bg-black overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Topbar */}
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-wine-500/80" />
              <span className="text-white font-semibold">Burger Station - Sede Norte</span>
            </div>
            <div className="flex gap-4 text-white/50">
              <Bell size={20} />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex p-6 gap-6 bg-zinc-950/50">
            {/* Sidebar */}
            <div className="w-48 flex flex-col gap-3">
              <div className="h-10 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center px-4 text-gold-400 font-medium text-sm">Órdenes (5)</div>
              <div className="h-10 rounded-lg bg-white/5 flex items-center px-4 text-white/50 font-medium text-sm">Menú & Stock</div>
              <div className="h-10 rounded-lg bg-white/5 flex items-center px-4 text-white/50 font-medium text-sm">Finanzas</div>
            </div>
            
            {/* Orders List */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/30 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center"><span className="text-emerald-400 font-bold text-lg">#1402</span><span className="text-white/40 text-sm">12:30 PM</span></div>
                  <div className="text-white font-medium text-xl">$14.50</div>
                  <div className="text-emerald-400/80 text-sm flex items-center gap-1"><CheckCircle2 size={14}/> Pagado & Confirmado</div>
                </div>
                <div className="h-32 rounded-xl bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center"><span className="text-amber-400 font-bold text-lg">#1403</span><span className="text-white/40 text-sm">12:35 PM</span></div>
                  <div className="text-white font-medium text-xl">$22.00</div>
                  <div className="text-amber-400/80 text-sm flex items-center gap-1"><AlertTriangle size={14}/> Esperando Rider</div>
                </div>
              </div>
              
              <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col">
                <div className="text-white/70 font-semibold mb-4">Balance Hoy (Dispersión Inmediata)</div>
                <div className="text-4xl text-white font-bold mb-2">$845.50</div>
                <div className="text-emerald-400 text-sm">+12% vs ayer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function CheckCircle2(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
}
function AlertTriangle(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
}
