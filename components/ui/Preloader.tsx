import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds load time
    const frameDuration = 1000 / 60;
    const totalFrames = duration / frameDuration;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(100, Math.floor((frame / totalFrames) * 100));
      setCount(progress);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Small delay before unmounting
      }
    }, frameDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: COLORS.primary }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Spinning Star Logo */}
        <motion.svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            stroke={COLORS.secondary}
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
            <path d="M12 2V22" />
            <path d="M2 12H22" />
            <path d="M4.92896 4.92896L19.0711 19.0711" />
            <path d="M4.92896 19.0711L19.0711 4.92896" />
        </motion.svg>

        {/* Counter */}
        <div 
            className="flex items-start font-instrument text-[12vw] md:text-[8vw] leading-none tracking-tighter"
            style={{ color: COLORS.secondary }}
        >
          <span>{count}</span>
          <span className="text-[4vw] md:text-[2vw] mt-2 md:mt-4">%</span>
        </div>
      </div>

        {/* Segmented Progress Bar */}
        <div className="flex gap-1 mt-2">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 md:w-2 h-4 md:h-6 rounded-sm"
                    initial={{ opacity: 0.2, backgroundColor: COLORS.secondary }}
                    animate={{ 
                        opacity: i < Math.floor(count / 5) ? 1 : 0.2,
                        backgroundColor: COLORS.secondary
                    }}
                    transition={{ duration: 0.1 }}
                />
            ))}
        </div>
    </motion.div>
  );
};

export default Preloader;
