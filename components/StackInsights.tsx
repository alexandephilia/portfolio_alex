import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { STACK_INSIGHTS } from '../constants';
import { antiFlickerStyle, floatingStaggerItemVariants, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const StackInsights: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const bringToFront = (index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    return (
        <section className="p-6 md:p-10 bg-[#FAFAFA] border-b border-dashed border-gray-200 overflow-hidden relative" style={antiFlickerStyle}>
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                className="text-[10px] md:text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase mb-4"
            >
                The 3 AM Stack
            </motion.h2>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainerVariants}
                className="relative h-[280px] md:h-[300px] flex items-end justify-center perspective-1000 pt-6"
            >
                <AnimatePresence>
                    {STACK_INSIGHTS.map((insight, index) => {
                        // Advanced physics: Calculate position relative to whichever one is focused.
                        // This allows clicking any tab to bring it to the front.
                        const position = (index === currentIndex) ? 0 : 
                                         (index > currentIndex) ? index - currentIndex : 
                                         (STACK_INSIGHTS.length - currentIndex + index);
                        
                        const isTop = index === currentIndex;
                        
                        // Precise horizontal offsets for desktop - using fixed per-card locations
                        const desktopOffsets = [8, 38, 70];
                        const mobileOffsets = [15, 38, 61];

                        return (
                            <motion.div
                                key={insight.id}
                                variants={floatingStaggerItemVariants}
                                style={{ 
                                    position: 'absolute',
                                    bottom: '-130px', 
                                    width: '100%',
                                    maxWidth: '520px',
                                    touchAction: 'none',
                                    // Dynamically set zIndex via style to avoid animation conflict/override issues if put in animate
                                    zIndex: STACK_INSIGHTS.length - position,
                                }}
                                className="group"
                            >
                                <motion.div
                                    drag="y"
                                    dragConstraints={{ top: -55, bottom: 0 }} 
                                    dragElastic={0.05} 
                                    onDragStart={() => bringToFront(index)}
                                    onDragEnd={(_, info) => {
                                        if (isTop && info.offset.y < -45) {
                                            setCurrentIndex((prev) => (prev + 1) % STACK_INSIGHTS.length);
                                        }
                                    }}
                                    animate={{ 
                                        y: position * -12, 
                                        x: position * (index % 2 === 0 ? 8 : -8), 
                                        rotateZ: position * (index % 2 === 0 ? 0.4 : -0.4), 
                                        scale: 1 - position * 0.015,
                                        cursor: isTop ? 'grab' : 'pointer',
                                    }}
                                    whileDrag={{ 
                                        cursor: 'grabbing', 
                                        rotateZ: 0,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 45 
                                    }}
                                >
                                {/* Folder Tab - Restored rounded/gradient style */}
                                <div 
                                    className={`
                                        absolute -top-5 h-6 rounded-t-[10px] 
                                        px-3 md:px-4 pt-1
                                        flex items-start w-fit
                                        transition-all duration-300
                                        cursor-grab active:cursor-grabbing
                                        pointer-events-auto
                                    `}
                                    style={{
                                        left: typeof window !== 'undefined' && window.innerWidth > 768 
                                            ? `${desktopOffsets[index % 3]}%` 
                                            : `${mobileOffsets[index % 3]}%`,
                                        background: `linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)`,
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        borderBottom: 'none',
                                        boxShadow: '0 -2px 6px rgba(0,0,0,0.02)',
                                        zIndex: 10
                                    }}
                                >
                                    <span className={`
                                        text-[7px] md:text-[9px] font-mono uppercase tracking-widest whitespace-nowrap
                                        ${isTop ? 'font-black text-gray-700' : 'font-bold text-gray-400'}
                                    `}>
                                        {insight.category}
                                    </span>
                                </div>

                                {/* Folder Body - Restored white gradient */}
                                <div className={`
                                    rounded-t-[24px] rounded-b-none p-[3px] 
                                    shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                                    ${!isTop ? 'pointer-events-none' : 'pointer-events-auto'}
                                `}>
                                    <div 
                                        className="rounded-t-[21px] rounded-b-none overflow-hidden"
                                        style={{
                                            background: `linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)`,
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            borderBottom: 'none',
                                            minHeight: '320px' 
                                        }}
                                    >
                                        <div className="p-7 md:p-9 flex flex-col gap-4 relative overflow-hidden h-full">
                                            {/* Brand Overlays - Archival Watermarks */}
                                            {insight.id === "1" && (
                                                <img 
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1200px-Claude_AI_symbol.svg.png"
                                                    alt="Claude Symbol"
                                                    decoding="async"
                                                    className="absolute -top-4 -right-4 w-32 h-32 opacity-[0.1] grayscale object-contain pointer-events-none select-none"
                                                    style={{ transform: 'rotate(15deg)' }}
                                                />
                                            )}
                                            {insight.id === "2" && (
                                                <img 
                                                    src="https://framerusercontent.com/images/lfSBU4EhKcMg3iGg98L2F1ESfA.jpg"
                                                    alt="Cursor AI"
                                                    decoding="async"
                                                    className="absolute -top-3 -right-4 w-auto h-32 opacity-[0.1] object-contain pointer-events-none select-none rounded-xl shadow-2xl"
                                                    style={{ transform: 'rotate(10deg)' }}
                                                />
                                            )}
                                            {insight.id === "3" && (
                                                <img 
                                                    src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAg1AAZAA0"
                                                    alt="Framer Motion Logo"
                                                    decoding="async"
                                                    className="absolute -top-4 -right-4 w-32 h-32 opacity-[0.1] object-contain pointer-events-none select-none"
                                                    style={{ transform: 'rotate(12deg)' }}
                                                />
                                            )}
                                            
                                            <div className="flex flex-col gap-1 relative z-10">
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                                                    {insight.title}
                                                </h3>
                                            </div>

                                            <div className="flex-1 relative z-10">
                                                <p className="font-mono text-[11px] md:text-[13px] text-gray-700 leading-snug tracking-tighter font-medium">
                                                    {insight.text}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
                                                <div className="h-0 flex-1 border-t border-dashed border-gray-300" />
                                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.25em] font-mono">
                                                    Archive // PULL
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};
