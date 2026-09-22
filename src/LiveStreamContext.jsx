import React, { createContext, useState, useContext } from 'react'

const LiveStreamContext = createContext()

export function LiveStreamProvider({ children }) {
  const [stream, setStream] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)

  const startScreenShare = async () => {
    setError(null)
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'never' },
        audio: false,
      })
      // Detener cuando el usuario cierra la captura desde el sistema
      s.getVideoTracks()[0].addEventListener('ended', () => {
        setStream(null)
        setIsStreaming(false)
      })
      setStream(s)
      setIsStreaming(true)
    } catch (err) {
      setError('Captura cancelada o no disponible.')
      console.error('Error al capturar la pantalla:', err)
    }
  }

  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
    }
    setIsStreaming(false)
  }

  return (
    <LiveStreamContext.Provider value={{ stream, isStreaming, error, startScreenShare, stopScreenShare }}>
      {children}
    </LiveStreamContext.Provider>
  )
}

export function useLiveStream() {
  return useContext(LiveStreamContext)
}
