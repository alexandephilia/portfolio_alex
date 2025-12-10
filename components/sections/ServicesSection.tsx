import React from 'react';
import { motion } from 'framer-motion';
import { COLORS, SERVICES } from '../../constants';

const ServicesSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="flex-1 flex flex-col">
        {SERVICES.map((service, index) => (
          <div 
            key={service.id}
            className="flex items-center justify-between p-4 md:p-4 border-b border-black/10 last:border-0"
            style={{ borderColor: `rgba(26, 35, 50, 0.1)` }}
          >
            {/* Left Content */}
            <div className="flex flex-col gap-2 md:gap-3 w-[85%]">
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
            </div>

            {/* Right Icon (Star) */}
            <div className="flex-shrink-0">
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
                  <path d="M12 2V22" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H22" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.92896 4.92896L19.0711 19.0711" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.92896 19.0711L19.0711 4.92896" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round"/>
               </motion.svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;