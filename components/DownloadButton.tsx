import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle2, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface DownloadButtonProps {
    href: string;
    fileName?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ href, fileName = "resume.pdf" }) => {
    const [state, setState] = useState<'idle' | 'draining' | 'success'>('idle');

    const handleDownload = () => {
        if (state !== 'idle') return;

        setState('draining');

        // Simulate high-velocity data preparation ('draining' the vessel)
        setTimeout(() => {
            // Trigger actual download
            const link = document.createElement('a');
            link.href = href;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setState('success');

            // Reset after success
            setTimeout(() => {
                setState('idle');
            }, 3000);
        }, 1800); // 1.8s for the "laminar flow" kinetic event
    };

    // State-driven widths for the elastic morphing - Tightened for a compact fit
    // Using responsive-aware logic for mobile optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const idleWidth = isMobile ? 105 : 118;   // "Download CV" + icon
    const streamWidth = isMobile ? 100 : 110;  // "Streaming_CV"
    const successWidth = isMobile ? 85 : 95;   // "Exported"

    return (
        <motion.button
            onClick={handleDownload}
            disabled={state !== 'idle'}
            animate={{ 
                width: state === 'idle' ? idleWidth : (state === 'draining' ? streamWidth : successWidth),
                scale: state === 'draining' ? 0.98 : 1
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 1.2
            }}
            className="group relative h-8 md:h-9 rounded-lg text-[9px] md:text-xs font-medium active:translate-y-px disabled:cursor-default flex items-center justify-center
                       bg-linear-to-b from-white to-gray-100 border border-gray-200 
                       shadow-[0_5px_10px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)]
                       hover:shadow-[0_5px_10px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
        >
            {/* Clipping Vessel - Safely house liquid and progress while letting text bleed out */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                <AnimatePresence>
                    {state === 'draining' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-blue-100/30 z-0"
                        />
                    )}
                    {state === 'success' && (
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-linear-to-b from-emerald-50 to-emerald-100/40 z-0"
                        />
                    )}
                </AnimatePresence>

                {/* Glowing Conduit Progress Bar (v3.0 Design) */}
                {state === 'draining' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-100/50 backdrop-blur-sm overflow-hidden z-20">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Charging Glow Tip - Tech Blue Pulse */}
                            <motion.div 
                                animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="absolute right-0 top-0 bottom-0 w-8 bg-blue-300/40 blur-[4px]" 
                            />
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Content Layer (3D Flip Animation with Viewport Bleed) */}
            <div className="relative z-30 flex items-center justify-center w-full">
                <AnimatePresence mode="popLayout" initial={false}>
                    {state === 'idle' && (
                        <motion.div
                            key="idle-txt"
                            initial={{ opacity: 0, rotateX: -95, y: 25 }}
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            exit={{ opacity: 0, rotateX: 95, y: -25 }}
                            transition={{ 
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{ transformPerspective: 800 }}
                            className="flex items-center gap-1.5 px-3 whitespace-nowrap"
                        >
                            <Download size={12} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                            <span className="text-gray-600 group-hover:text-gray-900 font-semibold tracking-tight">
                                Download CV
                            </span>
                        </motion.div>
                    )}
                    {state === 'draining' && (
                        <motion.div
                            key="draining-txt"
                            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-1.5 px-2 whitespace-nowrap"
                        >
                            <Loader2 size={11} className="text-blue-600 animate-spin" />
                            <span className="text-[8px] font-mono font-black text-blue-700 uppercase tracking-[0.2em] pl-0.5">
                                Streaming_CV
                            </span>
                        </motion.div>
                    )}
                    {state === 'success' && (
                        <motion.div
                            key="success-txt"
                            initial={{ opacity: 0, rotateX: -95, y: 25 }}
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            exit={{ opacity: 0, rotateX: 95, y: -25 }}
                            transition={{ 
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{ transformPerspective: 800 }}
                            className="flex items-center gap-1.5 px-3 whitespace-nowrap"
                        >
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span className="text-emerald-700 font-bold tracking-tight">
                                Exported
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
};
