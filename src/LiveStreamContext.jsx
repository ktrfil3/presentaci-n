import React, { createContext, useState, useContext } from 'react'

const LiveStreamContext = createContext()

export function LiveStreamProvider({ children }) {
  const [streams, setStreams] = useState({})
  const [errors, setErrors] = useState({})

  const startScreenShare = async (id) => {
    setErrors(prev => ({ ...prev, [id]: null }))
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'never' },
        audio: false,
      })
      // Detener cuando el usuario cierra la captura desde el sistema
      s.getVideoTracks()[0].addEventListener('ended', () => {
        setStreams(prev => {
          const newStreams = { ...prev }
          delete newStreams[id]
          return newStreams
        })
      })
      setStreams(prev => ({ ...prev, [id]: s }))
    } catch (err) {
      setErrors(prev => ({ ...prev, [id]: 'Captura cancelada o no disponible.' }))
      console.error(`Error al capturar la pantalla para ${id}:`, err)
    }
  }

  const stopScreenShare = (id) => {
    setStreams(prev => {
      if (prev[id]) {
        prev[id].getTracks().forEach(t => t.stop())
        const newStreams = { ...prev }
        delete newStreams[id]
        return newStreams
      }
      return prev
    })
  }

  return (
    <LiveStreamContext.Provider value={{ streams, errors, startScreenShare, stopScreenShare }}>
      {children}
    </LiveStreamContext.Provider>
  )
}

export function useLiveStream(id = 'default') {
  const context = useContext(LiveStreamContext)
  if (!context) return null

  return {
    stream: context.streams[id] || null,
    isStreaming: !!context.streams[id],
    error: context.errors[id] || null,
    startScreenShare: () => context.startScreenShare(id),
    stopScreenShare: () => context.stopScreenShare(id),
  }
}
