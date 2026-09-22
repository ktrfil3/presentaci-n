import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MiipLogo from "../MiipLogo"
import hyperspaceAudio from "../assets/468.mp3"

const PALETTE = [
  "#C8102E","#B50D27","#E31F2C","#D01025",
  "#F5A623","#F5D98B","#FFD700","#FFC125",
  "#F9F4E8","#FFFFFF","#FFFBE0",
]

const T_RAMP  = 800
const T_PEAK  = 3000
const T_DECEL = 3800
const T_END   = 5000
const T_LOGO  = 4000
const MAX_STARS = 900

function makeStar() {
  const z = Math.random() * 0.95 + 0.05
  return {
    angle:      Math.random() * Math.PI * 2,
    dist:       Math.random() * 0.08 + 0.002,
    z,
    speed:      (Math.random() * 0.6 + 0.4) * (1.3 - z * 0.7),
    color:      PALETTE[Math.floor(Math.random() * PALETTE.length)],
    baseAlpha:  Math.random() * 0.60 + 0.25,
    streakBase: Math.random() * 1.8 + 0.5,
    baseSize:   (Math.random() * 1.3 + 0.3) * (2.6 - z),
  }
}

function updateStar(star, dt, warp) {
  star.dist += warp * dt * 0.0028 * star.speed
  star.z    -= warp * dt * 0.00014 * star.speed
  return (star.dist < 1.35 && star.z > 0) ? star : null
}

function drawStar(ctx, star, cx, cy, warp) {
  const perspective = 1 / (star.z + 0.15)
  const maxR      = Math.hypot(cx, cy) * 1.5 * perspective
  const r         = star.dist * maxR
  const streakLen = (0.011 + warp * 0.026) * star.streakBase * perspective
  const rPrev     = Math.max(0, (star.dist - streakLen) * maxR)
  const x  = cx + Math.cos(star.angle) * r
  const y  = cy + Math.sin(star.angle) * r
  const xP = cx + Math.cos(star.angle) * rPrev
  const yP = cy + Math.sin(star.angle) * rPrev
  const distFade    = Math.min(1, star.dist * 5.5)
  const depthBright = Math.min(1.5, perspective * 0.55)
  const alpha       = distFade * star.baseAlpha * depthBright
  if (alpha < 0.012) return
  const grad = ctx.createLinearGradient(xP, yP, x, y)
  grad.addColorStop(0,   "transparent")
  grad.addColorStop(0.5, star.color + "70")
  grad.addColorStop(1,   star.color)
  const lineW = Math.max(0.3, star.baseSize * Math.min(2.8, perspective * 0.85))
  ctx.save()
  ctx.globalAlpha = Math.min(1, alpha)
  ctx.strokeStyle = grad
  ctx.lineWidth   = lineW
  ctx.lineCap     = "round"
  ctx.shadowColor = star.color
  ctx.shadowBlur  = lineW * 5 * Math.max(0.3, warp)
  ctx.beginPath()
  ctx.moveTo(xP, yP)
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.restore()
}

function drawStarFrozen(ctx, star, cx, cy) {
  const perspective = 1 / (star.z + 0.15)
  const maxR = Math.hypot(cx, cy) * 1.45 * perspective
  const r    = Math.min(star.dist, 0.95) * maxR
  const x    = cx + Math.cos(star.angle) * r
  const y    = cy + Math.sin(star.angle) * r
  const size = Math.max(0.5, star.baseSize * 0.4 * Math.min(1.6, perspective * 0.5))
  ctx.save()
  ctx.globalAlpha = Math.min(0.65, star.baseAlpha * 0.7)
  ctx.fillStyle   = star.color
  ctx.shadowColor = star.color
  ctx.shadowBlur  = size * 3
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// Zoom-blur radial: dibuja el canvas src escalado desde el centro N veces
// con opacidad decreciente. Centro nítido, bordes difuminados = sensación de velocidad.
function applyZoomBlur(src, dstCtx, cx, cy, W, H, warp) {
  if (warp < 0.06) return
  const LAYERS   = 9
  const MAX_ZOOM = 0.025 * warp
  for (let i = 1; i <= LAYERS; i++) {
    const t     = i / LAYERS
    const scale = 1 + MAX_ZOOM * t
    const alpha = 0.075 * (1 - t) * warp
    dstCtx.save()
    dstCtx.globalAlpha = alpha
    dstCtx.globalCompositeOperation = "lighter"
    dstCtx.translate(cx, cy)
    dstCtx.scale(scale, scale)
    dstCtx.translate(-cx, -cy)
    dstCtx.drawImage(src, 0, 0, W, H)
    dstCtx.restore()
  }
}

function drawRings(ctx, cx, cy, t, warp) {
  if (warp < 0.04) return
  const R = Math.min(cx, cy) * 2.4
  for (let i = 0; i < 12; i++) {
    const phase = (t * 0.22 + i / 12) % 1
    const r     = phase * R
    const a     = (1 - phase) * 0.10 * warp
    const ci    = i % 3
    const c     = ci === 0 ? "#C8102E" : ci === 1 ? "#F5A623" : "#F5D98B"
    ctx.save()
    ctx.globalAlpha = a
    ctx.strokeStyle = c
    ctx.lineWidth   = 0.8 + (1 - phase) * 1.8
    ctx.shadowColor = c
    ctx.shadowBlur  = 14
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
}

function drawGlow(ctx, cx, cy, warp) {
  if (warp < 0.02) return
  const r = 200 * warp
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0,    `rgba(255,215,80,${0.50 * warp})`)
  g.addColorStop(0.25, `rgba(245,166,35,${0.32 * warp})`)
  g.addColorStop(0.55, `rgba(200,16,46,${0.16 * warp})`)
  g.addColorStop(1,    "transparent")
  ctx.save()
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawVignette(ctx, cx, cy, W, H, strength) {
  if (strength < 0.05) return
  const r = Math.hypot(cx, cy) * 1.1
  const g = ctx.createRadialGradient(cx, cy, r * 0.30, cx, cy, r)
  g.addColorStop(0, "transparent")
  g.addColorStop(1, `rgba(2,2,5,${0.80 * Math.min(1, strength * 1.2)})`)
  ctx.save()
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  ctx.restore()
}

export default function Slide06Brand() {
  const canvasRef   = useRef(null)
  const offRef      = useRef(null)
  const starsRef    = useRef([])
  const rafRef      = useRef(null)
  const t0Ref       = useRef(null)
  const ringTRef    = useRef(0)
  const frozenRef   = useRef(false)
  const audioRef    = useRef(null)
  const [showLogo, setShowLogo] = useState(false)
  const showLogoRef = useRef(false)

  // ── Efecto de sonido hyperspace ──────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(hyperspaceAudio)
    audio.volume = 0
    audio.loop   = false
    audioRef.current = audio

    // Fade-in suave al inicio
    const play = audio.play()
    if (play !== undefined) {
      play.catch(() => {}) // silenciar rechazo por política autoplay
    }

    let vol = 0
    const fadeIn = setInterval(() => {
      vol = Math.min(1, vol + 0.04)
      audio.volume = vol
      if (vol >= 1) clearInterval(fadeIn)
    }, 60)

    // Fade-out antes del logo (T_LOGO - 1s)
    const fadeOutTimer = setTimeout(() => {
      const fadeOut = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - 0.04)
        if (audio.volume <= 0) {
          audio.pause()
          clearInterval(fadeOut)
        }
      }, 60)
    }, T_LOGO - 1000)

    return () => {
      clearInterval(fadeIn)
      clearTimeout(fadeOutTimer)
      audio.pause()
      audio.src = ""
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    // Canvas offscreen: recibe el render limpio de partículas
    const off  = document.createElement("canvas")
    offRef.current = off
    const octx = off.getContext("2d")

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const W   = canvas.offsetWidth
      const H   = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      off.width  = W * dpr
      off.height = H * dpr
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
      starsRef.current = Array.from({ length: MAX_STARS }, () => makeStar())
      frozenRef.current = false
      showLogoRef.current = false
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    t0Ref.current = performance.now()
    let last = performance.now()

    const tick = (now) => {
      const elapsed = now - t0Ref.current
      const dt      = Math.min(now - last, 50)
      last = now

      const W  = canvas.offsetWidth
      const H  = canvas.offsetHeight
      const cx = W / 2
      const cy = H / 2

      // Curva warp 0→1→0
      let warp = 0
      if      (elapsed < T_RAMP)  warp = Math.pow(elapsed / T_RAMP, 0.45)
      else if (elapsed < T_PEAK)  warp = 1
      else if (elapsed < T_DECEL) warp = 1
      else if (elapsed < T_END)   warp = 1 - Math.pow((elapsed - T_DECEL) / (T_END - T_DECEL), 1.8)
      else                        warp = 0

      const frozen = elapsed >= T_END
      ringTRef.current += dt * 0.00025

      // ─ OFFSCREEN: partículas ─────────────────────────────────────────────
      if (!frozen) {
        // Motion-blur: alfa bajo = estelas largas
        octx.fillStyle = `rgba(3,3,6,${0.11 + warp * 0.15})`
        octx.fillRect(0, 0, W, H)

        drawRings(octx, cx, cy, ringTRef.current, warp)

        const dead = []
        for (let i = 0; i < starsRef.current.length; i++) {
          const s = updateStar(starsRef.current[i], dt, warp)
          if (!s) dead.push(i)
          else    drawStar(octx, s, cx, cy, warp)
        }
        for (let i = dead.length - 1; i >= 0; i--)
          starsRef.current.splice(dead[i], 1)

        const target = Math.round(MAX_STARS * Math.max(0.06, warp))
        while (starsRef.current.length < target)
          starsRef.current.push(makeStar())

        drawGlow(octx, cx, cy, warp)
        drawVignette(octx, cx, cy, W, H, warp)

      } else if (!frozenRef.current) {
        // Primer frame congelado: pintar puntos estáticos
        frozenRef.current = true
        octx.fillStyle = "rgba(3,3,6,1)"
        octx.fillRect(0, 0, W, H)
        for (const s of starsRef.current) drawStarFrozen(octx, s, cx, cy)
        // Glow suave residual centrado
        const r = 200
        const g = octx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0,   "rgba(245,166,35,0.10)")
        g.addColorStop(0.4, "rgba(200,16,46,0.05)")
        g.addColorStop(1,   "transparent")
        octx.save()
        octx.fillStyle = g
        octx.beginPath()
        octx.arc(cx, cy, r, 0, Math.PI * 2)
        octx.fill()
        octx.restore()
      }
      // (frames posteriores al freeze: offscreen no cambia)

      // ─ MAIN CANVAS: blit + zoom-blur radial ──────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(off, 0, 0, W, H)       // imagen nítida base
      if (!frozen) {
        applyZoomBlur(off, ctx, cx, cy, W, H, warp)  // capas escaladas desde centro
      }

      // Trigger logo
      if (elapsed > T_LOGO && !showLogoRef.current) {
        showLogoRef.current = true
        setShowLogo(true)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#030306" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* Halo interior circular */}
            <motion.div
              className="absolute"
              style={{
                width: 700, height: 700,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245,166,35,0.22) 0%, rgba(200,16,46,0.16) 30%, rgba(245,166,35,0.06) 55%, transparent 72%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Halo exterior circular */}
            <motion.div
              className="absolute"
              style={{
                width: 900, height: 900,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, transparent 35%, rgba(200,16,46,0.06) 50%, rgba(245,166,35,0.04) 65%, transparent 80%)",
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />

            {/* Logo blur-reveal */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0, filter: "blur(50px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              style={{
                filter:
                  "drop-shadow(0 0 60px rgba(200,16,46,0.65)) drop-shadow(0 0 120px rgba(245,166,35,0.32))",
              }}
            >
              <MiipLogo width={470} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.68rem, 1.25vw, 0.88rem)",
                color: "rgba(249,244,232,0.52)",
                textTransform: "uppercase",
                letterSpacing: "0.30em",
                marginTop: 28,
              }}
            >
              El nuevo estándar del comercio local.
            </motion.p>

            {/* Dots */}
            <motion.div
              className="flex items-center justify-center gap-[7px] mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[0,1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width:  i === 2 ? 7 : 4,
                    height: i === 2 ? 7 : 4,
                    background:
                      i === 2 ? "#F5A623"
                      : i % 2 === 0 ? "rgba(200,16,46,0.40)"
                      : "rgba(245,166,35,0.30)",
                    boxShadow: i === 2 ? "0 0 12px rgba(245,166,35,0.80)" : "none",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
