import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { STACK_INSIGHTS } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, viewportSettings } from './animations';

export const StackInsights: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cycleStack = () => {
        setCurrentIndex((prev) => (prev + 1) % STACK_INSIGHTS.length);
    };

    return (
        <section className="p-6 md:p-10 bg-[#FAFAFA] border-b border-dashed border-gray-200" style={antiFlickerStyle}>
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                className="text-[10px] md:text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase mb-12"
            >
                The 3 AM Stack
            </motion.h2>

            <div className="relative h-[450px] md:h-[400px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout">
                    {STACK_INSIGHTS.map((insight, index) => {
                        // Calculate relative position in the stack
                        const isTop = index === currentIndex;
                        const isBottom = (index + 1) % STACK_INSIGHTS.length === currentIndex;
                        const isMiddle = !isTop && !isBottom;
                        
                        // We only actually render the top few or all depending on visual needs
                        // For a simple stack of 3, we can render all but change their Z and transform
                        
                        // Position logic: 0 is top, 1 is middle, 2 is bottom
                        const position = (index - currentIndex + STACK_INSIGHTS.length) % STACK_INSIGHTS.length;
                        
                        if (position > 2) return null; // Only show top 3 layers

                        return (
                            <motion.div
                                key={insight.id}
                                onClick={isTop ? cycleStack : undefined}
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: 50,
                                    rotateX: -10
                                }}
                                animate={{ 
                                    opacity: 1 - position * 0.15,
                                    scale: 1 - position * 0.05,
                                    y: position * -12,
                                    z: -position * 50,
                                    rotateX: 0,
                                    rotateZ: position * (index % 2 === 0 ? 1 : -1), // Slight messy stack feel
                                    cursor: isTop ? 'pointer' : 'default',
                                    zIndex: STACK_INSIGHTS.length - position
                                }}
                                exit={{ 
                                    opacity: 0,
                                    x: 300,
                                    rotateZ: 20,
                                    transition: { duration: 0.4, ease: "easeIn" }
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 25
                                }}
                                style={{ 
                                    position: 'absolute',
                                    width: '100%',
                                    maxWidth: '500px'
                                }}
                                className="group"
                            >
                                {/* Digital Paper / Card Rim */}
                                <div className="rounded-[32px] p-[4px] shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
                                    <div 
                                        className="rounded-[28px] overflow-hidden"
                                        style={{
                                            background: `linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)`,
                                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 10px 30px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <div className="bg-white m-[1px] rounded-[27px] p-6 md:p-10 flex flex-col gap-6 relative overflow-hidden min-h-[320px]">
                                            {/* Decorative Corner Screws or Elements */}
                                            <div className="absolute top-4 right-4 opacity-10">
                                                <div className="w-8 h-8 rounded-full border-2 border-[rgb(81,108,180)]" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <span className="
                                                    inline-flex self-start px-2.5 py-1 
                                                    rounded-[6px] 
                                                    bg-gradient-to-b from-white via-gray-100 to-gray-200 
                                                    border border-gray-300/60 
                                                    shadow-[0_2px_0_#d1d5db,0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]
                                                    text-[9px] md:text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest
                                                ">
                                                    {insight.category}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-2">
                                                    {insight.title}
                                                </h3>
                                            </div>

                                            <div className="flex-1">
                                                <p className="font-serif italic text-lg md:text-xl text-gray-600 leading-relaxed">
                                                    {insight.text}
                                                </p>
                                            </div>

                                            {isTop && (
                                                <div className="flex justify-end pt-4">
                                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] animate-pulse">
                                                        Click to Cycle →
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
};
