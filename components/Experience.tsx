import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { EXPERIENCE } from '../constants';
import { antiFlickerStyle, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Experience: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.div
                variants={staggerContainerVariants} // Staggered reveal for BOTH header items
                className="flex justify-between items-end mb-8"
            >
                <motion.h2 variants={staggerItemVariants} className="text-[10px] md:text-sm font-bold text-[rgb(81,108,180)] tracking-wider uppercase">Experience</motion.h2>
                <motion.a
                    variants={staggerItemVariants}
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[10px] md:text-xs font-medium transition-all bg-gradient-to-b from-white to-gray-100 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] text-gray-600 hover:text-gray-900 hover:shadow-[0_3px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] active:shadow-sm active:translate-y-[1px]"
                >
                    Download Resume
                </motion.a>
            </motion.div>

            <motion.div
                variants={staggerContainerVariants}
                className="flex flex-col gap-8 md:gap-10"
            >
                {EXPERIENCE.map((job) => (
                    <motion.div
                        key={job.id}
                        variants={staggerItemVariants}
                        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8"
                    >
                        <motion.div variants={staggerItemVariants} className="flex flex-col gap-0.5 md:gap-1">
                            <motion.h3 variants={staggerItemVariants} className="text-[11px] md:text-base font-semibold text-gray-900">
                                {job.role} <span className="text-gray-400 font-normal">at</span> {job.company}
                                {job.company === "Realta Chakradarma" && (
                                    <a
                                        href="https://realta.co.id/site/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-baseline ml-1 text-gray-400 hover:text-[rgb(81,108,180)] transition-colors"
                                    >
                                        <ExternalLink size={10} className="self-center translate-y-[-2px]" />
                                    </a>
                                )}
                                {job.company === "Tokio Marine Insurance Group" && (
                                    <a
                                        href="https://www.tokiomarine.com/id/id.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-baseline ml-1 text-gray-400 hover:text-[rgb(81,108,180)] transition-colors"
                                    >
                                        <ExternalLink size={10} className="self-center translate-y-[-2px]" />
                                    </a>
                                )}
                            </motion.h3>
                            <motion.p variants={staggerItemVariants} className="text-gray-500 text-[10px] md:text-sm leading-relaxed max-w-xl">
                                {job.description}
                            </motion.p>
                        </motion.div>
                        <motion.div variants={staggerItemVariants} className="text-[8px] md:text-xs font-medium text-gray-400 uppercase tracking-wide pt-0.5 md:pt-1">
                            {job.period}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
