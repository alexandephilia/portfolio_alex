import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { DownloadButton } from './DownloadButton';
import { EXPERIENCE } from '../constants';
import { antiFlickerStyle, staggerContainerVariants, staggerItemVariants, viewportSettings } from './animations';

export const Experience: React.FC = () => {
    return (
        <section className="p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]" style={antiFlickerStyle}>
            <motion.div
                variants={staggerContainerVariants} // Staggered reveal for BOTH header items
                className="flex justify-between items-end mb-8"
            >
                <motion.h2 variants={staggerItemVariants} className="text-[10px] md:text-sm font-bold text-[rgb(74,108,196)] tracking-wider uppercase">Experience</motion.h2>
                <DownloadButton href="/resume.pdf" fileName="Garry_Alexander_Resume.pdf" />
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
                                        className="inline-flex items-baseline ml-1 text-gray-400 hover:text-[rgb(74,108,196)] transition-colors"
                                    >
                                        <ExternalLink size={10} className="self-center translate-y-[-2px]" />
                                    </a>
                                )}
                                {job.company === "Tokio Marine Insurance Group" && (
                                    <a
                                        href="https://www.tokiomarine.com/id/id.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-baseline ml-1 text-gray-400 hover:text-[rgb(74,108,196)] transition-colors"
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
