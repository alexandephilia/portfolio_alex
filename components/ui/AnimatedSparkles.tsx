import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedSparklesProps {
    className?: string;
    size?: number;
    color?: string;
}

const AnimatedSparkles: React.FC<AnimatedSparklesProps> = ({ className, size = 24, color = "currentColor" }) => {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{ overflow: 'visible' }}
        >
            {/* Big Star - Center */}
            <motion.path
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962l6.135-1.582a2 2 0 0 0 1.437-1.437l1.582-6.135a.5.5 0 0 1 .962 0l1.582 6.135a2 2 0 0 0 1.437 1.437l6.135 1.582a.5.5 0 0 1 0 .962l-6.135 1.582a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0l-1.582-6.135z"
                fill={color}
                stroke="none"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
            />

            {/* Small Star - Top Right */}
            <motion.path
                d="M20 3v4"
                stroke={color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
            <motion.path
                d="M22 5h-4"
                stroke={color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />

            {/* Small Star - Bottom Left */}
            <motion.path
                d="M4 18v4"
                stroke={color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [1, 0, 1],
                    opacity: [1, 0, 1],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
             <motion.path
                d="M6 20h-4"
                stroke={color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [1, 0, 1],
                    opacity: [1, 0, 1],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />


        </motion.svg>
    );
};

export default AnimatedSparkles;
