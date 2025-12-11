import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, animate, useTime } from 'framer-motion';
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
  
  // 1. Rotation: multiple full spins (720deg)
  // 2. Scale: 0 -> 1 (small to big)
  const rotation = useTransform(smoothProgress, [0, 180], [0, 1080]); 
  
  const progressScale = useTransform(smoothProgress, [0, 100], [0, 1]);
  const exitScale = useMotionValue(1);
  const scale = useTransform(() => progressScale.get() * exitScale.get());
  
  // Fade out content as we scale up
  const contentOpacity = useTransform(exitScale, [1, 5], [1, 0]);
  
  useEffect(() => {
    // 1. Immediate start (20%)
    progress.set(20);
    setCount(20);
    
    // Track start time to ensure minimum duration
    const startTime = Date.now();
    const MIN_DURATION = 2500; // Minimum 2.5s display time

    const checkReadyState = () => {
      if (document.readyState === 'complete') {
        completeLoading();
      }
    };

    // 2. Trickle Animation (Fake progress until load event)
    // Speed based on connection estimate if available
    // @ts-ignore - navigator.connection is experimental
    const connectionSpeed = navigator.connection?.downlink || 10; 
    const trickleSpeed = connectionSpeed > 5 ? 2 : 0.5; // Faster increment for better connections

    const trickleInterval = setInterval(() => {
      const current = progress.get();
      if (current < 90) {
        // Logarithmic-ish slowdown: faster at start, slower as it gets high
        const increment = Math.max(0.1, (90 - current) / (50 / trickleSpeed)); 
        const next = Math.min(90, current + increment);
        progress.set(next);
        setCount(Math.floor(next));
      }
    }, 20);

    const completeLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        clearInterval(trickleInterval);
        progress.set(100);
        setCount(100);
        
        // Brief pause at 100% before exploding (200ms)
        setTimeout(() => {
            // Trigger Exit Animation
            // Animate scale to 250 significantly faster, and trigger onComplete after
            animate(exitScale, 250, { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1],
                onComplete: () => {
                    onComplete();
                }
            });
        }, 200);

      }, remaining);
    };

    window.addEventListener('load', completeLoading);
    
    // Fallback: If already loaded or takes too long, force complete
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
        // Safety timeout (e.g. 5s max)
        setTimeout(completeLoading, 5000);
    }

    return () => {
      window.removeEventListener('load', completeLoading);
      clearInterval(trickleInterval);
    };
  }, [onComplete, progress]);

  // Infinite text animation - MONOTONIC (No Reset)
  // We repeat the text enough times to cover the movement for the short preloader duration
  // Duration ~3s-5s. Speed ~100px/s? 
  // We just animate standard motion values linearly.
  
  const textOffset1 = useMotionValue(0);
  const textOffset2 = useMotionValue(0);
  
  useEffect(() => {
    // 1. Top Text: Moves Right (Increasing offset)
    // Start at -20% to have content spread
    textOffset1.set(-20); 
    const a1 = animate(textOffset1, 200, { // Move to positive
        duration: 20, // Slow constant speed over long time
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop" // Just in case, but we won't hit it in 3s
    });

    // 2. Bottom Text: Moves Left (Decreasing offset)
    textOffset2.set(0);
    const a2 = animate(textOffset2, -200, {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
    });

    return () => {
        a1.stop();
        a2.stop();
    };
  }, []); 

  // Text Content Constants - Repeated massively to avoid running out
  const TOP_TEXT_BASE = " नमस्ते • Salam • こんにちは • Ciao • עברית • Halo • Здраво • Hello • Bonjour • ";
  const TOP_TEXT = TOP_TEXT_BASE.repeat(20);

  const BOTTOM_TEXT_BASE = " Hello • Aloha • Bonjour • 你好 • नमस्कार • العربية • Ciao • עברית • Halo • Здраво • Aloha • Olá • ";
  const BOTTOM_TEXT = BOTTOM_TEXT_BASE.repeat(20);

  const UNIQUE_TEXT_BASE = " ALEXANDER • JAKARTA BASED • WORLDWIDE WORK • ";
  const UNIQUE_TEXT = UNIQUE_TEXT_BASE.repeat(30);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.secondary }}
      exit={{ 
          opacity: 0,
          transition: { duration: 0.5, ease: "easeInOut" } 
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
        <motion.div style={{ opacity: contentOpacity }} className="absolute top-0 left-0 right-0 w-full h-[60vh] pointer-events-none">
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
                        startOffset={textOffset1}
                        side="right"
                        style={{ fill: COLORS.primary }}
                    >
                       {TOP_TEXT}
                    </motion.textPath>
                </text>
             </svg>
        </motion.div>


        {/* BOTTOM Horizon Curve (Original) */}
        <motion.div style={{ opacity: contentOpacity }} className="absolute bottom-0 left-0 right-0 w-full h-[60vh] pointer-events-none">
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
                        startOffset={textOffset2}
                        style={{ fill: COLORS.primary }}
                    >
                        {BOTTOM_TEXT}
                    </motion.textPath>
                </text>
             </svg>
        </motion.div>

        {/* EXTRA UNIQUE BOTTOM CURVE (Reverse & Smaller) */}
        <motion.div style={{ opacity: contentOpacity }} className="absolute -bottom-5 left-0 right-0 w-full h-[40vh] pointer-events-none opacity-60">
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
                        startOffset={textOffset1}
                        style={{ fill: COLORS.primary }}
                        spacing="auto"
                    >
                        {UNIQUE_TEXT}
                    </motion.textPath>
                </text>
             </svg>
        </motion.div>
    </motion.div>
  );
};

export default Preloader;
