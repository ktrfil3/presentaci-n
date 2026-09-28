import { useEffect, useRef } from "react"

export default function Slide06Brand() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    video.play().catch(e => console.log("Video autoplay failed:", e))
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030306] flex items-center justify-center">
      <video
        ref={videoRef}
        src="/MIIP MIIP HORIZONTAL.mp4"
        className="w-full h-full object-cover"
        playsInline
      />
    </div>
  )
}
