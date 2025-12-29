import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Project } from '../types';
import { staggerContainerVariants, staggerItemVariants } from './animations';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

// Local override if specific exit is needed, but we'll use central for consistency
// Local variant for the card - handles entrance blur AND staggers children
export const projectCardVariants: Variants = {
    hidden: { 
        opacity: 0, 
        filter: 'blur(14px)', 
        y: 12,
        z: 0
    },
    visible: { 
        opacity: 1, 
        filter: 'blur(0px)', 
        y: 0,
        z: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            when: "beforeChildren",
            staggerChildren: 0.12,
            filter: { duration: 0.7, delay: 0.05 },
        }
    }
};

// Shimmer component for loading state
const Shimmer: React.FC = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
        style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
        }}
    />
);

// Add shimmer keyframes to document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    if (!document.querySelector('[data-shimmer-style]')) {
        style.setAttribute('data-shimmer-style', 'true');
        document.head.appendChild(style);
    }
}

// Lazy image component with shimmer
const LazyImage: React.FC<{ src: string; alt: string; blur?: number }> = ({ src, alt, blur }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-[16px]">
            {/* Shimmer placeholder */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-gray-200 overflow-hidden rounded-[16px]">
                    <Shimmer />
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-[16px]">
                    <span className="text-gray-400 text-xs text-center px-4">Image Unavailable</span>
                </div>
            )}

            {/* Actual image */}
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-top md:object-center select-none rounded-[16px]"
                style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    filter: blur ? `blur(${blur}px)` : undefined,
                }}
            />

            {/* Static Glossy Film Overlay REMOVED based on request */}
        </div>
    );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const Icon = project.icon;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={projectCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{
                willChange: 'opacity, filter, transform',
                zIndex: isHovered ? 20 : 1 // Dynamic z-index prevents overlap
            }}
            className="relative group w-full md:w-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)} // Toggle for mobile/touch
        >
            {/* Concept 2: The "Augmented Architecture" Ghost-Deck — Bottom Variety */}
            {project.stack && project.stack.length > 0 && (
                <>
                    {/* Desktop version - original layout */}
                    <motion.div
                        className="hidden md:block absolute inset-x-6 bottom-0 z-0"
                        initial={{ y: 0, opacity: 0, scale: 0.98 }}
                        animate={{
                            y: isHovered ? 44 : 0,
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.98
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 18,
                            mass: 0.8
                        }}
                    >
                        <div className="w-full h-14 rounded-b-[20px] bg-[#FAFAFA] border-x border-b border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.06)] px-6 flex items-center justify-between relative">
                            {/* Stripped Lines Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 5px)' }} />
                            <div className="absolute top-0 right-0 w-4 h-4 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 5px)' }} />
                            <div className="absolute bottom-0 left-0 w-4 h-4 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 5px)' }} />
                            <div className="absolute bottom-0 right-0 w-4 h-4 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 5px)' }} />

                            {/* Stack Insight Label - Fixed Left */}
                            <div className="text-[9px] font-mono font-bold text-[rgb(74,108,196)] uppercase tracking-[0.2em] opacity-60 border-r border-gray-200 pr-6 h-4 flex items-center flex-shrink-0 relative z-10">
                                Stack Insight
                            </div>

                            {/* Centered Scrollable Tech Stack */}
                            <div className="flex-1 min-w-0 flex flex-row items-center justify-center gap-4 px-4 relative z-10 overflow-x-auto no-scrollbar">
                                {project.stack.map((item, i) => (
                                    <span key={i} className="text-[10px] font-mono font-medium text-gray-500 whitespace-nowrap flex items-center gap-1.5 transition-colors duration-300 hover:text-gray-900">
                                        <span className="w-1 h-1 rounded-full bg-[rgb(74,108,196)]/30" />
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Confidential Tag - Fixed Right */}
                            <div className="flex items-center gap-1.5 text-[8px] font-mono text-[rgb(126,150,210)] font-bold uppercase relative z-10 border-l border-gray-200 pl-6 h-4 flex-shrink-0">
                                Confidential
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile version - wrapping layout to show all items */}
                    <motion.div
                        className="md:hidden absolute inset-x-2 z-0"
                        style={{ bottom: 'calc(var(--spacing) * 2)' }}
                        initial={{ y: 0, opacity: 0, scale: 0.98 }}
                        animate={{
                            y: isHovered ? 52 : 0,
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.98
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 18,
                            mass: 0.8
                        }}
                    >
                        <div className="w-full py-2 px-3 rounded-b-[16px] bg-[#FAFAFA] border-x border-b border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
                            {/* Stack Insight Label */}
                            <div className="text-[8px] font-mono font-bold text-[rgb(74,108,196)] uppercase tracking-[0.15em] opacity-60 mb-1.5 text-center">
                                Stack Insight
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                                {project.stack.map((item, i) => (
                                    <span key={i} className="text-[8px] font-mono font-medium text-gray-500 whitespace-nowrap flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-[rgb(74,108,196)]/30" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            {/* Outer Rim Container */}
            <div
                className="w-full rounded-[24px] p-[4px] backdrop-blur-[25px] transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
                style={{
                    background: `linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)`,
                    boxShadow: 'rgba(0, 0, 0, 0.13) 0px 8px 10px, rgba(0, 0, 0, 0.05) 0px 4px 4px'
                }}
            >
                <div
                    className="w-full bg-white rounded-[20px] overflow-hidden flex flex-row border border-[rgba(0,0,0,0.05)] md:min-h-[240px]"
                >
                    {/* Left Content (Text) */}
                    <div className="flex-1 p-3 md:p-6 flex flex-col items-start gap-1.5 md:gap-3 justify-center relative z-10 overflow-hidden">

                        {/* Icon as background overlay shifted slightly right */}
                        <div className="absolute -bottom-8 -left-4 md:-bottom-6 md:-left-10 text-gray-100/80 pointer-events-none z-0 rotate-[-12deg]">
                            <Icon size={140} strokeWidth={1} className="md:w-[160px] md:h-[160px]" />
                        </div>

                        <div className="flex flex-col gap-1 md:gap-2 relative z-10">
                            <motion.div variants={staggerItemVariants} className="flex items-start justify-between gap-4 w-full relative z-10">
                                <h3 className="text-base md:text-xl font-bold text-gray-900 leading-tight flex-1">
                                    {project.title}
                                </h3>
                                <div className="hidden md:flex shrink-0 items-center gap-1.5 p-px rounded-full relative group-hover:opacity-0 translate-x-0 group-hover:translate-x-2 mt-1 overflow-hidden"
                                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #E5E7EB, #E5E7EB 1px, transparent 1px, transparent 3px)' }}>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-linear-to-b from-white to-gray-50/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_-1px_1px_rgba(255,255,255,0.8)] border border-transparent">
                                        <div className="w-1 h-1 rounded-full bg-gray-400 opacity-50 font-mono" />
                                        <span className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                                            Hover Me
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                            {/* Description with expandable on mobile */}
                            <motion.div variants={staggerItemVariants} className="relative">
                                <p className={`text-gray-500 leading-relaxed text-[11px] md:text-sm md:line-clamp-none ${isExpanded ? '' : 'line-clamp-2'}`}>
                                    {project.description}
                                </p>
                                {/* Fade gradient overlay when collapsed on mobile */}
                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none md:hidden" />
                                )}
                            </motion.div>
                            {/* Read more toggle - mobile only */}
                            <motion.button
                                variants={staggerItemVariants}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(!isExpanded);
                                }}
                                className="flex items-center gap-0.5 text-[10px] text-[rgb(74,108,196)] font-medium mt-0.5 md:hidden"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                                <ChevronDown
                                    size={12}
                                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                />
                            </motion.button>
                        </div>

                        <motion.div
                            variants={staggerItemVariants}
                            className="mt-1 pt-1 relative z-20"
                        >
                            {project.category === 'Works' ? (
                                <div className="flex flex-col gap-0.5">
                                    {project.company && (
                                        <div className="text-[10px] md:text-xs font-bold text-[rgb(74,108,196)] uppercase tracking-tight">
                                            {project.company}
                                        </div>
                                    )}
                                    {project.date && (
                                        <div className="text-[8px] md:text-[10px] font-semibold text-gray-400 font-mono uppercase">
                                            {project.date}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {project.isRedacted ? (
                                        <button
                                            disabled
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] md:text-xs font-bold bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                                        >
                                            NDA Protected
                                        </button>
                                    ) : project.status === 'Live' ? (
                                        <a
                                            href={project.linkUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] md:text-xs font-bold transition-transform bg-linear-to-b from-white to-gray-100 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] text-gray-700 hover:text-gray-900 hover:shadow-[0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] active:shadow-sm active:translate-y-px group/btn"
                                        >
                                            View Case Study
                                            <ArrowRight size={12} className="text-gray-400 group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-blue-500" />
                                        </a>
                                    ) : (
                                        <span className="inline-block px-3 py-1.5 rounded-md border border-gray-200 text-gray-400 text-[10px] md:text-xs font-medium bg-gray-50 cursor-not-allowed">
                                            Coming Soon
                                        </span>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Image Area - Width adjusted for mobile side-by-side */}
                    <div className="w-[35%] md:w-[45%] shrink-0 h-auto p-1 bg-gray-50 flex flex-col justify-center border-l border-gray-100">
                        <div className="w-full h-full md:min-h-full rounded-[16px] overflow-hidden relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.12),inset_0_-1px_2px_rgba(255,255,255,0.6)] bg-gray-100 border border-black/5 flex items-center justify-center">
                            {project.isRedacted ? (
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[16px] p-2">
                                    <div className="absolute inset-0 scale-110">
                                        <LazyImage src={project.imageUrl} alt={project.title} blur={10} />
                                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                                    </div>

                                    <motion.div
                                        initial={{ rotate: -12, scale: 1.8, opacity: 0 }}
                                        animate={{ rotate: -15, scale: 1, opacity: 0.8 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.1
                                        }}
                                        className="relative z-10 w-full flex justify-center"
                                    >
                                        <div className="relative group/stamp max-w-full overflow-hidden">
                                            {/* Stamp Body */}
                                            <div className="px-2 py-1 md:px-6 md:py-3 border-2 md:border-4 border-white rounded-[2px] flex items-center justify-center stamp-texture">
                                                <span className="text-[10px] sm:text-xs md:text-xl font-sans font-black text-white uppercase tracking-widest whitespace-nowrap select-none">
                                                    Under NDA
                                                </span>
                                            </div>

                                            {/* Ink bleed effect (subtle glow) */}
                                            <div className="absolute inset-0 border-2 md:border-4 border-white/20 blur-[0.5px] -z-10" />
                                        </div>
                                    </motion.div>

                                    {/* Gritty overlay */}
                                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                                </div>
                            ) : (
                                <>
                                    <LazyImage src={project.imageUrl} alt={project.title} />
                                    {/* Inner shadow overlay */}
                                    <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)]" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
