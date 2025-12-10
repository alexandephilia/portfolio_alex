import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { COLORS } from '../constants';
import { CardProps } from '../types';

declare global {
  interface Window {
    gsap: any;
  }
}

const TicketCard: React.FC<CardProps> = ({ 
  children, 
  header, 
  index, 
  scrollProgress, 
  totalCards, 
  className = "",
  contentClassName = "",
  headerClassName = "",
  subHeader,
  isLanyard
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP Marquee Animation
  useEffect(() => {
    if (window.gsap && marqueeRef.current) {
      const ctx = window.gsap.context(() => {
        window.gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 18,
          ease: "linear",
        });
      });
      return () => ctx.revert();
    }
  }, []);
  
  // TRANSFORM LOGIC:
  
  // Y Position (Vertical Scroll)
  const y = useTransform(
    scrollProgress,
    [index - 1, index, index + 1],
    ['120vh', '0vh', '-120vh']
  );

  // Perspective Rotation (RotateX)
  const rotateX = useTransform(
    scrollProgress,
    [index - 1, index, index + 0.25, index + 1],
    [0, 0, 24, 24]
  );

  // Scale
  const scale = useTransform(
    scrollProgress,
    [index - 1, index, index + 0.25, index + 1],
    [0.8, 1, 0.9, 0.8] 
  );

  // Opacity
  const opacity = useTransform(
    scrollProgress,
    [index - 1, index - 0.5, index, index + 0.6, index + 1],
    [0, 1, 1, 1, 0]
  );

  // Pointer Events
  const pointerEvents = useTransform(
    scrollProgress,
    (val: number) => (Math.abs(val - index) < 0.3 ? 'auto' : 'none')
  );

  const marqueeTexts = ["Front End Dev", "DevOps", "Full Stack Dev", "Agnostic Framework", "Experimenter", "Coffee Fueled Dev"];

  // Reusable text block for infinite loop
  const MarqueeContent = () => (
    <div className="flex gap-4 px-2 items-center">
      {marqueeTexts.map((text, i) => (
        <React.Fragment key={i}>
          <span className="font-bold text-xs tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: COLORS.primary }}>
            {text}
          </span>
          <Star size={12} fill={COLORS.primary} stroke="none" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <motion.div
      className={`absolute w-[85vw] md:w-[400px] max-h-[80vh] ${className}`}
      style={{ 
        y,
        rotateX,
        scale,
        opacity,
        pointerEvents,
        transformStyle: "preserve-3d",
        transformOrigin: "top center",
        zIndex: totalCards - index,
      }}
    >
      {isLanyard && (
        <div className="absolute bottom-[95%] left-0 right-0 flex justify-center pointer-events-none z-0 pb-1">
          {/* Main Strap */}
          <div 
             className="w-[180px] md:w-[220px] relative flex justify-center"
             style={{ height: 'calc(50vh + 20px)' }}
          >
             <div 
               className="w-[90%] h-full relative rounded-b-xl overflow-hidden"
               style={{ 
                  backgroundColor: '#1a1a1a',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
               }}
             >
                {/* Fabric Texture Pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ 
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)`
                  }}
                />
                
                {/* Stitching Details */}
                <div className="absolute inset-y-0 left-2 w-0.5 border-l border-dashed border-white/20" />
                <div className="absolute inset-y-0 right-2 w-0.5 border-r border-dashed border-white/20" />

                {/* Clip Connector */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#2a2a2a] flex items-center justify-center shadow-lg">
                    <div className="w-full h-2 bg-black/40 absolute top-2" />
                    <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      )}

      <div 
        className="w-full h-full rounded-[2rem] border-4 relative flex flex-col overflow-hidden shadow-2xl bg-white"
        style={{ 
          backgroundColor: COLORS.primary, 
          borderColor: COLORS.secondary,
        }}
      >
        {/* Decorative Notches */}
        <div 
          className="absolute top-[88px] -left-4 w-8 h-8 rounded-full z-20"
          style={{ backgroundColor: COLORS.secondary }}
        ></div>
        <div 
          className="absolute top-[88px] -right-4 w-8 h-8 rounded-full z-20"
          style={{ backgroundColor: COLORS.secondary }}
        ></div>

        {/* Header Section */}
        <div 
          className="h-24 border-b-4 border-dotted flex flex-col items-center justify-center shrink-0 z-10 relative"
          style={{ borderColor: COLORS.secondary }}
        >
          <h2 
            className={`text-5xl md:text-6xl font-instrument tracking-tight pt-2 leading-none ${headerClassName}`}
            style={{ color: COLORS.secondary }}
          >
            {header}
          </h2>
          {subHeader && (
             <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase translate-y-[-2px] opacity-60" style={{ color: COLORS.secondary }}>
                {subHeader}
             </span>
          )}
        </div>

        {/* Content Body */}
        <div className={`flex-1 relative overflow-hidden flex flex-col ${contentClassName}`}>
          {children}
        </div>

        {/* Footer Marquee */}
        <div 
          className="h-10 flex items-center relative overflow-hidden shrink-0"
          style={{ 
            backgroundColor: COLORS.accent
          }}
        >
          {/* GSAP wrapper that slides left infinitely */}
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
             <MarqueeContent />
             <MarqueeContent />
          </div>
        </div>
      </div>
      
      {/* Dynamic Shadow for depth */}
      <motion.div 
        className="absolute inset-0 rounded-[2rem] bg-black/20 -z-10 blur-xl translate-y-8"
        style={{ opacity: useTransform(scrollProgress, [index-0.5, index, index+0.5], [0, 0.4, 0]) }}
      />
    </motion.div>
  );
};

export default TicketCard;