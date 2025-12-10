import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Types for the component props
interface VariableProximityTextProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Optional function to interpolate standard CSS styles based on intensity (0 to 1) */
  styleInterpolation?: (intensity: number) => React.CSSProperties;
}

const VariableProximityText: React.FC<VariableProximityTextProps> = ({
  label,
  fromFontVariationSettings = "'wght' 400, 'opsz' 9",
  toFontVariationSettings = "'wght' 800, 'opsz' 40",
  containerRef,
  radius = 69,
  falloff = 'linear',
  className,
  style,
  onClick,
  styleInterpolation
}) => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const localContainerRef = useRef<HTMLDivElement>(null);

  // Helper to parse variation settings string into a map
  const parseSettings = (settings: string): Record<string, number> => {
    return settings.split(',').reduce((acc, setting) => {
      const parts = setting.trim().split(/\s+/);
      const value = parseFloat(parts[parts.length - 1]);
      const axis = parts.slice(0, parts.length - 1).join(' ');
      
      if (axis && !isNaN(value)) {
        acc[axis] = value;
      }
      return acc;
    }, {} as Record<string, number>);
  };

  const fromSettings = useMemo(() => parseSettings(fromFontVariationSettings), [fromFontVariationSettings]);
  const toSettings = useMemo(() => parseSettings(toFontVariationSettings), [toFontVariationSettings]);

  // Calculate effect intensity based on distance and falloff
  const calculateIntensity = (distance: number): number => {
    if (distance > radius) return 0;
    const normalized = 1 - distance / radius;
    
    switch (falloff) {
      case 'exponential':
        return Math.pow(normalized, 2);
      case 'gaussian':
        // Simple approximate gaussian curve
        return Math.exp(-Math.pow(distance / (radius / 2), 2));
      case 'linear':
      default:
        return normalized;
    }
  };

  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      setMousePosition({ x, y });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [containerRef]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      letterRefs.current.forEach((span) => {
        if (!span) return;

        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(centerX - mousePosition.x, 2) + 
          Math.pow(centerY - mousePosition.y, 2)
        );

        const intensity = calculateIntensity(distance);

        // 1. Font Variation Settings
        const currentSettings = Object.keys(fromSettings).map(axis => {
          const start = fromSettings[axis];
          const end = toSettings[axis];
          const target = end !== undefined ? end : start;
          const value = start + (target - start) * intensity;
          return `${axis} ${value.toFixed(2)}`;
        }).join(', ');

        span.style.fontVariationSettings = currentSettings;

        // 2. Custom Style Interpolation (Transforms, Colors, etc.)
        if (styleInterpolation) {
           const customStyles = styleInterpolation(intensity);
           Object.assign(span.style, customStyles);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, fromSettings, toSettings, radius, falloff, styleInterpolation]);

  return (
    <div 
      ref={localContainerRef}
      className={`${className} inline-block`}
      style={{ ...style }}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {label.split('').map((char, i) => (
        <motion.span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          style={{ 
            display: 'inline-block',
            fontVariationSettings: fromFontVariationSettings,
            transition: 'color 0.1s ease',
            whiteSpace: 'pre',
            willChange: 'font-variation-settings, transform' // Optimizer
          }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default VariableProximityText;
