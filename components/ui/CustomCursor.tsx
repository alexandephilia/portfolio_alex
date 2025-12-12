import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants';

type CursorVariant = 'default' | 'filter' | 'text';

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
    
    // Mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth springs for Dot (fast)
    const springConfigDot = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfigDot);
    const cursorYSpring = useSpring(cursorY, springConfigDot);

    // Smooth springs for Ring (slower/magnetic feel)
    const springConfigRing = { damping: 20, stiffness: 200, mass: 0.8 };
    const ringXSpring = useSpring(cursorX, springConfigRing);
    const ringYSpring = useSpring(cursorY, springConfigRing);

    // Center offsets (Motion handles transform, overwriting CSS -translate-x-1/2)
    // Dot is w-3 (12px) -> offset 6px
    const dotX = useTransform(cursorXSpring, x => x - 6);
    const dotY = useTransform(cursorYSpring, y => y - 6);

    // Ring is w-10 (40px) -> offset 20px
    const ringX = useTransform(ringXSpring, x => x - 20);
    const ringY = useTransform(ringYSpring, y => y - 20);

    // Text Container is w-24 (96px) -> offset 48px
    // Note: Text uses the DOT spring (fast) to feel responsive
    const textX = useTransform(cursorXSpring, x => x - 48);
    const textY = useTransform(cursorYSpring, y => y - 48);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const isLink = target.tagName.toLowerCase() === 'a' || 
                           target.tagName.toLowerCase() === 'button' ||
                           target.closest('a') || 
                           target.closest('button') ||
                           target.getAttribute('data-cursor') === 'hover';

            const isFilter = target.getAttribute('data-cursor') === 'filter' ||
                             target.closest('[data-cursor="filter"]');

            if (isLink) {
                setCursorVariant('text');
            } else if (isFilter) {
                setCursorVariant('filter');
            } else {
                setCursorVariant('default');
            }
        };

        const handleMouseOut = () => {
            setCursorVariant('default');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-visible">
            {/* 1. Main Dot (Center) */}
            <motion.div
                className="absolute w-3 h-3 rounded-full mix-blend-difference"
                style={{
                    x: dotX,
                    y: dotY,
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary, // User requested accent border
                }}
                animate={{
                    scale: cursorVariant === 'text' ? 0 : 1,
                    opacity: cursorVariant === 'text' ? 0 : 1,
                    backgroundColor: cursorVariant === 'filter' ? '#FFFFFF' : COLORS.accent,
                    borderWidth: '1.5px', // slightly thicker to be visible
                }}
                transition={{ duration: 0.2 }}
            />

            {/* 2. Outer Ring (Delayed) - Now with Filter/Difference for Visibility */}
            <motion.div
                className="absolute w-10 h-10 rounded-full border border-current mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    color: COLORS.primary, 
                }}
                animate={{
                    // Show in Default AND Filter mode. Only hide in Text mode.
                    scale: cursorVariant === 'text' ? 0 : 1, 
                    // Maintain visibility. In filter mode, we keeps same opacity or maybe higher?
                    opacity: cursorVariant === 'text' ? 0 : 0.5,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* 3. Rotating Text Ring */}
            <motion.div
                className="absolute flex items-center justify-center p-0 m-0"
                style={{
                    x: textX, 
                    y: textY,
                }}
                animate={{
                    scale: cursorVariant === 'text' ? 1 : 0.5,
                    opacity: cursorVariant === 'text' ? 1 : 0,
                }}
                transition={{
                    scale: { duration: 0.3, ease: "easeOut" },
                    opacity: { duration: 0.2 }
                }}
            >
                <motion.div
                    className="w-24 h-24 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
                        <path
                            id="textPath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                        />
                        <text 
                            fontSize="14" 
                            fontWeight="bold" 
                            fill={COLORS.secondary} 
                            stroke={COLORS.primary}
                            strokeWidth="0.6px"
                            letterSpacing="2px"
                        >
                            <textPath href="#textPath" startOffset="0%">
                                OPEN • VIEW • INTERACT •
                            </textPath>
                        </text>
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CustomCursor;
