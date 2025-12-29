import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { BEYOND_WORK_IMAGES } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';
import { Bookshelf } from './Bookshelf';

export const BeyondWork: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Duplicate for seamless loop
    const images = [...BEYOND_WORK_IMAGES, ...BEYOND_WORK_IMAGES];

    const handleTouchStart = (idx: number) => {
        setIsPaused(true);
        setActiveIndex(idx);
    };

    const handleTouchEnd = () => {
        setIsPaused(false);
        setActiveIndex(null);
    };

    return (
        <section className="py-10 border-t border-dashed border-gray-200 bg-[#FAFAFA] overflow-hidden" style={antiFlickerStyle}>
            <div className="px-6 md:px-10 mb-8">
                <motion.h2
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase"
                >
                    Beyond Work
                </motion.h2>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainerVariants}
                className="relative w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex gap-4 md:gap-6 w-max pl-6 pb-8 md:pb-10 marquee-track"
                    style={{
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    {images.map((src, idx) => (
                        <motion.div
                            key={idx}
                            variants={staggerItemVariants}
                            className={`group relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] shrink-0 rounded-[16px] p-[3px] transition-all duration-300 shadow-[0_8px_10px_rgba(0,0,0,0.13),0_4px_4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 ${activeIndex === idx ? 'shadow-xl -translate-y-1' : ''}`}
                            style={{
                                background: `linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)`,
                                willChange: 'transform'
                            }}
                            onTouchStart={() => handleTouchStart(idx)}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                        >
                            {/* Inner Container - slight padding */}
                            <div className="w-full h-full bg-white rounded-[14px] p-1.5 border border-[rgba(0,0,0,0.05)] transition-all duration-300 group-hover:border-[rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)]">
                                <div className="w-full h-full rounded-[10px] overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={src}
                                        alt="Beyond work photography"
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
                                        className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform select-none grayscale group-hover:grayscale-0 group-hover:scale-105 ${activeIndex === idx ? 'grayscale-0 scale-105' : ''}`}
                                        style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                                    />
                                    {/* Inset shadow overlay */}
                                    <div className="absolute inset-0 rounded-[10px] pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),inset_0_-1px_2px_rgba(0,0,0,0.05)]" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CSS for marquee animation */}
                <style>{`
                .marquee-track {
                    animation: marquee 40s linear infinite;
                    will-change: transform;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
            </motion.div>

            {/* Interactive Bookshelf */}
            <div className="mt-8 px-6 md:px-10">
                <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="mb-8"
                >
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Reading List</h3>
                    <p className="text-gray-500 text-sm">Curated collection of thoughts and inspirations.</p>
                </motion.div>
                <Bookshelf />
            </div>
        </section>
    );
};
