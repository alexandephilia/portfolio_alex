import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Project } from '../types';
import { staggerItemVariants } from './animations';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

// Local override if specific exit is needed, but we'll use central for consistency
export const projectCardVariants = staggerItemVariants;

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
                whileHover={!blur ? { scale: 1.05 } : {}}
                className="w-full h-full object-cover object-top md:object-center select-none rounded-[16px]"
                style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    filter: blur ? `blur(${blur}px)` : undefined,
                }}
            />

            {/* Static Glossy Film Overlay (Top-Left Light Source) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[16px]">
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        // Smooth partial gradient from top-left corner - Opacity reduced
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 60%)',
                        mixBlendMode: 'overlay',
                        filter: 'contrast(1.1)',
                    }}
                />

                {/* Subtle outer top-left highlight - Opacity reduced */}
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-[16px]"
                    style={{
                        background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 40%)',
                        mixBlendMode: 'screen'
                    }}
                />
            </div>
        </div>
    );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const Icon = project.icon;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            variants={projectCardVariants}
            style={{ willChange: 'opacity, filter, transform' }}
            className="relative group w-full md:w-full"
        >
            {/* Outer Rim Container */}
            <div
                className="w-full rounded-[24px] p-[4px] backdrop-blur-[25px] transition-all duration-300 group-hover:-translate-y-1"
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
                            <h3 className="text-base md:text-xl font-bold text-gray-900 leading-tight">
                                {project.title}
                            </h3>
                            {/* Description with expandable on mobile */}
                            <div className="relative">
                                <p className={`text-gray-500 leading-relaxed text-[11px] md:text-sm md:line-clamp-none ${isExpanded ? '' : 'line-clamp-2'}`}>
                                    {project.description}
                                </p>
                                {/* Fade gradient overlay when collapsed on mobile */}
                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none md:hidden" />
                                )}
                            </div>
                            {/* Read more toggle - mobile only */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(!isExpanded);
                                }}
                                className="flex items-center gap-0.5 text-[10px] text-[rgb(81,108,180)] font-medium mt-0.5 md:hidden"
                            >
                                {isExpanded ? 'Show less' : 'Read more'}
                                <ChevronDown
                                    size={12}
                                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>

                        <div className="mt-1 pt-1 relative z-20">
                            {project.category === 'Works' ? (
                                <div className="flex flex-col gap-0.5">
                                    {project.company && (
                                        <div className="text-[10px] md:text-xs font-bold text-[rgb(81,108,180)] uppercase tracking-tight">
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
                                            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all bg-gradient-to-b from-white to-gray-100 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] text-gray-700 hover:text-gray-900 hover:shadow-[0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] active:shadow-sm active:translate-y-[1px] group/btn"
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
                        </div>
                    </div>

                    {/* Right Image Area - Width adjusted for mobile side-by-side */}
                    <div className="w-[35%] md:w-[45%] shrink-0 h-auto p-1 bg-gray-50 flex flex-col justify-center border-l border-gray-100">
                        <div className="w-full h-full md:min-h-full rounded-[16px] overflow-hidden relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.12),inset_0_-1px_2px_rgba(255,255,255,0.6)] bg-gray-100 border border-black/5 flex items-center justify-center">
                            {project.isRedacted ? (
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[16px]">
                                    <div className="absolute inset-0 scale-110">
                                        <LazyImage src={project.imageUrl} alt={project.title} blur={14} />
                                        <div className="absolute inset-0 bg-white/20" />
                                    </div>
                                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                                    <motion.div
                                        initial={{ rotate: -12, scale: 0.9, opacity: 0 }}
                                        animate={{ rotate: -12, scale: 1, opacity: 1 }}
                                        className="relative z-10"
                                    >
                                        <div
                                            className="px-3 py-1.5 md:px-6 md:py-3 border-[1.5px] md:border-[2px] border-black/50 rounded-sm bg-white/73 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                                            style={{
                                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)`,
                                                backgroundColor: 'rgb(255 255 255 / 73%)'
                                            }}
                                        >
                                            <span className="text-[9.1px] md:text-base font-sans font-black text-black uppercase tracking-[0.15em] md:tracking-[0.3em] whitespace-nowrap">
                                                REDACTED UNDER NDA
                                            </span>
                                        </div>
                                    </motion.div>
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
