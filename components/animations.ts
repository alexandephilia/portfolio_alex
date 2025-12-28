import { Variants } from 'framer-motion';

// Optimized blur reveal - uses GPU-accelerated properties only
// Key insight: animate opacity and transform separately from filter
// to reduce compositing overhead during fast scroll
export const sectionHeaderVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 8,
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smoother animation
            // Stagger filter slightly after opacity to reduce GPU load
            filter: { duration: 0.5, delay: 0.05 },
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
            staggerChildren: 0.08, // Reduced stagger for faster perceived load
            delayChildren: 0.05,
            // Use "beforeChildren" to ensure container is visible first
            when: "beforeChildren",
        }
    }
};

// Individual item blur reveal - optimized for fast scroll
export const staggerItemVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(6px)',
        y: 6,
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            filter: { duration: 0.4, delay: 0.05 },
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
};

// Blur-only variant (no scale/transform) for simpler animations
export const blurOnlyVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(6px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            filter: { duration: 0.4, delay: 0.05 },
        }
    }
};
