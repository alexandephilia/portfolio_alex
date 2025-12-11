import React from 'react';
import { Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { COLORS, SOCIAL_LINKS } from '../../constants';

// Animated Mail Icon Component matching App.tsx
const AnimatedMailIcon = ({ className }: { className?: string }) => {
  const paperVariants: Variants = {
    initial: { y: 0, opacity: 0 },
    hover: {
      y: -8,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
      
      {/* Paper Sliding Out */}
      <motion.g
        variants={paperVariants}
      >
         <rect x="6" y="6" width="12" height="10" fill="currentColor" rx="1" stroke="none" />
         <path d="M8 9h8 M8 12h5" stroke={COLORS.accent} strokeWidth="1.5" />
      </motion.g>
    </motion.svg>
  );
};

// Animated Download Icon Component
const AnimatedDownloadIcon = ({ className }: { className?: string }) => {
  const arrowVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: [0, 4, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <motion.g variants={arrowVariants}>
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </motion.g>
    </motion.svg>
  );
};

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
            Based in Jakarta, Indonesia, I am available to work globally, remote working is preferred to maximize my efficiency and shipping.
          </p>
        </div>
         
        {/* Two Square Grid Buttons */}
        <div 
          className="grid grid-cols-2 w-full mx-auto border-t-2 border-b-2 mt-4 overflow-hidden"
          style={{ borderColor: COLORS.secondary, aspectRatio: '3/1' }}
        >
          <motion.a 
            href="mailto:4lexander31@gmail.com" 
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden hover:text-[#e4e687]"
            style={{ color: COLORS.secondary }}
            initial="initial"
            whileHover="hover"
          >
            <motion.div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: COLORS.accent }}
            />
            <div className="relative z-10">
              <AnimatedMailIcon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 group-hover:text-[#e4e687]" />
            </div>
            <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 transition-colors duration-300 group-hover:text-[#e4e687]">CONTACT</span>
            
            {/* Divider */}
            <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: COLORS.secondary }}></div>
          </motion.a>

           <motion.a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden hover:text-[#e4e687]"
            style={{ color: COLORS.secondary }}
            initial="initial"
            whileHover="hover"
          >
             <motion.div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: COLORS.accent }}
            />
            <div className="relative z-10">
              <AnimatedDownloadIcon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 group-hover:text-[#e4e687]" />
            </div>
            <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 transition-colors duration-300 group-hover:text-[#e4e687]">RESUME</span>
          </motion.a>
        </div>

        {/* Social Links: Centered Flex Layout */}
        <div className="flex items-center justify-center gap-4 w-full mt-2 px-6">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center border-2 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(181,88,57)]"
                style={{ 
                  borderColor: COLORS.secondary, 
                  color: COLORS.secondary,
                  borderRadius: '8px' 
                }}
                aria-label={link.label}
                whileHover="hover"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: COLORS.secondary }} 
                />
                
                <div className="relative z-10 transition-colors duration-300 group-hover:text-[#e4e687]">
                  <link.icon size={22} />
                </div>
              </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-6 pb-6 pt-2 shrink-0">
         <div 
           className="w-full pt-4 border-t-2 opacity-70 border-dotted" 
           style={{ borderColor: COLORS.secondary }}
         >
          <div className="flex justify-between text-[10px] md:text-xs font-instrument uppercase tracking-widest" style={{ color: '#000000ff' }}>
             <span>©Alexander</span>
             <span>2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;