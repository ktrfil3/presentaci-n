import { motion } from 'framer-motion'
import { UserPlus, Settings, Rocket } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const nodes = [
  {
    icon: UserPlus,
    phase: 'HOY',
    label: 'Registro Exclusivo',
    text: 'Apertura del registro para la primera cohorte de Aliados Fundadores.',
    active: true,
  },
  {
    icon: Settings,
    phase: 'PRÓXIMAS SEMANAS',
    label: 'Integración y Menú',
    text: 'Configuración técnica de perfiles, carga de inventarios y entrenamiento de uso.',
    active: false,
  },
  {
    icon: Rocket,
    phase: 'LANZAMIENTO',
    label: 'Apertura Masiva',
    text: 'Encendido de la app para consumidores, campañas de marketing y primeras ventas.',
    active: false,
  },
]

// Ancho fijo de cada columna de nodo.
// Los iconos (80px) quedan left-aligned dentro de esta columna.
// Las líneas ocupan el espacio sobrante entre columnas (flex-1).
const NODE_COL_WIDTH = 210 // px

// Línea animada — ocupa flex-1 con margen horizontal
function AnimatedLine({ delay, opacity = 0.75 }) {
  return (
    // flex-1: toma todo el espacio entre columnas de nodo
    // px-4: 16px de margen en cada extremo → línea NO toca los cuadros
    <div className="flex-1 flex items-center px-4">
      <div className="relative h-[2px] w-full overflow-hidden right-[70px] rounded-full">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg,
              rgba(245,166,35,${opacity}) 0%,
              rgba(245,166,35,${(opacity * 0.4).toFixed(2)}) 100%)`,
            originX: 0,
            scaleX: 0,
          }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.33, 1, 0.68, 1],
            delay,
          }}
        />
      </div>
    </div>
  )
}

export default function Slide13Roadmap() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 py-14 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-10"
      >
        {/* ── Header ── */}
        <motion.div variants={itemVariants}>
          <p className="font-inter text-gold-500 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
            13 — Roadmap
          </p>
          <h2
            className="font-jakarta font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            Nuestra Hoja de Ruta
          </h2>
          <div className="mt-4 divider-gold w-24" />
        </motion.div>

        {/* ── Timeline ── */}
        <motion.div variants={itemVariants} className="hidden md:block">
          {/*
           * Estructura de dos filas:
           *
           * FILA 1 — Iconos + líneas (items-center garantiza centrado vertical perfecto)
           *   [col-nodo-210px] [flex-1 línea] [col-nodo-210px] [flex-1 línea] [col-nodo-210px]
           *
           * FILA 2 — Texto (mismas anchos fijos + espaciadores flex-1)
           *   [col-nodo-210px] [flex-1 spacer] [col-nodo-210px] [flex-1 spacer] [col-nodo-210px]
           *
           * El icono (w-20 = 80px) está left-aligned dentro de su columna de 210px.
           * La línea (flex-1) ocupa exactamente el espacio entre columnas.
           * px-4 en cada línea añade 16px de margen a cada extremo.
           */}

          {/* Fila 1: Iconos + líneas */}
          <div className="flex items-center w-full">
            {nodes.map((node, i) => {
              const Icon = node.icon
              return (
                <div key={`icon-${i}`} className="contents">
                  {/* Columna del nodo — ancho fijo */}
                  <div style={{ width: NODE_COL_WIDTH, flexShrink: 0 }}>
                    <div className="relative inline-block">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{
                          background: node.active
                            ? 'linear-gradient(135deg, rgba(245,166,35,0.25), rgba(245,166,35,0.08))'
                            : 'rgba(255,255,255,0.03)',
                          border: node.active
                            ? '1px solid rgba(245,166,35,0.45)'
                            : '1px solid rgba(255,255,255,0.08)',
                          boxShadow: node.active
                            ? '0 0 28px rgba(245,166,35,0.18), inset 0 1px 0 rgba(255,255,255,0.08)'
                            : 'none',
                        }}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.5}
                          style={{ color: node.active ? '#F5A623' : 'rgba(255,255,255,0.2)' }}
                        />
                      </div>

                      {/* Pulso nodo activo */}
                      {node.active && (
                        <div
                          className="absolute inset-0 rounded-2xl animate-ping pointer-events-none"
                          style={{
                            background: 'rgba(245,166,35,0.07)',
                            animationDuration: '2.5s',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Línea animada entre nodos (excepto después del último) */}
                  {i < nodes.length - 1 && (
                    <AnimatedLine
                      delay={i === 0 ? 0.65 : 1.5}
                      opacity={i === 0 ? 0.75 : 0.4}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Fila 2: Texto bajo cada nodo */}
          <div className="flex w-full mt-5">
            {nodes.map((node, i) => (
              <div key={`text-${i}`} className="contents">
                {/* Columna de texto — mismo ancho fijo que la columna del icono */}
                <div style={{ width: NODE_COL_WIDTH, flexShrink: 0 }}>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded text-[9px] font-inter font-bold tracking-[0.18em] uppercase mb-2"
                    style={{
                      background: node.active ? 'rgba(245,166,35,0.12)' : 'rgba(255,255,255,0.04)',
                      color: node.active ? '#F5A623' : 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {node.phase}
                  </span>
                  <h3 className="font-jakarta font-bold text-white text-lg mb-1.5 leading-snug">
                    {node.label}
                  </h3>
                  <p className="font-inter text-white/38 text-sm leading-relaxed">
                    {node.text}
                  </p>
                </div>

                {/* Espaciador — mismo ancho que la línea de arriba */}
                {i < nodes.length - 1 && <div className="flex-1" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Versión mobile: stack vertical */}
        <motion.div variants={itemVariants} className="flex md:hidden flex-col gap-8">
          {nodes.map((node, i) => {
            const Icon = node.icon
            return (
              <div key={i} className="flex flex-col gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{
                    background: node.active ? 'rgba(245,166,35,0.15)' : 'rgba(255,255,255,0.03)',
                    border: node.active ? '1px solid rgba(245,166,35,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon size={22} strokeWidth={1.5} style={{ color: node.active ? '#F5A623' : 'rgba(255,255,255,0.2)' }} />
                </div>
                <div>
                  <span className="text-[9px] font-inter font-bold tracking-widest uppercase"
                    style={{ color: node.active ? '#F5A623' : 'rgba(255,255,255,0.25)' }}
                  >{node.phase}</span>
                  <h3 className="font-jakarta font-bold text-white text-lg mt-1 mb-1">{node.label}</h3>
                  <p className="font-inter text-white/38 text-sm leading-relaxed">{node.text}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
