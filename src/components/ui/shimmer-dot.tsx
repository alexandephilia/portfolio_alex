import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface ShimmerDotProps {
  shapeType?: "Square" | "Circle";
  size?: number;
  gap?: number;
  speed?: number;
  radius?: number;
}

export function ShimmerDot({
  shapeType = "Square",
  size = 2,
  gap = 24,
  speed = 0.6,
  radius = 0,
}: ShimmerDotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  const angleMapRef = useRef<Map<string, number>>(new Map());

  const drawShapes = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseColor = theme === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(128, 128, 128, 0.15)';

    const shimmerColors = [
      'rgba(255, 255, 255, 0.45)',
      'rgba(249, 115, 22, 0.35)',
      'rgba(14, 165, 233, 0.35)',
      'rgba(255, 255, 255, 0.4)',
    ];

    const time = Date.now() * 0.001 * (speed * 0.5);

    const createWaveComponent = (x: number, y: number) => {
      const nx = x / canvas.width;
      const ny = y / canvas.height;

      const wave1 = Math.sin(nx * 4 + ny * 4 + time * 1.5) * 0.5;

      const wave2 = Math.cos(nx * 3 - ny * 3 - time * 0.8) * 0.3;

      const wave3 = Math.sin((nx + ny) * 5 - time * 1.2) * 0.2;

      return (wave1 + wave2 + wave3) * 0.5 + 0.5;
    };

    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const waveValue = createWaveComponent(x, y);

        const phaseOffset = Math.sin((x + y) * 0.01 + time * 0.5) * 0.1;

        const isShimmering = (waveValue + phaseOffset) > 0.65 && Math.random() > 0.8;

        if (isShimmering) {
          const colorIndex = Math.floor(Math.random() * shimmerColors.length);
          ctx.fillStyle = shimmerColors[colorIndex];

          ctx.shadowColor = shimmerColors[colorIndex];
          ctx.shadowBlur = 5;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          const secondCtx = ctx;
          secondCtx.shadowBlur = 10;

          const scale = 1.2 + (waveValue * 0.3);
          const offset = (scale - 1) * size / 2;

          if (shapeType === "Square") {
            ctx.fillRect(
              x - offset,
              y - offset,
              size * scale,
              size * scale
            );
          } else {
            ctx.beginPath();
            ctx.arc(
              x + size / 2,
              y + size / 2,
              (size / 2) * scale,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }

          ctx.shadowBlur = 0;
        } else {
          const opacity = 0.15 + (waveValue * 0.1);
          ctx.fillStyle = theme === 'dark'
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(128, 128, 128, ${opacity * 0.75})`;

          if (shapeType === "Square") {
            ctx.fillRect(x, y, size, size);
          } else {
            ctx.beginPath();
            ctx.arc(
              x + size / 2,
              y + size / 2,
              size / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(drawShapes);
  }, [gap, size, shapeType, theme, speed]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    drawShapes();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, drawShapes]);

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: radius,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </motion.div>
  );
} 