import { AnimatePresence, motion, MotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../constants';

const GREETINGS = [
    "Hello",        // English
    "Bonjour",      // French
    "Hola",         // Spanish
    "Ciao",         // Italian
    "नमस्ते",      // Hindi/Sanskrit
    "你好",       // Mandarin Chinese
    "العربية",      // Arabic
    "עברית",       // Hebrew
    "Salam",        // Persian/Farsi
    "Hej",          // Swedish/Danish
    "Olá",          // Portuguese
    "Γεια σου",        // Greek
    "Aloha",        // Hawaiian
    "Здраво",       // Serbian/Croatian
    "Sveiki",       // Latvian
];

interface IdentitySectionProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

// Exported overlay component for name labels (renders above marquee in TicketCard)
export const IdentityOverlay: React.FC<{ mouseX: MotionValue<number>; mouseY: MotionValue<number> }> = ({ mouseX, mouseY }) => {
    const hudX = useTransform(mouseX, [-1, 1], ["-35px", "35px"]);
    const hudY = useTransform(mouseY, [-1, 1], ["-35px", "35px"]);

    return (
        <>
            <motion.div
                className="absolute bottom-14 left-6 z-[200]"
                style={{ x: hudX, y: hudY }}
            >
                <div className="px-1.5 py-0 rounded-sm border flex items-center" style={{ backgroundColor: COLORS.primary, borderColor: COLORS.secondary }}>
                    <span className="font-mono text-[9px] font-bold tracking-widest leading-none pt-[2px] pb-[1px]" style={{ color: COLORS.secondary }}>ALEXANDER</span>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-14 right-6 z-[200]"
                style={{ x: hudX, y: hudY }}
            >
                <div className="px-1.5 py-0 rounded-sm border flex items-center" style={{ backgroundColor: COLORS.primary, borderColor: COLORS.secondary }}>
                    <span className="font-mono text-[9px] font-bold tracking-widest leading-none pt-[2px] pb-[2px]" style={{ color: COLORS.secondary }}>FULL STACK DEV</span>
                </div>
            </motion.div>
        </>
    );
};

const IdentitySection: React.FC<IdentitySectionProps> = ({ mouseX, mouseY }) => {
    const [greetingIndex, setGreetingIndex] = useState(0);

    // Cycle greetings every 2.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Parallax Transforms - Using global normalized [-1, 1] mouse values from App.tsx
    // We map these small values to pixel distances.

    // Background: Moves slow
    const imageX = useTransform(mouseX, [-1, 1], ["-10px", "10px"]);
    const imageY = useTransform(mouseY, [-1, 1], ["-10px", "10px"]);

    // Middle-ish (Inverted)
    const svgX = useTransform(mouseX, [-1, 1], ["15px", "-15px"]);
    const svgY = useTransform(mouseY, [-1, 1], ["15px", "-15px"]);

    // Topmost: Moves fast
    const bubbleX = useTransform(mouseX, [-1, 1], ["-25px", "25px"]);
    const bubbleY = useTransform(mouseY, [-1, 1], ["-25px", "25px"]);

    // Foreground HUD: Moves fastest
    const hudX = useTransform(mouseX, [-1, 1], ["-35px", "35px"]);
    const hudY = useTransform(mouseY, [-1, 1], ["-35px", "35px"]);

    return (
        <div
            className="flex flex-col items-center justify-center h-full w-full relative"
        >
            {/* Tilt Container - Now just Parallax Container (Tilt is Global) */}
            <motion.div
                className="bottom-2 relative w-[95%] max-w-[350px] aspect-square flex items-center justify-center"
                style={{
                    transformStyle: "preserve-3d"
                }}
            >

                {/* Layer 3: Greeting Bubble (Topmost & Parallaxed) */}
                <motion.div
                    className="absolute w-full flex justify-center z-50 pointer-events-none top-[-2.0em] lg:top-[-2.5rem] right-[-1rem]"
                    style={{ x: bubbleX, y: bubbleY, translateZ: 60 }}
                >
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="relative px-5 py-1 rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(156,163,175,1)] border-2 overflow-visible"
                        style={{
                            backgroundColor: COLORS.secondary,
                            color: COLORS.primary,
                            borderColor: COLORS.primary,
                            rotate: 13 // Slight tilt
                        }}
                    >
                        {/* Geometric Tail */}
                        <div
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r-2 border-b-2"
                            style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.secondary }}
                        ></div>

                        {/* Content Wrapper - Masked for text slide */}
                        <div className="font-instrument text-base lg:text-lg leading-none flex items-center gap-1 overflow-hidden relative">
                            {/* Animated Word Wrapper */}
                            <div className="relative grid place-items-center h-[1.3em]">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={greetingIndex}
                                        initial={{ y: "100%", opacity: 0, filter: "blur(1px)" }}
                                        animate={{ y: "-8%", opacity: 1, filter: "blur(0px)" }}
                                        exit={{ y: "-100%", opacity: 0, filter: "blur(1px)" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className="col-start-1 row-start-1 whitespace-nowrap"
                                    >
                                        {GREETINGS[greetingIndex]},
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            {/* Static Word */}
                            <span>Alex here!</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* HUD Corner Brackets */}
                <motion.div
                    className="absolute inset-0 z-[100] pointer-events-none"
                    style={{ x: hudX, y: hudY, translateZ: 20 }}
                >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: COLORS.secondary }}></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: COLORS.secondary }}></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: COLORS.secondary }}></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: COLORS.secondary }}></div>

                    {/* Stamped SVG */}
                    <motion.div
                        className="absolute top-[10px] right-2 opacity-80 mix-blend-multiply pointer-events-none"
                        style={{ rotate: -15, translateZ: 40 }}
                    >
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="46" stroke={COLORS.secondary} strokeWidth="3" strokeDasharray="4 2" />
                            <circle cx="50" cy="50" r="38" stroke={COLORS.secondary} strokeWidth="1" />
                            <path id="curve" d="M24,50 a26,26 0 1,1 52,0" fill="none" />
                            <text fill={COLORS.secondary} fontSize="10" fontWeight="bold" letterSpacing="2" textAnchor="middle">
                                <textPath href="#curve" startOffset="50%">
                                    OFFICIAL
                                </textPath>
                            </text>
                            <text x="50" y="60" fill={COLORS.secondary} fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="middle">
                                VERIFIED
                            </text>
                            <text x="50" y="72" fill={COLORS.secondary} fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                                2017-2025
                            </text>
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Layer 1: SVG Background */}
                <motion.div
                    className="absolute inset-0 w-full h-full z-0 drop-shadow-xl"
                    style={{ x: svgX, y: svgY }}
                >
                    <svg
                        viewBox="0 0 480 480"
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M120 120h120v120H120zM0 240h120v120H0zM120 360h120v120H120zM0 0h120v120H0zM360 120h120v120H360zM240 240h120v120H240zM360 360h120v120H360zM240 0h120v120H240z"
                            fill={COLORS.accent}
                        />
                    </svg>
                </motion.div>

                {/* Layer 2: Portrait Foreground */}
                <motion.div
                    className="absolute inset-0 z-10"
                    style={{ x: imageX, y: imageY }}
                >
                    <img
                        src="https://i.ibb.co.com/27z66gRL/Clean-Shot-2025-12-10-at-05-45-04-removebg-preview.png"
                        alt="Garry Alexander"
                        className="w-full h-full object-cover grayscale"
                        draggable="false"
                    />
                </motion.div>

            </motion.div>
        </div>
    );
};

export default IdentitySection;
