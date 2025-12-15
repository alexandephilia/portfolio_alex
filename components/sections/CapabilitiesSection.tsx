import React, { useState, useRef, useEffect } from 'react';
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
        label: 'TECH STACKS',
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

// Shared Floating Menu Component
const FloatingMenu: React.FC<{ 
    activeIndex: number | null; 
    items: StatItem[]; 
    cellRefs: React.MutableRefObject<(HTMLDivElement | null)[]> 
}> = ({ activeIndex, items, cellRefs }) => {
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
    const [arrowStyle, setArrowStyle] = useState<string>('');
    const [arrowRotation, setArrowRotation] = useState(45);
    const [arrowTop, setArrowTop] = useState<string | undefined>(undefined);
    
    // We need to persist the LAST active item to show it during the exit animation
    // otherwise the content disappears before the menu fades out.
    const [activeItem, setActiveItem] = useState<StatItem | null>(null);

    // Calculate position whenever activeIndex changes
    // Use layout effect to prevent visual flash of wrong position
    React.useLayoutEffect(() => {
        if (activeIndex === null) {
            return;
        }
        
        // Update active item immediately on entry/change
        setActiveItem(items[activeIndex]);

        const targetCell = cellRefs.current[activeIndex];
        if (!targetCell) return;

        const item = items[activeIndex];
        const rect = targetCell.getBoundingClientRect();
        
        const parentRect = targetCell.offsetParent?.getBoundingClientRect();
        if (!parentRect) return;

        // Relative coordinates
        const relTop = rect.top - parentRect.top;
        const relLeft = rect.left - parentRect.left;
        const width = rect.width;
        const height = rect.height;

        const isMobile = window.innerWidth < 768; // md breakpoint
        
        // Calculate styles
        let newStyle: React.CSSProperties = {
            position: 'absolute',
            zIndex: 9999,
            width: 'auto',
            minWidth: '160px',
            maxWidth: '200px',
        };

        let newArrowClass = '';
        let newRotation = 45;
        let arrowTopPercent: string | undefined = undefined; // Default undefined to let CSS classes work on mobile

        if (isMobile) {
            // Mobile: vertical positioning (unchanged mostly)
            if (item.isTopRow) {
                newStyle.top = relTop + height - 28;
                newStyle.left = relLeft;
                newArrowClass = '-top-1.5 left-6'; 
                newRotation = 45; // UP
            } else {
                newStyle.top = relTop - 175; 
                newStyle.left = relLeft; 
                newArrowClass = '-bottom-1.5 left-6';
                newRotation = 225; // DOWN
            }
        } else {
            // Desktop: horizontal positioning with SEAM centering
            let seamY = 0;
            if (item.isTopRow) {
                seamY = relTop + height;
            } else {
                seamY = relTop;
            }
            
            const estimatedHeight = 180;
            newStyle.top = seamY - (estimatedHeight / 2);

            const cellCenterY = relTop + (height / 2);
            const menuTopY = newStyle.top as number;
            const arrowY = cellCenterY - menuTopY;
            
            arrowTopPercent = `${arrowY}px`;

            if (item.isLeftColumn) {
                newStyle.left = relLeft - 180 - 12; 
                newArrowClass = '-right-1.5'; 
                newRotation = 135; 
            } else {
                newStyle.left = relLeft + width + 12;
                newArrowClass = '-left-1.5';
                newRotation = -45;
            }
        }

        setMenuStyle(newStyle);
        setArrowStyle(newArrowClass);
        setArrowRotation(newRotation);
        setArrowTop(arrowTopPercent);

    }, [activeIndex, items]); 

    // Safety: don't render anything until we have a valid item
    // But for Exit animation, activeIndex is null. activeItem persists.
    const displayItem = activeIndex !== null ? items[activeIndex] : activeItem;
    // Also ensure we have calculated style (at least top/left)
    // Only verify we have processed the activeIndex.
    if (!displayItem) return null;
    
    // We need to destructure top/left for the animation prop
    const { top, left, ...restStyle } = menuStyle;
    
    return (
        <AnimatePresence>
            {activeIndex !== null && top !== undefined && left !== undefined && (
                <motion.div
                    className="absolute pointer-events-auto"
                    style={{ ...restStyle, zIndex: 9999 }} // apply width/zIndex via style
                    
                    // Explicit Animation for Position (Replaces Layout)
                    // This creates the "Glide" effect when coordinates change,
                    // but prevents the "Jump from 0" on initial entry.
                    initial={{ 
                        opacity: 0, 
                        scale: 0.95,
                        top: top, // Start at calculated position
                        left: left 
                    }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        top: top, // Animate to new position
                        left: left
                    }}
                    exit={{ 
                        opacity: 0, 
                        scale: 0.95, 
                        transition: { duration: 0.1 } 
                    }}
                    transition={{
                        // Use spring for movement (top/left)
                        top: { type: "spring", stiffness: 300, damping: 28 },
                        left: { type: "spring", stiffness: 300, damping: 28 },
                        // Standard easing for opacity/scale
                        default: { duration: 0.2 }
                    }}
                >
                     <div 
                        className="rounded-xl border-2 shadow-2xl overflow-hidden backdrop-blur-sm relative"
                        style={{ 
                            backgroundColor: COLORS.primary,
                            borderColor: COLORS.secondary,
                            width: '200px'
                        }}
                    >
                        {/* Menu Header */}
                        <div 
                            className="px-4 py-3 border-b-2"
                            style={{ borderColor: COLORS.secondary }}
                        >
                            <motion.div
                                key={`header-${displayItem.label}`} // Use stable ID
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
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
                                    {displayItem.value} {displayItem.label}
                                </div>
                            </motion.div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            {displayItem.details.map((detail, detailIndex) => (
                                <motion.div
                                    key={`${displayItem.label}-${detailIndex}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { delay: 0.05 + detailIndex * 0.05 }
                                    }}
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

                    {/* Connector arrow - Animated Rotation & Position */}
                    <motion.div 
                        className={`absolute w-3 h-3 border-t-2 border-l-2 ${arrowStyle}`}
                        animate={{ 
                            rotate: arrowRotation,
                            ...(arrowTop ? { top: arrowTop } : {}) // Only animate top if defined (Desktop)
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 28 // Match menu damping
                        }}
                        style={{ 
                            backgroundColor: COLORS.primary,
                            borderColor: COLORS.secondary,
                            transformOrigin: "center center"
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const StatCard: React.FC<{ 
    item: StatItem; 
    index: number; 
    onHover: (idx: number | null) => void;
    setRef: (el: HTMLDivElement | null) => void;
}> = ({ item, index, onHover, setRef }) => {
    return (
        <motion.div
            ref={setRef}
            className={`${item.borderClasses} flex flex-col justify-center p-4 md:p-6 relative cursor-pointer group`}
            style={{ borderColor: COLORS.secondary }}
            onMouseEnter={() => onHover(index)}
        >
            {/* Stat Content */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <div 
                    className="text-4xl md:text-5xl font-instrument mb-1 transition-colors duration-200 group-hover:text-[var(--accent)]" 
                    style={{ color: COLORS.secondary }}
                >
                    {item.value}
                </div>
                <div 
                    className="font-mono text-[10px] uppercase tracking-wider opacity-80 transition-opacity duration-200" 
                    style={{ 
                        color: COLORS.secondary,
                    }}
                >
                    {item.label}
                </div>
            </motion.div>
        </motion.div>
    );
};

const CapabilitiesSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

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

            {/* Stats Grid - flex-1 to fill remaining space */}
            <div 
                className="flex-1 grid grid-cols-2 relative" 
                style={{ transformStyle: 'flat', overflow: 'visible' }}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {statItems.map((item, index) => (
                    <StatCard 
                        key={index} 
                        item={item} 
                        index={index}
                        onHover={setHoveredIndex}
                        setRef={(el) => cellRefs.current[index] = el}
                    />
                ))}

                {/* Shared Floating Menu - Rendered on top of grid */}
                <FloatingMenu 
                    activeIndex={hoveredIndex} 
                    items={statItems} 
                    cellRefs={cellRefs} 
                />
            </div>
        </div>
    );
};

export default CapabilitiesSection;
