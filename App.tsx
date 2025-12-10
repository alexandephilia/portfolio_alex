import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from 'framer-motion';
import TicketCard from './components/TicketCard';
import InteractiveLanyard from './components/InteractiveLanyard';
import IdentitySection from './components/sections/IdentitySection';
import CapabilitiesSection from './components/sections/CapabilitiesSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import { COLORS } from './constants';
import { CardProps } from './types';
import GrainEffect from './components/effects/GrainEffect';
import Preloader from './components/ui/Preloader';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = 4; 
  const scrollHeightPerCard = 150; 
  const [isLoading, setIsLoading] = useState(true);

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
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

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

          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 pb-10 md:pb-[2vh]">
             <div className="overflow-hidden">
               <motion.h1 
                 className="font-instrument text-[26vw] leading-none text-center tracking-tighter select-none"
                 style={{ color: COLORS.primary }}
                 initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                 animate={{ 
                   y: !isLoading ? "0%" : "100%",
                   opacity: !isLoading ? 1 : 0,
                   filter: !isLoading ? "blur(0px)" : "blur(10px)"
                 }}
                 transition={{ 
                   type: "spring", 
                   stiffness: 100, 
                   damping: 20, 
                   mass: 1,
                   delay: 1.0 
                 }}
               >
                 ALEXANDER
               </motion.h1>
             </div>
          </div>

          <div className="absolute inset-0 w-full h-full flex items-center justify-center perspective-container z-10">
            <style>{`.perspective-container { perspective: 1200px; }`}</style>
            
            {!isLoading && (
              <InteractiveLanyard 
                currentCardProgress={currentCardProgress}
                totalCards={totalCards}
              />
            )}

            {/* Other cards don't need the drop, allowing normal rendering */}
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
            <div className="pointer-events-auto overflow-hidden rounded-full">
              <motion.button 
                onClick={() => scrollToCard(0)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300 overflow-hidden"
                initial={{ x: "-150%", rotate: -180 }}
                animate={{ 
                    x: !isLoading ? "0%" : "-150%", 
                    rotate: !isLoading ? 0 : -180 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.8 }}
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
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="flex-shrink-0"
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
                <motion.div 
                  className="flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md"
                  style={{ 
                    backgroundColor: "rgba(26, 35, 50, 0.85)", 
                    borderColor: COLORS.primary,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: !isLoading ? 0 : 20, opacity: !isLoading ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.5 }}
                >
                    {Array.from({ length: totalCards }).map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => scrollToCard(i)}
                            className="relative group w-3 h-3 flex items-center justify-center outline-none"
                            aria-label={`Scroll to card ${i + 1}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: !isLoading ? 1 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.7 + i * 0.08 }}
                        >
                            <div 
                                className={`w-2.5 h-2.5 rotate-45 border transition-all duration-300 ${activeNavIndex === i ? 'scale-110' : 'scale-90 opacity-60 hover:opacity-100 hover:scale-100'}`}
                                style={{ 
                                    backgroundColor: activeNavIndex === i ? COLORS.primary : 'transparent',
                                    borderColor: COLORS.primary
                                }}
                            />
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Mail Button */}
            <div className="pointer-events-auto overflow-hidden">
               <motion.a 
                href="mailto:4lexander31@gmail.com"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-300"
                initial={{ x: "150%", rotate: 180 }}
                animate={{ 
                    x: !isLoading ? "0%" : "150%", 
                    rotate: !isLoading ? 0 : 180 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.9 }}
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

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-0 pointer-events-none overflow-hidden">
             <motion.p 
               className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60"
               style={{ color: COLORS.primary }}
               initial={{ y: "100%", opacity: 0 }}
               animate={{ y: !isLoading ? "0%" : "100%", opacity: !isLoading ? 1 : 0 }}
               transition={{ 
                 type: "spring",
                 stiffness: 100,
                 damping: 20,
                 mass: 1,
                 delay: 1.25 
               }}
             >
               2025 © Crafted with a cup of coffee
             </motion.p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;