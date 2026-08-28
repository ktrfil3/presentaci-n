// MiipLogo — usa la imagen PNG oficial del logo
// El PNG tiene fondo blanco con texto blanco + círculos naranja.
// Con mix-blend-mode: "screen" sobre fondo oscuro:
//   · El blanco del fondo desaparece (screen blanco = transparente sobre oscuro)
//   · El texto blanco se vuelve visible
//   · Los círculos naranja conservan su color
export default function MiipLogo({ width = 90, className = '', style = {} }) {
  const height = Math.round(width * (195 / 320))

  return (
    <img
      src="/miip-logo.png"
      alt="MiiP logo"
      width={width}
      height={height}
      className={className}
      draggable={false}
      style={{
        mixBlendMode: 'screen',
        display: 'block',
        objectFit: 'contain',
        ...style,
      }}
    />
  )
}
