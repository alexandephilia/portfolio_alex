import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { COLORS } from '../../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  
  // Motion Values for Physics
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { 
    damping: 12, 
    stiffness: 100, 
    mass: 0.5 
  });
  
  // Spiral Animation: 
  // 1. Rotation: multiple full spins (720deg)
  // 2. Scale: 0 -> 1 (small to big)
  const rotation = useTransform(smoothProgress, [0, 100], [0, 720]); 
  const scale = useTransform(smoothProgress, [0, 100], [0, 1]);
  
  useEffect(() => {
    const duration = 2500; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const rawProgress = Math.min(100, (currentStep / steps) * 100);
      
      setCount(Math.floor(rawProgress));
      progress.set(rawProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete, progress]);

  // Text Offset for loop effect
  const textOffset = useTransform(smoothProgress, [0, 100], ["0%", "25%"]); 

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.secondary }}
      exit={{ 
          y: "-100%", 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
             {/* Spiral Logo (Original Asterisk) */}
            <motion.div 
                style={{ 
                    rotate: rotation,
                    scale: scale 
                }}
            >
                 <svg 
                    width="120" 
                    height="120" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke={COLORS.primary}
                    strokeWidth="1.2" // Slightly thinner for elegance at large size
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="overflow-visible"
                >
                    {/* Original Asterisk Shape */}
                    <path d="M12 2V22" />
                    <path d="M2 12H22" />
                    <path d="M4.92896 4.92896L19.0711 19.0711" />
                    <path d="M4.92896 19.0711L19.0711 4.92896" />
                </svg>
            </motion.div>
        </div>

        {/* TOP Horizon Curve (Inverted) */}
        <div className="absolute top-0 left-0 right-0 w-full h-[60vh] pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMin slice">
                {/* 
                    Inverted Path:
                    Starts Top Left (-200, 0)
                    Dips Down Center (Q 500, 300) -> The "Valley"
                    Ends Top Right (1200, 0)
                */}
                <path 
                    id="horizon-curve-top" 
                    d="M -200, 0 Q 500, 300 1200, 0" 
                    fill="none" 
                    stroke="transparent"
                />
                
                <text className="font-instrument text-4xl md:text-7xl uppercase tracking-tighter" fill={COLORS.secondary} style={{ letterSpacing: '-0.02em' }}>
                    <motion.textPath 
                        href="#horizon-curve-top" 
                        startOffset={textOffset}
                        style={{ fill: COLORS.primary }}
                        side="right" // Ensure text is upright if needed, or left depending on path direction
                    >
                       العربية • Ciao • עברית • Halo • Здраво • Hello • Bonjour • こんにちは •
                    </motion.textPath>
                </text>
             </svg>
        </div>


        {/* BOTTOM Horizon Curve (Original) */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[60vh] pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice">
                <path 
                    id="horizon-curve-bottom" 
                    d="M -200, 400 Q 500, 100 1200, 400" 
                    fill="none" 
                    stroke="transparent"
                />
                
                <text className="font-instrument text-4xl md:text-7xl uppercase tracking-tighter" fill={COLORS.secondary} style={{ letterSpacing: '-0.02em' }}>
                    <motion.textPath 
                        href="#horizon-curve-bottom" 
                        startOffset={textOffset}
                        style={{ fill: COLORS.primary }}
                    >
                        Hello • Bonjour • こんにちは • العربية • Ciao • עברית • Halo • Здраво •
                    </motion.textPath>
                </text>
             </svg>
        </div>

        {/* EXTRA UNIQUE BOTTOM CURVE (Reverse & Smaller) */}
        <div className="absolute -bottom-5 left-0 right-0 w-full h-[40vh] pointer-events-none opacity-60">
             <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice">
                {/* 
                    Steeper/Different Curve
                */}
                <path 
                    id="horizon-curve-unique" 
                    d="M -200, 450 Q 500, 250 1200, 450" 
                    fill="none" 
                    stroke="transparent"
                />
                
                <text className="font-mono text-sm uppercase tracking-widest" fill={COLORS.secondary} style={{ fontSize: '14px' }}>
                    <motion.textPath 
                        href="#horizon-curve-unique" 
                        startOffset={useTransform(smoothProgress, [0, 100], ["25%", "0%"])} // Reverse direction
                        style={{ fill: COLORS.primary }}
                        spacing="auto"
                    >
                        ALEXANDER 2025 • JAKARTA BASED • WORLDWIDE WORK • ALEXANDER 2025 • ALEXANDER 2025 • JAKARTA BASED • WORLDWIDE WORK •
                    </motion.textPath>
                </text>
             </svg>
        </div>
    </motion.div>
  );
};

export default Preloader;
