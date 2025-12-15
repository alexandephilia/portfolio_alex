import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants';

interface StatItem {
    value: string;
    label: string;
    details: string[];
    borderClasses: string;
    // Position hints for dropdown placement
    isLeftColumn: boolean;
    isTopRow: boolean;
}

const statItems: StatItem[] = [
    {
        value: '1500+',
        label: 'COMMITTED CODES',
        details: [
            'Agnostic ecosystems',
            'Cross-tech approach',
            'Open-source codes',
            'Fail-safe systems'
        ],
        borderClasses: 'border-r-2 border-b-2',
        isLeftColumn: true,
        isTopRow: true
    },
    {
        value: '8+',
        label: 'YEARS EXPERIENCE',
        details: [
            'Stealth startup',
            'Team lead & IC roles',
            'Remote async workflow',
            'Cross-functional collabs'
        ],
        borderClasses: 'border-b-2',
        isLeftColumn: false,
        isTopRow: true
    },
    {
        value: '71%',
        label: 'TECH STACKS EXPLORED',
        details: [
            'Frontend frameworks',
            'Backend architectures',
            'Cloud infrastructure',
            'AI/ML integrations'
        ],
        borderClasses: 'border-r-2',
        isLeftColumn: true,
        isTopRow: false
    },
    {
        value: '4+',
        label: 'CODEBASES LED',
        details: [
            'Architecture decisions',
            'Code review culture',
            'CI/CD pipelines',
            'Project Migration'
        ],
        borderClasses: '',
        isLeftColumn: false,
        isTopRow: false
    }
];

const dropdownVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.92,
        y: -8,
        filter: 'blur(4px)'
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
            staggerChildren: 0.04,
            delayChildren: 0.08
        }
    },
    exit: { 
        opacity: 0, 
        scale: 0.95,
        y: -4,
        filter: 'blur(2px)',
        transition: {
            duration: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
        }
    }
};

const StatCard: React.FC<{ item: StatItem; index: number }> = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // RESPONSIVE positioning:
    // Mobile: vertical (top row = below, bottom row = above)
    // Desktop (md+): horizontal (left col = left side, right col = right side)
    const getDropdownPosition = () => {
        // Mobile positioning (vertical) - negative margins to overlap
        const mobilePos = item.isTopRow 
            ? 'top-full -mt-[28px] left-0' // Top row: menu below, pulled up
            : 'bottom-full -mb-[10px] left-0'; // Bottom row: menu above, pulled down
        
        // Desktop positioning (horizontal)
        const desktopPos = item.isLeftColumn
            ? 'md:right-full md:mr-3 md:top-0 md:left-auto md:bottom-auto md:mt-0 md:mb-0' // Left col: menu on left
            : 'md:left-full md:ml-3 md:top-0 md:right-auto md:bottom-auto md:mt-0 md:mb-0'; // Right col: menu on right
        
        return `${mobilePos} ${desktopPos}`;
    };

    // Arrow position - responsive
    const getArrowPosition = () => {
        // Mobile: arrow at top or bottom based on row
        const mobileArrow = item.isTopRow
            ? '-top-1.5 left-6 border-b-0 border-r-0'
            : '-bottom-1.5 left-6 border-t-0 border-l-0';
        
        // Desktop: arrow on side based on column
        const desktopArrow = item.isLeftColumn
            ? 'md:-right-1.5 md:top-10 md:left-auto md:bottom-auto md:border-b-0 md:border-l-0 md:border-t-2 md:border-r-2'
            : 'md:-left-1.5 md:top-10 md:right-auto md:bottom-auto md:border-t-0 md:border-r-0 md:border-b-2 md:border-l-2';
        
        return `${mobileArrow} ${desktopArrow}`;
    };

    return (
        <motion.div
            className={`${item.borderClasses} flex flex-col justify-center p-4 md:p-6 relative cursor-pointer group`}
            style={{ borderColor: COLORS.secondary }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Stat Content */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <div 
                    className="text-4xl md:text-5xl font-instrument mb-1 transition-colors duration-200" 
                    style={{ color: isHovered ? COLORS.accent : COLORS.secondary }}
                >
                    {item.value}
                </div>
                <div 
                    className="font-mono text-[10px] uppercase tracking-wider opacity-80 transition-opacity duration-200" 
                    style={{ 
                        color: COLORS.secondary,
                        opacity: isHovered ? 1 : 0.8
                    }}
                >
                    {item.label}
                </div>
            </motion.div>

            {/* Floating Dropdown Menu - positioned absolute within the cell */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={`absolute ${getDropdownPosition()} z-[9999] min-w-[160px] max-w-[200px] pointer-events-auto`}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div 
                            className="rounded-xl border-2 shadow-2xl overflow-hidden backdrop-blur-sm"
                            style={{ 
                                backgroundColor: COLORS.primary,
                                borderColor: COLORS.secondary
                            }}
                        >
                            {/* Menu Header */}
                            <div 
                                className="px-4 py-3 border-b-2"
                                style={{ borderColor: COLORS.secondary }}
                            >
                                <div 
                                    className="font-mono text-[9px] uppercase tracking-widest opacity-60 mb-1"
                                    style={{ color: COLORS.secondary }}
                                >
                                    Details
                                </div>
                                <div 
                                    className="font-instrument text-lg font-medium"
                                    style={{ color: COLORS.accent }}
                                >
                                    {item.value} {item.label}
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                {item.details.map((detail, detailIndex) => (
                                    <motion.div
                                        key={detailIndex}
                                        variants={itemVariants}
                                        className="px-3 py-1 flex items-center gap-2 transition-colors duration-150 hover:bg-black/5"
                                    >
                                        <span 
                                            className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                                            style={{ backgroundColor: COLORS.accent }}
                                        />
                                        <span 
                                            className="font-instrument text-sm"
                                            style={{ color: COLORS.secondary }}
                                        >
                                            {detail}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Connector arrow */}
                        <div 
                            className={`absolute w-3 h-3 rotate-45 border-2 ${getArrowPosition()}`}
                            style={{ 
                                backgroundColor: COLORS.primary,
                                borderColor: COLORS.secondary
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const CapabilitiesSection: React.FC = () => {
    return (
        <div className="h-full flex flex-col" style={{ transformStyle: 'flat', overflow: 'visible' }}>
            {/* Intro Text Section */}
            <div
                className="p-6 md:p-6 border-b-2 flex-shrink-0"
                style={{ borderColor: COLORS.secondary }}
            >
                <span 
                    className="text-[10px] font-mono md:text-xs uppercase tracking-widest mb-3 block opacity-80" 
                    style={{ color: COLORS.secondary }}
                >
                    About Me
                </span>
                <h3
                    className="text-lg md:text-xl font-instrument leading-[1.1] uppercase"
                    style={{ color: COLORS.secondary }}
                >
                    I'm Garry Alexander. A full stack engineer who rejects dogma ◦ I build to learn. By pushing agnostic frameworks ◦ I identify the precise tool each problem demands, creating systems that don't just work today ◦ adapt to tomorrow's market chaos.
                </h3>
            </div>

            {/* Hover hint - positioned between intro and grid */}
            <div 
                className="py-0 px-6 text-center border-b-2"
                style={{ borderColor: COLORS.secondary }}
            >
                <span 
                    className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-50 inline-flex items-center gap-2 py-2" 
                    style={{ color: COLORS.secondary }}
                >
                   
                    Hover stats to explore
                </span>
            </div>

            {/* Grid Section - Fills remaining space, overflow visible for dropdowns */}
            <div className="flex-1 grid grid-cols-2" style={{ overflow: 'visible' }}>
                {statItems.map((item, index) => (
                    <StatCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default CapabilitiesSection;
