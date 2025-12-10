import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { COLORS, SOCIAL_LINKS } from '../../constants';

const ContactSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6 md:gap-8 w-full">
        <div className="text-center w-full">
          <h2 className="text-3xl md:text-3xl font-instrument mb-2 leading-none" style={{ color: COLORS.secondary }}>LET'S TALK</h2>
          <p className="font-mono font-bold text-xs md:text-xs uppercase tracking-widest opacity-60" style={{ color: COLORS.secondary }}>
            Based in Jakarta, working globally (remote is preferred) 
            <span className="inline-flex align-middle ml-1.5 rounded-full border" style={{ borderColor: COLORS.primary }}>
              <Globe size={13} strokeWidth={2} />
            </span>
          </p>
        </div>
         
        {/* Dual Button Layout - Symmetrical Swiss Style */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full">
           <a 
            href="mailto:4lexander31@gmail.com" 
            className="group relative w-full md:w-auto px-6 py-3 font-bold flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 rounded-xl md:rounded-r-2xl md:rounded-l-md"
            style={{ 
              backgroundColor: COLORS.secondary, 
              color: COLORS.primary,
              border: `2px solid ${COLORS.secondary}`,
            }}
          >
            <span className="relative z-10 text-base tracking-wide">CONTACT</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:rotate-45 group-hover:translate-x-1" />
            <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: COLORS.accent }}
            />
          </a>

           <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full md:w-auto px-6 py-3 font-bold flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 rounded-xl md:rounded-l-2xl md:rounded-r-md"
            style={{ 
              backgroundColor: COLORS.secondary, 
              color: COLORS.primary,
              border: `2px solid ${COLORS.secondary}`,
            }}
          >
            <span className="relative z-10 text-base tracking-wide">RESUME</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:rotate-45 group-hover:translate-x-1" />
             <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-0"
              style={{ backgroundColor: COLORS.accent }}
            />
          </a>
        </div>

        {/* Social Links: Centered Flex Layout */}
        <div className="flex items-center justify-center gap-4 w-full mt-2">
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group relative w-12 h-12 flex items-center justify-center border-2 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(181,88,57)]"
              style={{ 
                borderColor: COLORS.secondary, 
                color: COLORS.secondary,
                borderRadius: '8px' 
              }}
              aria-label={link.label}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: COLORS.secondary }} 
              />
              <link.icon 
                size={22} 
                className="relative z-10 transition-colors duration-300 group-hover:text-[#e4e687]"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-6 pb-6 pt-2 shrink-0">
         <div 
           className="w-full pt-4 border-t-2 opacity-70 border-dashed" 
           style={{ borderColor: COLORS.secondary }}
         >
          <div className="flex justify-between text-[10px] md:text-xs font-instrument uppercase tracking-widest" style={{ color: '#161515ff' }}>
             <span>Made by Alexander</span>
             <span>© 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;