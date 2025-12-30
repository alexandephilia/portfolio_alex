import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { BEYOND_WORK_IMAGES } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants } from './animations';
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
                    className="text-sm font-bold text-[rgb(74,108,196)] tracking-wider uppercase"
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

const LazyImage: React.FC<{
    src: string;
    index: number;
    activeIndex: number | null;
    onTouchStart: (idx: number) => void;
    onTouchEnd: () => void;
}> = ({ src, index, activeIndex, onTouchStart, onTouchEnd }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "50% 0px 50% 0px", once: true });
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            ref={ref}
            variants={staggerItemVariants}
            className={`group relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] shrink-0 rounded-[16px] p-[3px] transition-transform duration-300 shadow-[0_8px_10px_rgba(0,0,0,0.13),0_4px_4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 ${activeIndex === index ? 'shadow-xl -translate-y-1' : ''}`}
            style={{
                background: `linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)`,
                willChange: 'transform'
            }}
            onTouchStart={() => onTouchStart(index)}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
        >
            {/* Inner Container */}
            <div className="w-full h-full bg-white rounded-[14px] p-1.5 border border-[rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:border-[rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="w-full h-full rounded-[10px] overflow-hidden bg-gray-100 relative">
                    {isInView && (
                        <img
                            src={src}
                            alt="Beyond work photography"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onLoad={() => setIsLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out transform select-none grayscale group-hover:grayscale-0 group-hover:scale-105 ${activeIndex === index ? 'grayscale-0 scale-105' : ''} ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
                            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                        />
                    )}
                    {/* Inset shadow overlay */}
                    <div className="absolute inset-0 rounded-[10px] pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),inset_0_-1px_2px_rgba(0,0,0,0.05)]" />
                </div>
            </div>
        </motion.div>
    );
};
