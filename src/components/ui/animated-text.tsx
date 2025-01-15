import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

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
    controls.start({
      backgroundPosition: ["0% 50%", "-200% 50%"],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
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
          ? "linear-gradient(to right, #ffffff, #6b7280, #6b7280, #6b7280, #ffffff)"
          : "linear-gradient(to right, #000000, #4b5563, #4b5563, #4b5563, #000000)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
      }}
    >
      {text}
    </motion.div>
  );
}; 