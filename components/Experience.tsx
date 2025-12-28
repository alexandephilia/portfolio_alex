import { motion } from 'framer-motion';
import React from 'react';
import { EXPERIENCE } from '../constants';
import { antiFlickerStyle, sectionHeaderVariants, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Experience: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                className="flex justify-between items-end mb-8"
            >
                <h2 className="text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase">Experience</h2>
                <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-medium transition-all bg-gradient-to-b from-white to-gray-100 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] text-gray-600 hover:text-gray-900 hover:shadow-[0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] active:shadow-sm active:translate-y-[1px]"
                >
                    Download Resume
                </a>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainerVariants}
                className="flex flex-col gap-8 md:gap-10"
            >
                {EXPERIENCE.map((job) => (
                    <motion.div
                        key={job.id}
                        variants={staggerItemVariants}
                        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8"
                    >
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <h3 className="text-[15px] md:text-base font-semibold text-gray-900">
                                {job.role} <span className="text-gray-400 font-normal">at</span> {job.company}
                            </h3>
                            <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed max-w-xl">
                                {job.description}
                            </p>
                        </div>
                        <div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wide pt-0.5 md:pt-1">
                            {job.period}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
