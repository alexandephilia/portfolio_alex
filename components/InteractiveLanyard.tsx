import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useSpring } from 'framer-motion';
import TicketCard from './TicketCard';
import IdentitySection from './sections/IdentitySection';
import { useScroll } from 'framer-motion';

// Separate component for the interactive lanyard logic
// This keeps App.tsx cleaner and encapsulates the complex physics
const InteractiveLanyard = ({ currentCardProgress, totalCards }: { currentCardProgress: any, totalCards: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isDraggable, setIsDraggable] = useState(false); // Enable drag only after intro

    // Couple rotation to x drag to simulate pendulum tension
    // As it moves left (-x), it rotates right (+rotate)
    const rotate = useTransform(x, [-window.innerWidth/2, window.innerWidth/2], [-15, 15]);

    // Initial drop-in animation controls
    const controls = useAnimation();
    
    // We used to pass these down, but now we need to reconstruct them or pass them in
    // currentCardProgress is available via props if we pass it, or we can consume context if available.
    // Let's assume we pass props.
    
    useEffect(() => {
        // Trigger initial drop-in
        const sequence = async () => {
             // Intro Animation
             await controls.start({
                 y: 0,
                 scale: 1,
                 transition: { 
                    type: "spring", stiffness: 180, damping: 12, mass: 1, delay: 1.2
                 }
             });
             setIsDraggable(true);
        };
        sequence();
    }, [controls]);

    return (
        <motion.div
            className={`absolute inset-0 flex items-center justify-center touch-none ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{ 
                x, 
                rotate, // Coupled rotation creates the pendulum visual
                transformOrigin: "50% -50vh",
                zIndex: 50 
            }}
            initial={{ y: "-100vh", scale: 0.9 }}
            animate={controls}
            drag={isDraggable} 
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} 
            dragElastic={0.9} // Almost free drag (mimics slack string)
            dragMomentum={false} 
            dragSnapToOrigin={true}
            dragTransition={{ 
                bounceStiffness: 120, 
                bounceDamping: 2,   // Minimal damping = maximizes inertia/pendulum count
                power: 0.8          // Higher power for inertia feel (though momentum off, affects spring?? No, affects momentum)
            }}
        >
             <motion.div 
                className="pointer-events-none relative w-full h-full flex items-center justify-center"
                style={{ transformOrigin: "50% -50vh" }} // Ensure swing happens from the tether point!
                initial={{ rotate: 30 }}
                animate={{ rotate: 0 }}
                transition={{ 
                    type: "spring", stiffness: 15, damping: 2, mass: 3, delay: 1.2 
                }}
             >
                 {/* 
                    Note: We disabled pointer events on wrapper to prevent blocking, but 
                    drag needs pointer events. The motion.div has touch-none/cursor-grab.
                    We need to ensure the CARD itself doesn't block the drag if it has interactive elements?
                    Actually, if we drag the motion.div, we are good. 
                    The TicketCard has buttons? No, IdentitySection might. 
                    If we drag, we might block clicks.
                    Usually 'drag' detects movement > threshold.
                    
                    We set pointer-events-none on the inner wrapper so clicks pass through? 
                    NO. If we set pointer-events-none, we can't click buttons inside IdentitySection.
                    BUT if we set pointer-events-auto on Card, does it stop drag propagation?
                    Framer Motion drag handles this usually.
                 */}
                  <div className="pointer-events-auto">
                    <TicketCard 
                        index={0} 
                        scrollProgress={currentCardProgress} 
                        totalCards={totalCards} 
                        header="IDENTIFICATION"
                        subHeader="Certified 31.05.94"
                        headerClassName="!text-[2.5rem] md:!text-[3.2rem]"
                        className="!aspect-[2/3] !h-auto md:max-h-[500px] w-[80vw] md:!w-[340px] !static"
                        // Note: !static is important because TicketCard is absolute by default. 
                        // Inside this flex container we want it static relative to the drag wrapper.
                        contentClassName="pt-[80px]"
                        isLanyard={true}
                    >
                        <IdentitySection />
                    </TicketCard>
                  </div>
             </motion.div>
        </motion.div>
    );
};

export default InteractiveLanyard;
