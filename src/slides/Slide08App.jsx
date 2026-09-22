import { motion } from 'framer-motion'
import { CheckCircle, Smartphone } from 'lucide-react'
import appVideo from '../assets/app2.mp4'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  'Navegación fluida por menús y carritos de compra optimizados para conversión.',
  'Integración directa (Checkout) con Pago Móvil, Zelle y tarjetas para cero fricción.',
  'Seguimiento de órdenes en tiempo real para total tranquilidad del usuario.',
]

// ── iPhone mockup SVG frame (reutilizable) ──────────────────────────────────
function IPhoneFrame({ children, maskId, gradientId, dynamicIsland = false }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '260px',
        height: '520px',
        overflow: 'hidden',
        borderRadius: '44px',
      }}
    >
      {/* Pantalla — coordenadas exactas del cutout SVG */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: '4px',
          width: '252px',
          height: '512px',
          borderRadius: '40px',
          overflow: 'hidden',
          background: '#000',
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Bisel SVG */}
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
          <mask id={maskId}>
            <rect x="0" y="0" width="260" height="520" fill="white" />
            <rect x="4" y="4" width="252" height="512" rx="40" fill="black" />
          </mask>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.12" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="260" height="520" rx="44"
          fill="rgba(28,26,32,0.95)" mask={`url(#${maskId})`} />
        <rect x="0.5" y="0.5" width="259" height="519" rx="43.5"
          stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" />
        <rect x="4" y="4" width="252" height="512" rx="40"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        <rect x="0" y="0" width="260" height="520" rx="44"
          fill={`url(#${gradientId})`} mask={`url(#${maskId})`} />
        {/* Dynamic Island — opcional */}
        {dynamicIsland && (
          <rect x="96" y="14" width="68" height="20" rx="10" fill="rgba(0,0,0,0.98)" />
        )}
        {/* Power */}
        <rect x="259" y="130" width="3" height="60" rx="1.5" fill="rgba(255,255,255,0.15)" />
        {/* Volumen */}
        <rect x="-2" y="118" width="3" height="38" rx="1.5" fill="rgba(255,255,255,0.1)" />
        <rect x="-2" y="166" width="3" height="38" rx="1.5" fill="rgba(255,255,255,0.1)" />
        {/* Mute */}
        <rect x="-2" y="90" width="3" height="22" rx="1.5" fill="rgba(255,255,255,0.08)" />
      </svg>
    </div>
  )
}

// ── Slide 06 ────────────────────────────────────────────────────────────────
export default function Slide08App() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
      >
        {/* ── Columna izquierda — contenido ── */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              08 — Producto
            </p>
            <h2
              className="font-jakarta font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Experiencia del Cliente
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="font-jakarta font-semibold text-white/80 text-xl leading-snug">
              Diseño intuitivo.{' '}
              <span className="gradient-gold-text">Pagos locales nativos.</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: '#C9A84C' }}
                  strokeWidth={1.5}
                />
                <p className="font-inter text-white/55 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
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
              <Smartphone size={13} strokeWidth={1.5} />
              App Mobile — iOS &amp; Android
            </div>
          </motion.div>
        </div>

        {/* ── Columna derecha — mockup de video ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-full"
        >
          <div style={{ position: 'relative', height: '520px', width: '260px' }}>
            <IPhoneFrame maskId="mask06vid" gradientId="grad06vid" dynamicIsland>
              <video
                src={appVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  top: '-0.1%',
                  left: 0,
                  width: '100%',
                  height: '103%',
                  objectFit: 'cover',
                }}
              />
            </IPhoneFrame>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
