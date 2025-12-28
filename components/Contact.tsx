import { motion } from 'framer-motion';
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { antiFlickerStyle, blurOnlyVariants, staggerContainerVariants, viewportSettings } from './animations';

const containerVariants = staggerContainerVariants;

export const Contact: React.FC = () => {
    return (
        <section className="p-6 md:p-10 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={blurOnlyVariants}
                className="text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase mb-8"
            >
                Contact
            </motion.h2>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={containerVariants}
                className="flex flex-col gap-4 md:gap-6 w-full"
            >
                {CONTACT_INFO.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={blurOnlyVariants}
                        className="group flex flex-row items-center justify-between py-1 transition-opacity"
                    >
                        <span className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                            {item.label}
                        </span>
                        <span className="text-xs md:text-base text-gray-400 group-hover:text-blue-600 transition-colors text-right">
                            {item.value}
                        </span>
                    </motion.a>
                ))}
            </motion.div>
        </section>
    );
};
