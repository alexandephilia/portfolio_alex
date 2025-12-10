import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import TicketCard from './components/TicketCard';
import IdentitySection from './components/sections/IdentitySection';
import CapabilitiesSection from './components/sections/CapabilitiesSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import { COLORS } from './constants';
import { CardProps } from './types';
import GrainEffect from './components/effects/GrainEffect';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = 4; 
  const scrollHeightPerCard = 150; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.2,
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  const currentCardProgress = useTransform(smoothProgress, [0, 1], [0, totalCards - 1]);
  
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  
  useEffect(() => {
    const unsubscribe = currentCardProgress.on("change", (latest) => {
      setActiveNavIndex(Math.round(latest));
    });
    return () => unsubscribe();
  }, [currentCardProgress]);

  const scrollToCard = (index: number) => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const targetY = (index / (totalCards - 1)) * totalHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative"
      style={{ height: `${totalCards * scrollHeightPerCard}vh` }}
    >
      <GrainEffect />
      <div 
        className="fixed inset-0 z-0 p-3 md:p-5"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div 
          className="w-full h-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl flex items-center justify-center"
          style={{ backgroundColor: COLORS.secondary }}
        >
          
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 z-0"
            style={{ 
              backgroundImage: `linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
              backgroundSize: '12.5% 100%' 
            }}
          ></div>

          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 pb-[5vh] md:pb-[2vh]">
             <h1 
               className="font-instrument text-[26vw] leading-none text-center tracking-tighter select-none"
               style={{ color: COLORS.primary }}
             >
               ALEXANDER
             </h1>
          </div>

          <div className="absolute inset-0 w-full h-full flex items-center justify-center perspective-container z-10">
            <style>{`.perspective-container { perspective: 1200px; }`}</style>
            
            <TicketCard 
              index={0} 
              scrollProgress={currentCardProgress} 
              totalCards={totalCards} 
              header="IDENTIFICATION"
              subHeader="Certified 31.05.94"
              headerClassName="!text-[2.5rem] md:!text-[3.2rem]"
              className="!aspect-[2/3] !h-auto md:max-h-[500px] w-[80vw] md:!w-[340px]"
              contentClassName="pt-[80px]"
              isLanyard={true}
            >
               <IdentitySection />
            </TicketCard>

            <TicketCard index={1} scrollProgress={currentCardProgress} totalCards={totalCards} header="CAPABILITIES">
               <CapabilitiesSection />
            </TicketCard>

            <TicketCard 
              index={2} 
              scrollProgress={currentCardProgress} 
              totalCards={totalCards} 
              header="SERVICES"
              contentClassName="!pt-6 md:!pt-0"
            >
               <ServicesSection />
            </TicketCard>

            <TicketCard index={3} scrollProgress={currentCardProgress} totalCards={totalCards} header="CONNECTION">
               <ContactSection />
            </TicketCard>
          </div>

          {/* Navigation */}
          <nav className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 md:px-8 md:py-8 flex justify-between items-center pointer-events-none">
            {/* Profile/Home Button */}
            <div className="pointer-events-auto">
              <motion.button 
                onClick={() => scrollToCard(0)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                initial="initial"
                whileHover="hover"
                style={{ 
                  backgroundColor: COLORS.primary, 
                  borderColor: COLORS.secondary,
                  color: COLORS.secondary
                }}
                variants={{
                    hover: { 
                        backgroundColor: COLORS.accent,
                        color: COLORS.white
                    }
                }}
              >
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                   <path d="M12 2V22" />
                   <path d="M2 12H22" />
                   <path d="M4.92896 4.92896L19.0711 19.0711" />
                   <path d="M4.92896 19.0711L19.0711 4.92896" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Pagination */}
            <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
                <div 
                  className="flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300"
                  style={{ 
                    backgroundColor: "rgba(26, 35, 50, 0.85)", 
                    borderColor: COLORS.primary,
                  }}
                >
                    {Array.from({ length: totalCards }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToCard(i)}
                            className="relative group w-3 h-3 flex items-center justify-center outline-none"
                            aria-label={`Scroll to card ${i + 1}`}
                        >
                            <div 
                                className={`w-2.5 h-2.5 rotate-45 border transition-all duration-300 ${activeNavIndex === i ? 'scale-110' : 'scale-90 opacity-60 hover:opacity-100 hover:scale-100'}`}
                                style={{ 
                                    backgroundColor: activeNavIndex === i ? COLORS.primary : 'transparent',
                                    borderColor: COLORS.primary
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Mail Button */}
            <div className="pointer-events-auto">
               <motion.a 
                href="mailto:4lexander31@gmail.com"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-300"
                initial="initial"
                whileHover="hover"
                style={{ 
                  backgroundColor: COLORS.primary, 
                  borderColor: COLORS.secondary, 
                  color: COLORS.secondary 
                }}
                variants={{
                    hover: { 
                        backgroundColor: COLORS.accent,
                        color: COLORS.white
                    }
                }}
              >
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="overflow-visible"
                >
                  {/* Back of Envelope */}
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  
                  {/* Flap (Static Lines) */}
                  <path d="m22 6-10 7L2 6" />

                  {/* Paper Sliding Out */}
                  <motion.g
                    initial={{ y: 0, opacity: 0 }}
                    variants={{
                        hover: {
                            y: -8,
                            opacity: 1,
                            transition: { duration: 0.4, ease: "easeOut" }
                        }
                    }}
                  >
                     <rect x="6" y="6" width="12" height="10" fill="currentColor" rx="1" stroke="none" />
                     {/* Lines on Paper (Inverted color usually, but here we use stroke logic) */}
                     {/* Actually fill is solid, so lines need to be 'erase' or separate color. 
                         Since we change text color to white on hover, let's make paper white and lines Accent/Red? 
                         But variants set color to White. So paper is white. 
                         Let's use a mask or just not draw lines to keep it simple or use stroke lines over white fill.
                      */}
                      <path d="M8 9h8 M8 12h5" stroke={COLORS.accent} strokeWidth="1.5" />
                  </motion.g>
                  
                  {/* Front Bottom (to cover bottom of paper if needed, but SVG stacking order handles it if paper is before) */}
                  {/* Usually simpler: Paper moves up from 'inside'. We can mask it or just let it slide up 'behind' top flap if 3D? 
                      In 2D SVG, we just slide it up. */}
                </motion.svg>
              </motion.a>
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-0 pointer-events-none">
             <p 
               className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60"
               style={{ color: COLORS.primary }}
             >
               © 2025, Garry Alexander
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;