import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Route, MapPin, Heart, Zap, ShieldCheck, Navigation } from 'lucide-react'
import { useLiveStream } from '../LiveStreamContext'

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

export default function Slide11Logistics() {
  const streamVideoRef = useRef(null)
  const { stream, isStreaming, error, startScreenShare, stopScreenShare } = useLiveStream('slide11')

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
        {/* Left — iPhone 17 Pro Max Mockup */}
        <motion.div variants={mockupVariants} className="flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-5">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gold-500/10 blur-[80px] rounded-full scale-75" />

            <div style={{ position: 'relative', height: '520px', width: '260px' }}>
              <IPhoneFrame maskId="mask11vid" gradientId="grad11vid" dynamicIsland>
                {!isStreaming && (
                  <video
                    src="/0930.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: 'absolute',
                      top: '-0.1%',
                      left: '0.9%',
                      width: '99.5%',
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

        {/* Right — Content from Slide13 */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
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
