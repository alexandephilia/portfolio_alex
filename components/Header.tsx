import React from 'react';
import { SOCIAL_LINKS } from '../constants';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-6 md:p-10 border-b border-dashed border-gray-200 bg-[#FAFAFA]">
            <div className="flex flex-col gap-2">
                {/* Branding Logo */}
                <img
                    src="/name.png"
                    alt="alex.exit(0)"
                    className="h-6 md:h-8 w-auto object-contain"
                />

                {/* Availability Pill - Below the name */}
                <div className="flex items-center">
                    <div className="
                        inline-flex items-center gap-1.5
                        px-2 py-1 md:px-2.5 md:py-1
                        bg-gradient-to-b from-emerald-100/80 to-emerald-50
                        rounded-full
                        border border-emerald-200/50
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.08)]
                    ">
                        <span className="relative flex items-center justify-center h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/60 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_3px_rgba(16,185,129,0.5)]"></span>
                        </span>
                        <span className="font-mono text-[8px] md:text-[9px] font-semibold text-emerald-700 uppercase tracking-[0.06em] whitespace-nowrap leading-none">
                            Available to Work
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 md:gap-3">
                {SOCIAL_LINKS.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className={`
                            flex items-center justify-center
                            w-8 h-8 md:w-10 md:h-10
                            rounded-lg md:rounded-xl
                            transition-all duration-150
                            ${link.buttonStyle}
                        `}
                    >
                        <link.icon className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
                    </a>
                ))}
            </div>
        </header>
    );
};
