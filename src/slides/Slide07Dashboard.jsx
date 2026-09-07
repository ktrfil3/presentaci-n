import { motion } from 'framer-motion'
import { BarChart2, ListOrdered, LayoutDashboard, Monitor } from 'lucide-react'
import aliadosVideo from '../assets/aliados2.mp4'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  { icon: ListOrdered, text: 'Gestión de Catálogo: Actualiza precios y disponibilidad al instante.' },
  { icon: LayoutDashboard, text: 'Monitor de Pedidos: Recepción y despacho sincronizado.' },
  { icon: BarChart2, text: 'Analítica Avanzada: Conoce tu volumen de ventas y horas pico.' },
]

export default function Slide07Dashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* Left column — Content */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              07 — Herramienta
            </p>
            <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Panel del Aliado
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="font-jakarta font-semibold text-white/80 text-xl leading-snug">
              Control total de tu menú y{' '}
              <span className="gradient-gold-text">métricas en tiempo real.</span>
            </p>
            <p className="font-inter text-white/40 text-sm mt-2 leading-relaxed">
              Toma las riendas de tu negocio operativo digital desde un único centro de comando web o tablet.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: '#C9A84C' }}
                    strokeWidth={1.5}
                  />
                  <p className="font-inter text-white/55 text-sm leading-relaxed">{f.text}</p>
                </div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-inter font-medium tracking-wider uppercase"
              style={{
                background: 'rgba(201,168,76,0.06)',
                borderColor: 'rgba(201,168,76,0.2)',
                color: '#C9A84C',
              }}
            >
              <Monitor size={13} strokeWidth={1.5} />
              App Mobile — iOS &amp; Android
            </div>
          </motion.div>
        </div>

        {/* Right column — iPhone mockup con video aliados.MP4 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-full"
        >
          {/* Contenedor iPhone */}
          <div
            style={{
              position: 'relative',
              width: '260px',
              height: '520px',
              overflow: 'hidden',
              borderRadius: '44px',
              /* Halo dorado sutil */
              boxShadow: '0 0 60px rgba(201,168,76,0.18)',
            }}
          >
            {/* Pantalla — coordenadas exactas del recorte SVG (x=11,y=11,w=238,h=498,rx=36) */}
            <div
              style={{
                position: 'absolute',
                top: '11px',
                left: '11px',
                width: '238px',
                height: '498px',
                borderRadius: '36px',
                overflow: 'hidden',
                background: '#000',
                zIndex: 1,
              }}
            >
              <video
                src={aliadosVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  top: '-0.1%',
                  height: '103%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Marco del iPhone — bisel con cutout transparente */}
            <svg
              viewBox="0 0 260 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <defs>
                <mask id="frameMask07">
                  <rect x="0" y="0" width="260" height="520" fill="white" />
                  {/* Recorte de pantalla = zona transparente */}
                  <rect x="11" y="11" width="238" height="498" rx="36" fill="black" />
                </mask>
                <linearGradient id="shineG07" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Bisel: pintado solo en el borde, pantalla recortada */}
              <rect
                x="0" y="0" width="260" height="520" rx="44"
                fill="rgba(28,26,32,0.95)"
                mask="url(#frameMask07)"
              />
              {/* Borde exterior */}
              <rect
                x="0.5" y="0.5" width="259" height="519" rx="43.5"
                stroke="rgba(255,255,255,0.22)" strokeWidth="1"
                fill="none"
              />
              {/* Borde interior pantalla */}
              <rect
                x="11" y="11" width="238" height="498" rx="36"
                stroke="rgba(255,255,255,0.06)" strokeWidth="1"
                fill="none"
              />
              {/* Brillo sobre el bisel */}
              <rect
                x="0" y="0" width="260" height="520" rx="44"
                fill="url(#shineG07)"
                mask="url(#frameMask07)"
              />
              
              {/* Botón lateral derecho (power) */}
              <rect x="259" y="130" width="3" height="60" rx="1.5" fill="rgba(255,255,255,0.15)" />
              {/* Botones laterales izquierdo (volumen) */}
              <rect x="-2" y="118" width="3" height="38" rx="1.5" fill="rgba(255,255,255,0.1)" />
              <rect x="-2" y="166" width="3" height="38" rx="1.5" fill="rgba(255,255,255,0.1)" />
              {/* Mute switch */}
              <rect x="-2" y="90" width="3" height="22" rx="1.5" fill="rgba(255,255,255,0.08)" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
