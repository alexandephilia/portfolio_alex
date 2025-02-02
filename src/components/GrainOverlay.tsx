import type React from "react"
import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface NoiseProps {
  baseOpacity?: number
}

const GrainOverlay: React.FC<NoiseProps> = ({
  baseOpacity = 0.05
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let frame = 0

    const patternCanvas = document.createElement("canvas")
    const patternSize = 250
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize
    const patternCtx = patternCanvas.getContext("2d")
    if (!patternCtx) return

    const patternData = patternCtx.createImageData(patternSize, patternSize)
    const patternPixelDataLength = patternSize * patternSize * 4
    const patternAlpha = theme === 'dark' ? baseOpacity * 255 : baseOpacity * 255 * 0.8

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(1, 1)
    }

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255
        patternData.data[i] = value
        patternData.data[i + 1] = value
        patternData.data[i + 2] = value
        patternData.data[i + 3] = patternAlpha
      }
      patternCtx.putImageData(patternData, 0, 0)
    }

    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pattern = ctx.createPattern(patternCanvas, "repeat")
      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    const loop = () => {
      if (frame % 2 === 0) {
        updatePattern()
        drawGrain()
      }
      frame++
      window.requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize)
    resize()
    loop()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [theme, baseOpacity])

  return (
    <canvas 
      ref={grainRef} 
      className="fixed w-full h-full top-0 left-0 pointer-events-none z-[9999] overflow-hidden will-change-transform"
      style={{
        filter: theme === 'dark' ? 'none' : 'invert(1) brightness(0.8)',
      }}
    />
  )
}

export default GrainOverlay
