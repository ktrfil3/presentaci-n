import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Store, LayoutDashboard, Truck, LineChart, Monitor } from 'lucide-react'
import aliadosVideo from '../assets/aliados2.mp4'
import { useLiveStream } from '../LiveStreamContext'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const features = [
  { icon: Store, text: 'Gestión Multi-Sucursal: Menús y stock centralizados por sede.' },
  { icon: LayoutDashboard, text: 'Flujo Operativo: Pedidos codificados por color y montos claros.' },
  { icon: Truck, text: 'Control Logístico: Liberación de orden y reasignación de Miiper.' },
  { icon: LineChart, text: 'Finanzas en Vivo: Dispersión inmediata + Dashboard e Informes Semanales.' },
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
        boxShadow: '0 0 60px rgba(201,168,76,0.18)',
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

export default function Slide10Dashboard() {
  const streamVideoRef = useRef(null)
  const { stream, isStreaming, error, startScreenShare, stopScreenShare } = useLiveStream()

  useEffect(() => {
    if (streamVideoRef.current && stream) {
      streamVideoRef.current.srcObject = stream
      streamVideoRef.current.play().catch(err => console.error("Auto-play prevented", err))
    }
  }, [stream])

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
              10 — Herramienta
            </p>
            <h2 className="font-jakarta font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Panel del Aliado Miip
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
          <div className="flex flex-col items-center gap-5">
            <div style={{ position: 'relative', height: '520px', width: '260px' }}>
              <IPhoneFrame maskId="mask09vid" gradientId="grad09vid" dynamicIsland>
                {!isStreaming && (
                  <video
                    src={aliadosVideo}
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
                )}
                
                <video
                  ref={streamVideoRef}
                  autoPlay
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '105%',
                    top: '-2.4%',
                    objectFit: 'cover',
                    display: isStreaming ? 'block' : 'none',
                  }}
                />
              </IPhoneFrame>
            </div>

            {/* Botones de conexión */}
            {!isStreaming ? (
              <motion.button
                onClick={startScreenShare}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="font-inter font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #F5D98B)',
                  color: '#1a1208',
                  boxShadow: '0 0 24px rgba(201,168,76,0.35)',
                }}
              >
                Conectar iPhone
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  stopScreenShare()
                  if (streamVideoRef.current) streamVideoRef.current.srcObject = null
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="font-inter font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Detener captura
              </motion.button>
            )}

            {error && (
              <p className="font-inter text-xs" style={{ color: 'rgba(255,100,100,0.7)' }}>
                {error}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
