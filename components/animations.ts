import { Variants } from 'framer-motion';

// Optimized blur reveal - uses GPU-accelerated properties only
// Key insight: animate opacity and transform separately from filter
// to reduce compositing overhead during fast scroll
export const sectionHeaderVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(14px)',
        y: 8,
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            filter: { duration: 0.7, delay: 0.05 },
        }
    }
};

// Shared blur reveal for staggered children
export const staggerContainerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12, 
            delayChildren: 0.1,
            when: "beforeChildren",
        }
    }
};

// Individual item blur reveal - optimized for fast scroll
export const staggerItemVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(14px)',
        y: 6,
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
            filter: { duration: 0.6, delay: 0.05 },
        }
    }
};

// Floating variant for Bookshelf - deeper slide from bottom
export const floatingStaggerItemVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(14px)',
        y: 60,
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // Quasi-spring "float" ease
            filter: { duration: 0.8, delay: 0.05 },
        }
    }
};

// Floating variant for Bookshelf (Top) - slide from top
export const floatingTopStaggerItemVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(14px)',
        y: -60,
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // Quasi-spring "float" ease
            filter: { duration: 0.8, delay: 0.05 },
        }
    }
};

// Viewport settings - increased margin to trigger earlier
// This prevents animations from starting when element is barely visible
export const viewportSettings = {
    once: true,
    amount: 0.1 as const, // Trigger when 10% visible (more reliable than margin)
};

// Anti-flicker styles for GPU compositing stability
// Apply to parent containers of animated elements
export const antiFlickerStyle: React.CSSProperties = {
    transform: 'translateZ(0)', // Force GPU layer
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    perspective: '1000px',
    WebkitPerspective: '1000px',
    willChange: 'transform, opacity, filter',
};

// Pop reveal for images (Daily Driver)
export const popRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        filter: 'blur(14px)',
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.6, // Sequence after card reveal
            filter: { duration: 0.6, delay: 0.6 },
        }
    }
};

// Blur-only variant (no scale/transform) for simpler animations
export const blurOnlyVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(14px)',
        willChange: "transform, opacity, filter",
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
            filter: { duration: 0.6, delay: 0.05 },
        }
    }
};
