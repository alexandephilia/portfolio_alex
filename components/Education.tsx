import { motion } from 'framer-motion';
import React from 'react';
import { EDUCATION } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Education: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                className="mb-8"
            >
                <h2 className="text-[10px] md:text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase">Education</h2>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainerVariants}
                className="flex flex-col gap-8 md:gap-10"
            >
                {EDUCATION.map((edu) => (
                    <motion.div
                        key={edu.id}
                        variants={staggerItemVariants}
                        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8"
                    >
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <h3 className="text-[11px] md:text-base font-semibold text-gray-900">
                                {edu.degree} <span className="text-gray-400 font-normal">at</span> {edu.institution.split(' · ')[0]}
                            </h3>
                            <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed max-w-xl">
                                {edu.institution.split(' · ').slice(1).join(' · ')}
                            </p>
                        </div>
                        <div className="text-[8px] md:text-xs font-medium text-gray-400 uppercase tracking-wide pt-0.5 md:pt-1">
                            {edu.period}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
