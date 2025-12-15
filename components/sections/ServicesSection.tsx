import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { COLORS, SERVICES } from '../../constants';

interface ServiceItemProps {
    service: typeof SERVICES[0];
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex items-center justify-between p-4 md:p-4 border-b border-black/10 last:border-0 relative overflow-hidden group cursor-pointer"
            style={{ borderColor: `rgba(26, 35, 50, 0.1)` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated Content Container using Grid Stack for height compatibility */}
            <div className="w-[85%] grid grid-cols-1 grid-rows-1">
                {/* Default Content (ID, Title, Description) - Slides Right on Hover */}
                <motion.div
                    className="flex flex-col gap-2 md:gap-3 col-start-1 row-start-1"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ 
                        x: isHovered ? "100%" : "0%", 
                        opacity: isHovered ? 0 : 1 
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="flex items-baseline gap-3 md:gap-4">
                        <span className="font-mono text-sm font-bold opacity-60" style={{ color: COLORS.secondary }}>
                            {service.id}
                        </span>
                        <h3
                            className="text-2xl md:text-3xl font-instrument leading-none uppercase"
                            style={{ color: COLORS.secondary }}
                        >
                            {service.title}
                        </h3>
                    </div>

                    <div className="pl-8 md:pl-10">
                        <p
                            className="font-mono text-[10px] md:text-[11px] leading-relaxed uppercase tracking-wide max-w-[90%]"
                            style={{ color: COLORS.secondary, opacity: 0.8 }}
                        >
                            {service.description}
                        </p>
                    </div>
                </motion.div>

                {/* Detail Content - Slides in from Left on Hover */}
                <motion.div
                    className="flex flex-col gap-2 col-start-1 row-start-1 justify-center"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ 
                        x: isHovered ? "0%" : "-100%", 
                        opacity: isHovered ? 1 : 0 
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                    {/* Tools Pills */}
                    <div className="flex flex-wrap gap-2">
                        {service.tools?.map((tool) => (
                            <span 
                                key={tool} 
                                className="border rounded-full px-2 py-0.5 text-[9px] uppercase font-mono leading-none tracking-tight"
                                style={{ borderColor: COLORS.accent, opacity: 0.7, color: COLORS.accent }}
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                     <p
                        className="font-mono text-[10px] md:text-[11px] leading-relaxed uppercase tracking-wide font-medium"
                        style={{ color: COLORS.secondary }}
                    >
                        {service.detail}
                    </p>
                </motion.div>
            </div>

            {/* Right Icon (Star) - Stays Static but rotates */}
            <div className="flex-shrink-0 z-10 bg-inherit pl-2">
                <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-12 md:h-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M12 2V22" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
                    <path d="M2 12H22" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
                    <path d="M4.92896 4.92896L19.0711 19.0711" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
                    <path d="M4.92896 19.0711L19.0711 4.92896" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
            </div>
        </div>
    );
};

const ServicesSection: React.FC = () => {
    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ transformStyle: 'flat' }}>
            <div className="flex-1 flex flex-col">
                {SERVICES.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default ServicesSection;