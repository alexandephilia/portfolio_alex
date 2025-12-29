import { motion } from 'framer-motion';
import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { SkillCategory } from '../types';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Skills: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.h2
                variants={sectionHeaderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="text-[10px] md:text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase mb-8"
            >
                Skills
            </motion.h2>

            <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="flex flex-col gap-10"
            >
                {SKILL_CATEGORIES.map((category, index) => (
                    <KeyboardGroup key={index} category={category} index={index} />
                ))}
            </motion.div>

            <MacMiniSection />
        </section>
    );
};

const KeyboardGroup: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
    return (
        <motion.div
            variants={staggerItemVariants}
            className="flex flex-col gap-3 items-start w-full"
        >
            {/* Category Header - Transparent with Dashed Border */}
            <div className="ml-1">
                <h3 className="
            inline-flex items-center justify-center
            px-3 py-1.5
            rounded-[6px]
            bg-transparent
            border border-dashed border-gray-300
            text-[8px] md:text-xs font-bold font-mono text-gray-500 uppercase tracking-widest
            select-none
          ">
                    {category.title}
                </h3>
            </div>

            {/* The Keyboard Chassis */}
            <div className="
        relative
        p-4 md:p-5
        rounded-xl md:rounded-2xl
        bg-gradient-to-b from-white to-gray-100
        border border-gray-200
        shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,1)]
        w-full
      ">
                {/* Decorative Screws */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 w-2 h-2 rounded-full bg-gray-300 border border-gray-400/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-400/50 transform rotate-45" />
                    <div className="h-[1px] w-full bg-gray-400/50 absolute transform rotate-45" />
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-2 h-2 rounded-full bg-gray-300 border border-gray-400/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-400/50 transform rotate-45" />
                    <div className="h-[1px] w-full bg-gray-400/50 absolute transform rotate-45" />
                </div>
                <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-2 h-2 rounded-full bg-gray-300 border border-gray-400/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-400/50 transform rotate-45" />
                    <div className="h-[1px] w-full bg-gray-400/50 absolute transform rotate-45" />
                </div>
                <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-2 h-2 rounded-full bg-gray-300 border border-gray-400/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] flex items-center justify-center">
                    <div className="w-[1px] h-full bg-gray-400/50 transform rotate-45" />
                    <div className="h-[1px] w-full bg-gray-400/50 absolute transform rotate-45" />
                </div>

                {/* Keys Container */}
                <div className="flex flex-wrap gap-1.5 md:gap-3 relative z-10 px-1 py-1">
                    {category.skills.map((skill: string, idx: number) => (
                        <Keycap key={idx} label={skill} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

// Shared audio instance for keyboard clicks to avoid multiple object creations
const clickSound = typeof Audio !== 'undefined' ? new Audio('/click.mp3') : null;
if (clickSound) {
    clickSound.preload = 'auto';
}

const Keycap: React.FC<{ label: string }> = ({ label }) => {
    const playClick = () => {
        if (!clickSound) return;

        // Reset and play for snappy feedback
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.error("Audio playback failed:", err));
    };

    return (
        <motion.button
            onClick={playClick}
            className="
                group relative
                /* Responsive Layout */
                h-7 md:h-10 px-2 md:px-5
                min-w-[max-content]
                flex-grow
                flex items-center justify-center

                /* Social Button Style Adoption */
                bg-gradient-to-b from-white via-gray-100 to-gray-200
                border border-gray-300/60
                rounded-[6px] md:rounded-[8px]

                /* Shadow & 3D Depth (Matches Social Buttons) */
                shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]

                /* Typography (Kept Mono for Keyboard feel) */
                text-gray-600 font-mono text-[8px] md:text-[11px] font-bold uppercase tracking-wide

                /* Transitions */
                transition-all duration-100 ease-out

                /* Hover Effects - Slight Depress */
                hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                hover:translate-y-[2px]

                /* Active / Pressed State - Full Depress */
                active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)]
                active:translate-y-[4px]

                /* Focus */
                outline-none focus:ring-2 focus:ring-blue-500/20
            "
        >
            {label}
        </motion.button>
    )
}

const MacMiniSection: React.FC = () => {
    return (
        <motion.div
            variants={staggerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="mt-24 flex flex-col gap-6 items-center w-full"
        >
            <div className="relative pb-6">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="
                        font-serif italic
                        text-4xl md:text-5xl
                        text-gray-500
                        tracking-wide
                        transform -rotate-3
                        select-none
                        relative z-10
                    "
                >
                    My Daily Driver
                </motion.h3>
                {/* Squiggle Lines SVG - Animated and Tilted */}
                <svg
                    className="absolute w-full h-8 md:h-6 bottom-0 md:bottom-2 left-0 text-[rgb(81,108,180)] z-0 pointer-events-none transform -rotate-3"
                    viewBox="0 0 182 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.5,
                            delay: 0.5,
                            ease: "easeInOut"
                        }}
                        d="M2 7.5C15 2 30 13 45 7.5C60 2 75 13 90 7.5C105 2 120 13 135 7.5C150 2 165 13 180 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="
                    relative
                    w-full
                    p-0
                    rounded-2xl md:rounded-[24px]
                    /* Lighter gradient as requested */
                    bg-gradient-to-b from-white to-[#F5F5F7]
                    border border-gray-200
                    shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.03)]
                    overflow-hidden
                    group
                "
            >
                {/* Background Dot Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                    }}
                />

                <div className="flex flex-col md:flex-row items-center relative z-10">
                    {/* Image Section */}
                    <div className="w-full md:w-5/12 p-8 pb-0 md:pb-8 flex items-center justify-center">
                        <div
                            className="relative w-[180px] md:w-[220px] aspect-square flex items-center justify-center"
                        >
                            {/* Floating Shadow */}
                            <div className="absolute inset-x-4 bottom-6 h-6 bg-black/20 blur-xl rounded-[100%] transform scale-x-75 group-hover:scale-x-90 group-hover:bg-black/25 transition-all duration-500" />

                            <img
                                src="https://www.datalogicsindia.com/Apple/mac_mini/mac_mini_M4/assets/Hero.png"
                                alt="Mac Mini M4"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] select-none"
                                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-7/12 p-6 pt-2 md:pt-8 md:pl-0 text-center md:text-left flex flex-col justify-center">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <h4 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">Mac mini</h4>
                                    <span className="px-2 bg-gradient-to-br from-slate-800 via-slate-600 to-slate-900py-0.5 rounded text-[10px] font-bold bg-black text-white border border-black uppercase tracking-wide">
                                        M4
                                    </span>
                                </div>
                                <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    It's my personal station!
                                </p>
                            </div>

                            <p className="text-[11px] md:text-sm text-gray-600 font-medium leading-relaxed max-w-sm mx-auto md:mx-0 text-center md:text-left">
                                Compact yet incredibly powerful. This little machine handles my entire development stack from Backend to heavy frontend builds silently and efficiently. I also use multi-screen setup which allow me to do rapid prototyping and testing.
                            </p>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                                <SpecBadge>Apple Silicon</SpecBadge>
                                <SpecBadge>16GB Unified</SpecBadge>
                                <SpecBadge>512GB SSD</SpecBadge>
                                <SpecBadge>Remote Access</SpecBadge>
                                <SpecBadge>mac OS Tahoe</SpecBadge>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const SpecBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="
        px-2.5 py-1
        rounded-[6px]
        bg-white/60 border border-gray-200/50
        text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wide
        shadow-sm backdrop-blur-sm
    ">
        {children}
    </span>
)
