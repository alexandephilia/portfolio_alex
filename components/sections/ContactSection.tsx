import React from 'react';
import { Mail, Download, Globe } from 'lucide-react';
import { COLORS, SOCIAL_LINKS } from '../../constants';

const ContactSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 gap-3 md:gap-3 w-full">
        <div className="text-center w-full px-6">
          <div className="flex items-center justify-center gap-2 mb-0 opacity-80" style={{ color: COLORS.secondary }}>
             <p className="font-instrument text-2xl md:text-2xl mb-1">I'm available for</p>
             <span className="inline-flex align-middle rounded-full border p-0.5" style={{ borderColor: COLORS.secondary }}>
              <Globe size={11} strokeWidth={2} />
             </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {['Full-time', 'Contract', 'Freelance'].map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 border rounded-full text-[10px] md:text-xs font-instrument italic tracking-widest uppercase cursor-default"
                style={{ 
                  backgroundColor: COLORS.secondary, 
                  borderColor: COLORS.secondary, 
                  color: '#e4e687' 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className=" font-bold text-[9px] md:text-[10px] uppercase tracking-widest opacity-60 max-w-[280px] mx-auto" style={{ color: COLORS.secondary }}>
            Based in Indonesia, willing to be working globally (remote is favorable) 
          </p>
        </div>
         
        {/* Two Square Grid Buttons */}
        <div 
          className="grid grid-cols-2 w-full mx-auto border-t-2 border-b-2 mt-4 overflow-hidden"
          style={{ borderColor: COLORS.secondary, aspectRatio: '3/1' }}
        >
           <a 
            href="mailto:4lexander31@gmail.com" 
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden hover:text-[#e4e687]"
            style={{ color: COLORS.secondary }}
          >
            <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: COLORS.secondary }}
            />
            <Mail className="relative z-10 w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 group-hover:text-[#e4e687]" />
            <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 transition-colors duration-300 group-hover:text-[#e4e687]">CONTACT</span>
            
            {/* Divider */}
            <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: COLORS.secondary }}></div>
          </a>

           <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden hover:text-[#e4e687]"
            style={{ color: COLORS.secondary }}
          >
             <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: COLORS.secondary }}
            />
            <Download className="relative z-10 w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 group-hover:text-[#e4e687]" />
            <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 transition-colors duration-300 group-hover:text-[#e4e687]">RESUME</span>
          </a>
        </div>

        {/* Social Links: Centered Flex Layout */}
        <div className="flex items-center justify-center gap-4 w-full mt-2 px-6">
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
             <span>©Alexander</span>
             <span>2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;