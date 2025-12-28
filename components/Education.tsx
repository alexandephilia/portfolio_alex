import { motion } from 'framer-motion';
import React from 'react';
import { EDUCATION } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Education: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                className="text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase mb-8"
            >
                Education
            </motion.h2>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainerVariants}
                className="flex flex-col gap-4 md:gap-6"
            >
                {EDUCATION.map((edu) => (
                    <motion.div
                        key={edu.id}
                        variants={staggerItemVariants}
                        className="flex flex-col gap-0.5 md:gap-1"
                    >
                        <h3 className="text-[15px] md:text-base font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider">
                            {edu.institution}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
