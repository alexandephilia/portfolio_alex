import React, { useRef, useEffect, useState } from 'react';
import RollingText from './components/ui/RollingText';
import { useScroll, useTransform, motion, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import TicketCard from './components/TicketCard';
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

  // --- MOUSE PARALLAX SETUP ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const springConfig = { damping: 15, stiffness: 150, mass: 1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Normalize coordinates to -1 to 1 based on window center
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
        const y = (e.clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
        mouseX.set(x);
        mouseY.set(y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax Layers (Different intensities)
  // Low: Background Text
  const xLow = useTransform(mouseXSpring, [-1, 1], ["-15px", "15px"]);
  const yLow = useTransform(mouseYSpring, [-1, 1], ["-15px", "15px"]);

  // Medium: Main Cards (Opposite direction for depth?) Or same? 
  // Let's do SAME direction but stronger to feel closer. 
  // Or Opposite to feel "behind glass"? 
  // Standard parallax: Foreground moves MORE than background.
  // If BG Text is "Deep", it moves LITTLE.
  // Cards are "Mid", move MEDIUM.
  // Nav is "Front", moves MOST.
  // Let's invert X/Y for a "floating" feel vs the mouse.
  const xMid = useTransform(mouseXSpring, [-1, 1], ["-30px", "30px"]);
  const yMid = useTransform(mouseYSpring, [-1, 1], ["-30px", "30px"]);

  // High: Nav Elements
  const xHigh = useTransform(mouseXSpring, [-1, 1], ["-20px", "20px"]);

  const yHigh = useTransform(mouseYSpring, [-1, 1], ["-20px", "20px"]);

  // 3D Tilt for First Card (Restoring "Parallax on Hover" feel)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
        className="fixed inset-0 z-0 p-3 lg:p-5"
        style={{ backgroundColor: COLORS.primary }}
      >
        <motion.div 
          className="w-full h-full relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] shadow-2xl flex items-center justify-center"
          style={{ 
            backgroundColor: COLORS.secondary,
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)" // Added Inset Shadow for Depth
          }}
          initial={{ clipPath: "inset(0 50% 0 50% round 2rem)" }}
          animate={{ 
            clipPath: !isLoading ? "inset(0 0% 0 0% round 2rem)" : "inset(0 50% 0 50% round 2rem)"
          }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1], // Standard Swiss Ease
            delay: 0.2
          }}
        >
          
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 z-0"
            style={{ 
              backgroundImage: `linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
              backgroundSize: '12.5% 100%' 
            }}
          ></div>

             <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 pb-10 lg:pb-8">
               <div className="overflow-visible pointer-events-auto"> {/* Pointer events auto needed for hover detection */}
                  <motion.div
                    initial={{ y: "100%", opacity: 0, filter: "blur(20px)" }}
                    animate={{ 
                      y: !isLoading ? "0%" : "100%",
                      opacity: !isLoading ? 1 : 0,
                      filter: !isLoading ? "blur(0px)" : "blur(20px)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 12, 
                      mass: 1,
                      delay: 1.6 // DELAYED: After ticket drop
                    }}
                  >
                    {/* Parallax Wrapper for Text */}
                    <motion.div style={{ x: xLow, y: yLow }}>
                        <RollingText
                          words={["ALEXANDER", "ABOUT", "ETHOS", "CONTACT"]}
                          progress={currentCardProgress}
                          className="font-instrument text-[25vw] leading-none text-center tracking-tighter select-none whitespace-nowrap"
                          style={{ color: COLORS.primary }} 
                          height="0.7em" // Reduced to tighten spacing (masking handles the fade)
                        />
                    </motion.div>
                  </motion.div>
               </div>
            </div>

          <div className="absolute inset-0 w-full h-full flex items-center justify-center perspective-container z-10">
            <style>{`.perspective-container { perspective: 1200px; }`}</style>
            
            {!isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ y: "-100vh", rotate: 30, scale: 0.9 }}
                animate={{ y: 0, rotate: 0, scale: 1 }}
                style={{ transformOrigin: "50% -50vh", transformStyle: "preserve-3d" }}
                transition={{ 
                  y: { type: "spring", stiffness: 300, damping: 30, mass: 1, delay: 0.8 }, // DELAYED: After container reveal
                  scale: { type: "spring", stiffness: 300, damping: 30, mass: 1, delay: 0.8 }, // Sync
                  rotate: { type: "spring", stiffness: 15, damping: 2, mass: 3, delay: 0.8 } // Sync
                }}
              >
                {/* Parallax Wrapper for Main Card + 3D TILT */}
                <motion.div 
                    style={{ 
                        x: xMid, 
                        y: yMid,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: "preserve-3d",
                        perspective: 2000
                    }} 
                    className="pointer-events-auto relative w-full h-full flex items-center justify-center"
                >
                   {/* We wrap TicketCard but we need to ensure it's still positioned correctly. */}
                  <TicketCard 
                    index={0} 
                    scrollProgress={currentCardProgress} 
                    totalCards={totalCards} 
                    header="IDENTIFICATION"
                    subHeader="Certified 31.05.94"
                    headerClassName="!text-[2.5rem] lg:!text-[3.2rem]"
                    className="!aspect-[2/3] !h-auto lg:max-h-[500px] w-[80vw] max-w-[340px] lg:!w-[340px]"
                    contentClassName="pt-[80px]"
                    isLanyard={true}
                  >
                     <IdentitySection />
                  </TicketCard>
                </motion.div>
              </motion.div>
            )}

            {/* Other cards don't need the drop, allowing normal rendering */}
            {/* Parallax Wrapper for About Card */}
            <motion.div 
              style={{ 
                x: xMid, 
                y: yMid,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 2000 
              }} 
              className="pointer-events-auto absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <TicketCard 
                index={1} 
                scrollProgress={currentCardProgress} 
                totalCards={totalCards} 
                header="ABOUT"
                contentClassName="!pt-6 lg:!pt-0"
                tags={["Pragmatic Architecture", "Continuous Deployment", "LLM-Enhanced Debugging", "Test-Driven Development", "Fast Iteration Cycles", "AI Integration", "PRD Documentation", "CI/CD"]}
              >
                 <CapabilitiesSection />
              </TicketCard>
            </motion.div>

            {/* Parallax Wrapper for Ethos Card */}
            <motion.div 
              style={{ 
                x: xMid, 
                y: yMid,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 2000 
              }} 
              className="pointer-events-auto absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <TicketCard 
                index={2} 
                scrollProgress={currentCardProgress} 
                totalCards={totalCards} 
                header="ETHOS"
                contentClassName="!pt-6 lg:!pt-0"
                tags={["Design-Dev Collaboration", "Third-Party Integrations", "Component Libraries", "Interface Prototyping", "Technical Documentation", "Codebase Modernization", "LLM-Powered Code Audits", "REST/GraphQL APIs", "Architecture Bottleneck Fixes"]}
              >
                 <ServicesSection />
              </TicketCard>
            </motion.div>

            {/* Parallax Wrapper for Contact Card */}
            <motion.div 
              style={{ 
                x: xMid, 
                y: yMid,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 2000 
              }} 
              className="pointer-events-auto absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <TicketCard 
                index={3} 
                scrollProgress={currentCardProgress} 
                totalCards={totalCards} 
                header="CONTACT"
                contentClassName="!pt-6 lg:!pt-0"
                tags={["Get in Touch", "Collaboration", "Freelance", "Remote Work", "Available for Hire", "Let's Build", "Global Reach"]}
              >
                 <ContactSection />
              </TicketCard>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 lg:px-8 lg:py-8 flex justify-between items-center pointer-events-none overflow-visible">
            {/* Profile/Home Button */}
            <div className="pointer-events-auto overflow-visible rounded-full">
              <motion.div style={{ x: xHigh, y: yHigh }}>
                <motion.button 
                    onClick={() => scrollToCard(0)}
                    className="w-10 h-10 lg:w-12  rounded-full border-2 flex items-center justify-center transition-colors duration-300 overflow-visible"
                    initial={{ x: "-150%", rotate: -180, opacity: 0 }}
                    animate={{ 
                        x: !isLoading ? "0%" : "-150%", 
                        rotate: !isLoading ? 0 : -180,
                        opacity: !isLoading ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2.0 }} // DELAYED
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
              </motion.div>
            </div>

            {/* Pagination */}
            <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
               <motion.div style={{ x: xHigh, y: yHigh }}>
                <motion.div 
                  className="flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md"
                  style={{ 
                    backgroundColor: "rgba(26, 35, 50, 0.85)", 

                    borderColor: COLORS.primary,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: !isLoading ? 0 : 20, opacity: !isLoading ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 2.2 }} // DELAYED
                >
                    {Array.from({ length: totalCards }).map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => scrollToCard(i)}
                            className="relative group w-3 h-3 flex items-center justify-center outline-none"
                            aria-label={`Scroll to card ${i + 1}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: !isLoading ? 1 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 2.3 + i * 0.08 }} // DELAYED
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
              </motion.div>
            </div>

            {/* Mail Button */}
            <div className="pointer-events-auto overflow-visible">
               <motion.div style={{ x: xHigh, y: yHigh }}>
               <motion.a 
                href="mailto:4lexander31@gmail.com"
                className="w-10 h-10 lg:w-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-300"
                initial={{ x: "150%", rotate: 180, opacity: 0 }}
                animate={{ 
                    x: !isLoading ? "0%" : "150%", 
                    rotate: !isLoading ? 0 : 180,
                    opacity: !isLoading ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2.1 }} // DELAYED
                whileHover="hover"
                style={{ 
                  backgroundColor: COLORS.primary, 
                  borderColor: COLORS.secondary, 
                  color: COLORS.secondary,
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
              </motion.div>
            </div>
          </nav>

           <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-0 pointer-events-none overflow-visible">
             <motion.div
               initial={{ y: "100%", opacity: 0 }}
               animate={{ y: !isLoading ? "0%" : "100%", opacity: !isLoading ? 1 : 0 }}
               transition={{ 
                 type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 2.4 
               }}
             >
                <motion.div style={{ x: xLow, y: yLow }}>
                  <RollingText
                    words={Array(totalCards).fill("2025 © Crafted with a cup of coffee")}
                    progress={currentCardProgress}
                    className="font-instrument italic text-[10px] lg:text-xs uppercase tracking-widest opacity-60"
                    style={{ color: COLORS.primary }}
                    height="1.5em"
                  />
                </motion.div>
             </motion.div>
           </div>

        </motion.div>
      </div>
    </div>
  );
};

export default App;