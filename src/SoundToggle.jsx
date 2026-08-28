import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import formulaMp3 from './assets/Formula.mp3'

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  const toggleSound = () => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    if (isPlaying) {
      setIsPlaying(false) // Detener animación visual inmediatamente
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05
        } else {
          audio.volume = 0
          audio.pause()
          clearInterval(fadeIntervalRef.current)
        }
      }, 50) // Fade-out progresivo
    } else {
      setIsPlaying(true) // Iniciar animación visual inmediatamente
      if (audio.paused) {
        audio.volume = 0
        audio.play().catch(() => {})
      }
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume < 0.95) {
          audio.volume += 0.05
        } else {
          audio.volume = 1
          clearInterval(fadeIntervalRef.current)
        }
      }, 50) // Fade-in progresivo
    }
  }

  // Keep state in sync with audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPause = () => setIsPlaying(false)
    const onPlay = () => setIsPlaying(true)

    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('ended', onPause)

    return () => {
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('ended', onPause)
    }
  }, [])

  // Heights for the sound wave animation
  const bars = [
    { h: [3, 14, 3] },
    { h: [3, 20, 3] },
    { h: [3, 10, 3] },
    { h: [3, 16, 3] },
  ]

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={formulaMp3} loop preload="auto" />
      <button
        onClick={toggleSound}
        className="flex items-center justify-center gap-[4px] w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full"
            style={{ backgroundColor: isPlaying ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}
            initial={{ height: 3 }}
            animate={{ height: isPlaying ? bar.h : 3 }}
            transition={{
              duration: 0.6,
              repeat: isPlaying ? Infinity : 0,
              repeatType: 'mirror',
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </button>
    </div>
  )
}
