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

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationFrameId: number

    const patternCanvas = document.createElement("canvas")
    const patternSize = 128 // Smaller pattern size for better performance
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize
    const patternCtx = patternCanvas.getContext("2d", { alpha: true })
    if (!patternCtx) return

    const patternData = patternCtx.createImageData(patternSize, patternSize)
    const patternPixelDataLength = patternSize * patternSize * 4
    const patternAlpha = theme === 'dark' ? baseOpacity * 255 : baseOpacity * 255 * 0.8

    const resize = () => {
      if (!canvas) return
      
      // Get the actual viewport size
      const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      
      // Handle high DPR screens properly
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
      
      // Set canvas buffer size
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      // Set display size
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      
      // Scale context
      ctx.scale(dpr, dpr)
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
      if (!canvas || !ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pattern = ctx.createPattern(patternCanvas, "repeat")
      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    const loop = () => {
      if (frame % 2 === 0) { // Update every other frame for performance
        updatePattern()
        drawGrain()
      }
      frame++
      animationFrameId = window.requestAnimationFrame(loop)
    }

    // Initial setup
    resize()
    
    // Handle resize and orientation changes
    const debouncedResize = debounce(resize, 100)
    window.addEventListener("resize", debouncedResize)
    window.addEventListener("orientationchange", debouncedResize)
    
    // Start animation loop
    loop()

    return () => {
      window.removeEventListener("resize", debouncedResize)
      window.removeEventListener("orientationchange", debouncedResize)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [theme, baseOpacity])

  // Debounce helper
  function debounce(fn: Function, ms: number) {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        isolation: 'isolate',
        pointerEvents: 'none',
        contain: 'strict',
        willChange: 'transform'
      }}
    >
      <canvas 
        ref={grainRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: theme === 'dark' ? 'none' : 'invert(1) brightness(0.8)',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000,
          willChange: 'transform',
          contain: 'strict'
        }}
      />
    </div>
  )
}

export default GrainOverlay
