import { motion } from 'framer-motion';
import React from 'react';
import { staggerContainerVariants, viewportSettings } from './animations';

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string; // Allow passing classes for layout/styling
    id?: string;
    style?: React.CSSProperties;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, id, style }) => {
    return (
        <motion.div
            id={id}
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
        >
            {children}
        </motion.div>
    );
};
