import React from 'react';
import { COLORS } from '../../constants';

const CapabilitiesSection: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Intro Text Section */}
      <div 
        className="p-6 md:p-6 border-b-2 flex-shrink-0" 
        style={{ borderColor: COLORS.secondary }}
      >
        <span className=" text-[10px] font-mono md:text-xs uppercase tracking-widest mb-3 block opacity-80" style={{ color: COLORS.secondary }}>
          About Me
        </span>
        <h3 
          className="text-lg md:text-xl font-instrument leading-[1.1] uppercase"
          style={{ color: COLORS.secondary }}
        >
        I'm Garry Alexander. A full stack engineer who rejects dogma—I build to learn. By pushing agnostic frameworks to find solution—exact right tool for the job, discover what truly scales delivering system that survives the rapid of changes.</h3>
      </div>

      {/* Grid Section - Fills remaining space */}
      <div className="flex-1 grid grid-cols-2">
         {/* Item 1: Top Left */}
         <div 
           className="border-r-2 border-b-2 flex flex-col justify-center p-4 md:p-6"
           style={{ borderColor: COLORS.secondary }}
         >
            <div className="text-4xl md:text-5xl font-instrument mb-1" style={{ color: COLORS.secondary }}>1500+</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-80" style={{ color: COLORS.secondary }}>COMMITED CODES</div>
         </div>
         
         {/* Item 2: Top Right */}
         <div 
           className="border-b-2 flex flex-col justify-center p-4 md:p-6"
           style={{ borderColor: COLORS.secondary }}
         >
            <div className="text-4xl md:text-5xl font-instrument mb-1" style={{ color: COLORS.secondary }}>8+</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-80" style={{ color: COLORS.secondary }}>YEARS EXPERIENCE</div>
         </div>

         {/* Item 3: Bottom Left */}
         <div 
           className="border-r-2 flex flex-col justify-center p-4 md:p-6"
           style={{ borderColor: COLORS.secondary }}
         >
            <div className="text-4xl md:text-5xl font-instrument mb-1" style={{ color: COLORS.secondary }}>71%</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-80" style={{ color: COLORS.secondary }}>TECH STACKS EXPLORED</div>
         </div>

         {/* Item 4: Bottom Right */}
         <div 
           className="flex flex-col justify-center p-4 md:p-6"
         >
            <div className="text-4xl md:text-5xl font-instrument mb-1" style={{ color: COLORS.secondary }}>4+</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-80" style={{ color: COLORS.secondary }}>CODEBASES LED</div>
         </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection;