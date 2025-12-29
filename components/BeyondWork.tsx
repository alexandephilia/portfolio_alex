import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
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
                    className="text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase"
                >
                    Beyond Work
                </motion.h2>
            </div>

            <motion.div
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
                        <LazyImage 
                            key={`${idx}-${src}`} 
                            src={src} 
                            index={idx} 
                            activeIndex={activeIndex} 
                            onTouchStart={(i) => handleTouchStart(i)} 
                            onTouchEnd={handleTouchEnd}
                        />
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
