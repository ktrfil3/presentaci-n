import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Cast, Code2, Layers } from 'lucide-react'
import { useLiveStream } from '../LiveStreamContext'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

const steps = [
  {
    icon: Cast,
    title: 'getDisplayMedia()',
    desc: 'API nativa del navegador — sin librerías externas.',
  },
  {
    icon: Layers,
    title: 'PNG transparente como marco',
    desc: 'El video queda por debajo del frame del iPhone.',
  },
  {
    icon: Code2,
    title: 'Posicionamiento absoluto (CSS)',
    desc: 'top / left / width / height al píxel exacto del PNG.',
  },
]

export default function Slide10LiveMockup() {
  const videoRef = useRef(null)
  const { stream, isStreaming, error, startScreenShare, stopScreenShare } = useLiveStream()

  // Aplicar el stream al elemento <video> una vez que esté montado
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(err => console.error("Auto-play prevented", err))
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
        {/* ── Columna izquierda — Contenido ── */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
              10 — Técnica
            </p>
            <h2
              className="font-jakarta font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Capturar la ventana{' '}
              <span className="gradient-gold-text">En tiempo real</span>
            </h2>
            <div className="mt-4 divider-gold w-24" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="font-jakarta font-semibold text-white/80 text-xl leading-snug">
              "Demostración en vivo{' '}
              <code
                className="text-sm px-2 py-0.5 rounded-md font-mono"
                style={{
                  background: 'rgba(201,168,76,0.12)',
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.25)',
                }}
              >
                MIIP APP 
              </code>{' '}
              Funcionalidad, interfaz y propuesta de valor.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: '#C9A84C' }}
                    strokeWidth={1.5}
                  />
                  <p className="font-inter text-white/55 text-sm leading-relaxed">
                    <span className="text-white/80 font-semibold">{s.title}:</span> {s.desc}
                  </p>
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
              <Smartphone size={13} strokeWidth={1.5} />
              Demo en vivo — sin plugins
            </div>
          </motion.div>
        </div>

        {/* ── Columna derecha — iPhone Mockup interactivo ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-full"
        >
          <div className="flex flex-col items-center gap-5">
            {/* Marco del iPhone */}
            <div
              style={{
                position: 'relative',
                width: '260px',
                height: '520px',
                /* overflow hidden en el contenedor externo: recorta todo al contorno del iPhone */
                overflow: 'hidden',
                borderRadius: '44px',
              }}
            >
              {/* Pantalla — posición y borderRadius exactos al recorte del SVG (x=4,y=4,w=252,h=512,rx=40) */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '4px',
                  width: '252px',
                  height: '512px',
                  borderRadius: '40px',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.85)',
                  zIndex: 1,
                }}
              >
                {/* Video siempre montado; el ref estará disponible antes de asignar srcObject */}
                <video
                  ref={videoRef}
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
                {/* Placeholder visible sólo cuando no hay stream */}
                {!isStreaming && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                    }}
                  >
                    <Smartphone
                      size={36}
                      style={{ color: 'rgba(201,168,76,0.4)' }}
                      strokeWidth={1.2}
                    />
                    <p
                      className="font-inter text-xs text-center px-4"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      La pantalla del iPhone
                      <br />
                      aparecerá aquí
                    </p>
                  </div>
                )}
              </div>


              {/* Marco del iPhone — solo el bisel, pantalla transparente */}
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
                  {/* Forma exterior del iPhone */}
                  <clipPath id="phoneClip">
                    <rect x="0" y="0" width="260" height="520" rx="44" />
                  </clipPath>
                  {/* Zona de pantalla — recorte que se resta del marco */}
                  <mask id="frameMask">
                    {/* Todo blanco = visible */}
                    <rect x="0" y="0" width="260" height="520" fill="white" />
                    {/* Zona de pantalla negra = transparente (el cutout) */}
                    <rect x="4" y="4" width="252" height="512" rx="40" fill="black" />
                  </mask>
                  <linearGradient id="shineG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Bisel del iPhone: solo el borde exterior, pantalla recortada */}
                <rect
                  x="0" y="0" width="260" height="520" rx="44"
                  fill="rgba(28,26,32,0.92)"
                  mask="url(#frameMask)"
                />
                {/* Borde exterior: trazo blanco sutil */}
                <rect
                  x="0.5" y="0.5" width="259" height="519" rx="43.5"
                  stroke="rgba(255,255,255,0.22)" strokeWidth="1"
                  fill="none"
                />
                {/* Borde interior de pantalla */}
                <rect
                  x="4" y="4" width="252" height="512" rx="40"
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1"
                  fill="none"
                />
                {/* Brillo sobre el bisel */}
                <rect
                  x="0" y="0" width="260" height="520" rx="44"
                  fill="url(#shineG)"
                  mask="url(#frameMask)"
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

            {/* Botón de acción */}
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
                  if (videoRef.current) videoRef.current.srcObject = null
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
