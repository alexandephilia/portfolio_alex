import { useTheme } from "@/components/theme-provider";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedGradientText = ({ text, className = "" }: AnimatedTextProps) => {
  const controls = useAnimationControls();
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light');

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Create an infinite seamless shimmer animation
    controls.start({
      backgroundPosition: ["0% 50%", "-100% 50%", "-200% 50%"],
      transition: {
        times: [0, 0.5, 1],
        duration: 6,
        ease: [0.36, 0, 0.66, 1], // Custom bezier curve for smooth motion
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      }
    });
  }, [controls]);

  // Get effective theme (actual theme being displayed)
  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  return (
    <motion.div
      animate={controls}
      className={`font-bold ${className}`}
      style={{
        backgroundImage: effectiveTheme === 'dark'
          ? `linear-gradient(
              135deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(107, 114, 128, 0.9) 25%,
              rgba(255, 255, 255, 1) 50%,
              rgba(107, 114, 128, 0.9) 75%,
              rgba(255, 255, 255, 1) 100%
            )`
          : `linear-gradient(
              135deg,
              rgba(0, 113, 169, 1) 0%,
              rgba(41, 143, 194, 0.7) 15%,
              rgba(0, 113, 169, 1) 50%,
              rgba(41, 143, 194, 0.7) 75%,
              rgba(0, 113, 169, 1) 100%
            )`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
        // Add subtle text shadow for depth
        textShadow: effectiveTheme === 'dark' 
          ? '0 0 30px rgba(255,255,255,0.15)'
          : '0 0 30px rgba(41,143,194,0.2)',
      }}
    >
      {text}
    </motion.div>
  );
}; 