import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Folder, FileCode, FolderClosed } from 'lucide-react';
import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { SkillCategory } from '../types';
import {
    antiFlickerStyle,
    dailyDriverCardVariants,
    dailyDriverContentVariants,
    dailyDriverPillsVariants,
    popRevealVariants,
    sectionHeaderVariants,
    staggerContainerVariants,
    staggerItemVariants,
} from './animations';

export const Skills: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // First category is always visible
    const alwaysVisibleCategory = SKILL_CATEGORIES[0];
    const expandableCategories = SKILL_CATEGORIES.slice(1);

    return (
        <motion.section
            layout
            variants={staggerContainerVariants}
            className="p-6 md:p-8 border-b border-dashed border-gray-200 bg-[#FAFAFA]"
            style={antiFlickerStyle}
        >
            <motion.h2
                variants={sectionHeaderVariants}
                className="text-[10px] md:text-[12px] font-bold text-[rgb(74,108,196)] tracking-wider uppercase mb-6"
            >
                Skills
            </motion.h2>

            <motion.div
                layout="position"
                variants={staggerContainerVariants}
                className="flex flex-col gap-8"
            >
                {/* Engineering (Always Visible) */}
                <KeyboardGroup category={alwaysVisibleCategory} index={0} />

                {/* Expandable Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            variants={{
                                hidden: { 
                                    opacity: 0, 
                                    height: 0, 
                                    filter: 'blur(10px)',
                                    transition: { 
                                        height: { duration: 0.3, ease: 'easeInOut' },
                                        opacity: { duration: 0.2 }
                                    }
                                },
                                visible: { 
                                    opacity: 1, 
                                    height: 'auto', 
                                    filter: 'blur(0px)',
                                    transition: { 
                                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                                        opacity: { duration: 0.3 },
                                        staggerChildren: 0.12,
                                        delayChildren: 0.05
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex flex-col gap-8 overflow-hidden"
                        >
                            {expandableCategories.map((category, index) => (
                                <KeyboardGroup key={index + 1} category={category} index={index + 1} />
                            ))}
                            
                            {/* Architecture Showcase */}
                            <ArchitectureShowcase />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Show More/Less Button - Keyboard Style */}
                <motion.div 
                    layout="position"
                    className="flex justify-center -mt-4 md:-mt-2"
                >
                    <motion.button
                        layout
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                            playClick();
                        }}
                        className="
                            group relative
                            /* Spacebar-like proportions */
                            px-12 py-2 md:px-16 md:py-2.5
                            min-w-[140px] md:min-w-[180px]
                            flex items-center justify-center gap-2
                            
                            /* Social/Keycap Style Adoption */
                            bg-gradient-to-b from-white via-gray-100 to-gray-200
                            border border-gray-300/60
                            rounded-[8px] md:rounded-[10px]

                            /* 3D Depth & Shadows */
                            shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                            md:shadow-[0_3px_0_#d1d5db,0_3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]

                            /* Typography */
                            text-gray-500 font-mono text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]
                            
                            /* Transitions */
                            transition-all duration-100 ease-out

                            /* Hover - Slight Depress */
                            hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                            hover:translate-y-[2px]
                            md:hover:shadow-[0_1.5px_0_#d1d5db,0_1.5px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                            md:hover:translate-y-[1.5px]

                            /* Active - Full Depress */
                            active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)]
                            active:translate-y-[4px]
                            md:active:translate-y-[3px]

                            /* Focus - Clean Focus */
                            outline-none
                        "
                    >
                        {isExpanded ? (
                            <>Show Less <ChevronUp size={14} className="opacity-50" /></>
                        ) : (
                            <>Show More <ChevronDown size={14} className="opacity-50" /></>
                        )}
                    </motion.button>
                </motion.div>
            </motion.div>

            <MacMiniSection />
        </motion.section>
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
            px-3 py-1 md:py-0.5
            rounded-[6px]
            bg-transparent
            border border-dashed border-gray-300
            text-[8px] md:text-[9px] font-bold font-mono text-gray-500 uppercase tracking-widest
            select-none
          ">
                    {category.title}
                </h3>
            </div>

            {/* The Keyboard Chassis */}
            <div className="
        relative
        p-4 md:p-4
        rounded-xl md:rounded-xl
        bg-gradient-to-b from-white to-gray-100
        border border-gray-200
        shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,1)]
        w-full md:max-w-4xl
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
                <motion.div
                    variants={staggerContainerVariants}
                    className="flex flex-wrap gap-1.5 md:gap-2 relative z-10 px-1 py-1"
                >
                    {category.skills.map((skill: string, idx: number) => (
                        <Keycap key={idx} label={skill} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}

const ArchitectureShowcase: React.FC = () => {
    return (
        <motion.div
            layout
            variants={staggerItemVariants}
            className="flex flex-col gap-3 items-start w-full relative z-10"
        >
            <div className="ml-1">
                <h3 className="
                    inline-flex items-center justify-center
                    px-3 py-1 md:py-0.5
                    rounded-[6px]
                    bg-transparent
                    border border-dashed border-gray-300
                    text-[8px] md:text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest
                    select-none
                ">
                    Project Structure (The Hybrid Approach)
                </h3>
            </div>

            {/* Parent Card with Radius Only (No Outer Shadow) */}
            <div className="
                relative
                w-full
                rounded-2xl
                bg-white
                border border-gray-200
                overflow-hidden
            ">
                {/* Recess Depth Layer - Applied to Everything Inside */}
                <div className="
                    absolute inset-0 
                    pointer-events-none 
                    z-30 
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_4px_rgba(0,0,0,0.05),inset_0_-4px_12px_rgba(0,0,0,0.02)]
                    rounded-[inherit]
                " />

                {/* Finder-style Header with Keyboard Gradient */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-linear-to-b from-white to-[#eaeaea] border-b border-gray-200 relative z-20">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-black/40 tracking-wider flex items-center gap-2">
                        <span className="opacity-30">~/</span>
                        Atomic_with_Type_based
                    </div>
                    <div className="w-10" />
                </div>

                {/* Code Content Area - Flushed to Parent Edi */}
                <div className="
                    relative
                    p-6 md:p-10 
                    font-mono text-[11px] md:text-[13px] 
                    leading-relaxed overflow-x-auto no-scrollbar
                    bg-linear-to-b from-[#FFFFFF] to-[#F8F9FB]
                ">
                    <motion.div 
                        variants={staggerContainerVariants}
                        className="flex flex-col relative"
                    >
                        {/* Phase 1: Routing Layer */}
                        <CodeLine depth={0} label="/app" description="# Next.js 15 App Router" isFolder isLast={false} />
                        <CodeLine depth={1} label="/(routes)" isFolder isLast={false} />
                        <CodeLine depth={2} label="/dashboard" description="Layout & Page" isLeaf isLast={false} />
                        <CodeLine depth={2} label="/profile" description="User settings" isLast={true} isLeaf />
                        
                        <div className="h-6" />
                        
                        {/* Phase 2: Domain Layer - Nested Under Flow */}
                        <CodeLine depth={1} label="/features" description="# Business Logic" isFolder isLast={false} />
                        <CodeLine depth={2} label="/checkout" isFolder isLast={false} />
                        <CodeLine depth={3} label="/api" isLast={false} isLeaf />
                        <CodeLine depth={3} label="index.ts" description="Public API" isFile isLast={true} isLeaf />
                        
                        <div className="h-4" />
                        
                        <CodeLine depth={2} label="/user-profile" isFolder isLast={false} />
                        <CodeLine depth={3} label="/hooks" isLast={false} isLeaf />
                        <CodeLine depth={3} label="index.ts" isFile isLast={true} isLeaf />
                        
                        <div className="h-6" />
                        
                        {/* Phase 3: Presentation Layer - Deeper Nesting */}
                        <CodeLine depth={2} label="/components" description="# Atomic Design" isFolder isLast={false} />
                        <CodeLine depth={3} label="/ui" description="Radix primitives" isFolder isLast={false} />
                        <CodeLine depth={4} label="/button.tsx" isLast={false} isLeaf />
                        <CodeLine depth={4} label="/card.tsx" isLast={true} isLeaf />
                        
                        <div className="h-4" />
                        
                        <CodeLine depth={3} label="/layout" isFolder isLast={true} />
                        <CodeLine depth={4} label="/navbar.tsx" isLast={true} isLeaf />
                        
                        <div className="h-6" />
                        
                        {/* Phase 4: Shared Layer - Deepest Utility */}
                        <CodeLine depth={3} label="/lib" isFolder isLast={false} />
                        <CodeLine depth={3} label="/hooks" description="Shared hooks" isFolder isLast={true} />
                        <CodeLine depth={4} label="/use-auth.ts" isLast={true} isLeaf />
                    </motion.div>
                </div>

                {/* Subtile grid/pattern for terminal texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-size-[20px_20px] bg-[radial-gradient(#000_1px,transparent_1px)] z-10" />
            </div>
        </motion.div>
    );
};

const CodeLine: React.FC<{ 
    depth: number, 
    label: string, 
    description?: string, 
    isLeaf?: boolean,
    isFolder?: boolean,
    isFile?: boolean,
    isLast?: boolean
}> = ({ depth, label, description, isLeaf, isFolder, isFile, isLast }) => (
    <motion.div 
        variants={staggerItemVariants}
        className="flex items-center h-7 group relative"
    >
        {/* Tree Line Logic */}
        <div className="flex h-full items-center relative" style={{ width: `${depth * 28}px` }}>
            {Array.from({ length: depth }).map((_, i) => (
                <div 
                    key={i} 
                    className="absolute h-full w-px bg-gray-200/80" 
                    style={{ left: `${i * 28 + 10}px` }}
                />
            ))}
            {depth > 0 && (
                <>
                    {/* Horizontal connector */}
                    <div 
                        className="absolute h-px w-4 bg-gray-200/80" 
                        style={{ left: `${(depth - 1) * 28 + 10}px`, top: '50%' }} 
                    />
                    {/* Corner masking for last item */}
                    {isLast && (
                        <div 
                            className="absolute w-px h-1/2 bg-linear-to-b from-transparent to-white" 
                            style={{ 
                                left: `${(depth - 1) * 28 + 10}px`, 
                                bottom: 0,
                            }} 
                        />
                    )}
                </>
            )}
        </div>

        <div className="flex items-center gap-2.5">
            {isLeaf ? (
                <FileCode size={13} className={`${isFile ? 'text-amber-600' : 'text-gray-400'} group-hover:text-amber-500/70 transition-colors`} />
            ) : (
                <Folder size={13} className="text-black fill-black/5" />
            )}
            
            <span className={`font-bold transition-colors duration-200 ${isLeaf ? (isFile ? 'text-amber-600' : 'text-gray-500') : 'text-black'} group-hover:opacity-70`}>
                {label}
            </span>
            
            {description && (
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] md:text-[10.5px] text-gray-400 font-medium italic ml-2 select-none opacity-60"
                >
                    {description}
                </motion.span>
            )}
        </div>
    </motion.div>
);
const AUDIO_POOL_SIZE = 5;
const audioPool = (typeof Audio !== 'undefined') 
    ? Array.from({ length: AUDIO_POOL_SIZE }, () => {
        const a = new Audio('/click.mp3');
        a.preload = 'auto';
        return a;
    }) 
    : [];
let poolIndex = 0;

const playClick = () => {
    if (audioPool.length === 0) return;
    const sound = audioPool[poolIndex];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
        poolIndex = (poolIndex + 1) % AUDIO_POOL_SIZE;
    }
};

const Keycap: React.FC<{ label: string }> = ({ label }) => {
    return (
        <motion.button
            variants={staggerItemVariants}
            onMouseDown={playClick}
            onTouchStart={(e) => {
                // Prevent double triggering on some mobile browsers
                e.preventDefault();
                playClick();
            }}
            className="
                group relative
                /* Responsive Layout */
                h-7 md:h-8 px-2 md:px-3
                min-w-[max-content]
                flex-grow
                flex items-center justify-center

                /* Social Button Style Adoption */
                bg-gradient-to-b from-white via-gray-100 to-gray-200
                border border-gray-300/60
                rounded-[6px] md:rounded-[6px]

                /* Shadow & 3D Depth (Matches Social Buttons) */
                shadow-[0_4px_0_#d1d5db,0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                md:shadow-[0_3px_0_#d1d5db,0_3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]

                /* Typography (Kept Mono for Keyboard feel) */
                text-gray-600 font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-wide

                /* Transitions */
                transition-transform duration-100 ease-out

                /* Hover Effects - Slight Depress */
                hover:shadow-[0_2px_0_#d1d5db,0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                hover:translate-y-[2px]
                md:hover:shadow-[0_1.5px_0_#d1d5db,0_1.5px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                md:hover:translate-y-[1.5px]

                /* Active / Pressed State - Full Depress */
                active:shadow-[0_0px_0_#d1d5db,inset_0_2px_4px_rgba(0,0,0,0.1)]
                active:translate-y-[4px]
                md:active:translate-y-[3px]

                /* Focus - Clean Focus */
                outline-none
            "
        >
            {label}
        </motion.button>
    )
}

const dailyDriverViewport = {
    once: true,
    amount: 0.25 as const,
};

const MacMiniSection: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={dailyDriverViewport}
            variants={staggerContainerVariants}
            className="mt-12 md:mt-16 flex flex-col gap-6 items-center w-full"
        >
            <motion.div variants={staggerItemVariants} className="relative pb-6">
                <motion.h3
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: 'easeOut' },
                        },
                    }}
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

                <svg
                    className="absolute w-full h-8 md:h-6 bottom-0 md:bottom-1 left-0 text-[rgb(74,108,196)] z-0 pointer-events-none transform -rotate-3"
                    viewBox="0 0 182 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: {
                                    duration: 1.5,
                                    delay: 0.5,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        d="M2 7.5C15 2 30 13 45 7.5C60 2 75 13 90 7.5C105 2 120 13 135 7.5C150 2 165 13 180 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            <motion.div
                variants={dailyDriverCardVariants}
                className="
                    relative
                    w-full
                    p-0
                    rounded-2xl md:rounded-[24px]
                    bg-gradient-to-b from-white to-[#F5F5F7]
                    border border-gray-200
                    shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.03)]
                    overflow-hidden
                    group
                    flex flex-col md:flex-row items-center
                "
            >
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                />

                <motion.div
                    variants={popRevealVariants}
                    className="w-full md:w-5/12 p-8 pb-0 md:pb-8 flex items-center justify-center relative z-10"
                >
                    <div className="relative w-[240px] md:w-[320px] aspect-square flex items-center justify-center">
                        <div className="absolute inset-x-2 bottom-6 h-6 bg-black/20 blur-xl rounded-[100%] transform scale-x-75 group-hover:scale-x-90 group-hover:bg-black/25 transition-transform duration-500" />

                        <img
                            src="/mac_mini.png"
                            alt="Mac Mini M4"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] select-none scale-[1.14] md:scale-[1.20] transition-transform duration-500"
                            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    variants={dailyDriverContentVariants}
                    className="w-full md:w-7/12 p-6 pt-2 md:pt-8 md:pl-4 text-center md:text-left flex flex-col justify-center gap-4 relative z-10"
                >
                    <motion.div variants={dailyDriverContentVariants}>
                        <motion.div
                            variants={dailyDriverContentVariants}
                            className="flex items-center justify-center md:justify-start gap-3 mb-2"
                        >
                            <motion.h4
                                variants={staggerItemVariants}
                                className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight"
                            >
                                Mac mini
                            </motion.h4>
                            <motion.span
                                variants={staggerItemVariants}
                                className="px-2 py-0.5 bg-gradient-to-br from-slate-800 via-slate-600 to-slate-900 rounded text-[10px] font-bold text-white border border-black uppercase tracking-wide"
                            >
                                M4
                            </motion.span>
                        </motion.div>
                        <motion.p
                            variants={staggerItemVariants}
                            className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest"
                        >
                            It's my personal station!
                        </motion.p>
                    </motion.div>

                    <motion.p
                        variants={staggerItemVariants}
                        className="text-[11px] md:text-xs text-gray-600 font-medium leading-relaxed max-w-sm mx-auto md:mx-0 text-center md:text-left"
                    >
                        Compact yet incredibly powerful. This little machine handles my entire development stack from Backend to heavy frontend builds silently and efficiently. I also use multi-screen setup which allow me to do rapid prototyping and testing.
                    </motion.p>

                    <motion.div
                        variants={dailyDriverPillsVariants}
                        className="flex flex-wrap gap-2 justify-center md:justify-start mt-4 md:mt-4"
                    >
                        <SpecBadge>Apple Silicon</SpecBadge>
                        <SpecBadge>16GB Unified</SpecBadge>
                        <SpecBadge>512GB SSD</SpecBadge>
                        <SpecBadge>Remote Access</SpecBadge>
                        <SpecBadge>mac OS Tahoe</SpecBadge>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const SpecBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.span
        variants={staggerItemVariants}
        className="
        px-2 py-0.5
        rounded-[5px]
        /* Premium Gradient & Board */
        bg-linear-to-b from-white via-gray-100 to-gray-200
        border border-gray-300/60
        /* Typography - Micro Scale */
        text-[7.5px] md:text-[8.5px] font-bold text-gray-500 uppercase tracking-widest
        /* Softened 3D Depth */
        shadow-[0_1px_0_#d1d5db,0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
    ">
        {children}
    </motion.span>
)
