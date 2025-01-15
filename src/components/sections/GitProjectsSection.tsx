import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SiGithub, SiVercel, SiNetlify } from "react-icons/si";
import { 
  ExternalLink, 
  GitCommit, 
  GitBranch, 
  Coins,
  LineChart, 
  Brain,
  Sparkles,
  Construction
} from "lucide-react";

type ProjectCategory = "DeFi" | "Analytics" | "Research";

interface GitProject {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  deployedOn?: "vercel" | "netlify";
  commits?: number;
  category: ProjectCategory;
  branch: "DeFi" | "Analytics" | "Research";
  branchIndex: number;
  branchFrom?: {
    branch: "DeFi" | "Analytics" | "Research";
    index: number;
  };
}

const projects: GitProject[] = [
  {
    title: "Zinc",
    description: "Real-time DEX screener for Solana with integrated Jupiter swaps, wallet tracking, and market analysis tools.",
    technologies: ["Solana Web3.js", "RPCs", "DexScreener API", "Jupiter SDK"],
    githubUrl: "https://github.com/alexandephilia/Zinc",
    demoUrl: "https://zinc-bice.vercel.app",
    deployedOn: "vercel",
    commits: 42,
    category: "DeFi",
    branch: "DeFi",
    branchIndex: 0
  },
  {
    title: "Trading Co",
    description: "Comprehensive crypto market analysis and monitoring platform with real-time tracking capabilities.",
    technologies: ["HTML", "CSS", "Web3", "Market Analysis", "TradingView API", "JavaScript"],
    githubUrl: "https://github.com/alexandephilia/trading_co",
    demoUrl: "https://trading-co-rose.vercel.app",
    deployedOn: "vercel",
    commits: 35,
    category: "Analytics",
    branch: "Analytics",
    branchIndex: 0,
    branchFrom: {
      branch: "DeFi",
      index: 0
    }
  },
  {
    title: "Coming Soon",
    description: "Next generation web application built with modern technologies.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Primitive UI"],
    githubUrl: "https://github.com/yourusername/coming-soon",
    demoUrl: "https://coming-soon.vercel.app",
    deployedOn: "vercel",
    commits: 0,
    category: "Research",
    branch: "Research",
    branchIndex: 0,
    branchFrom: {
      branch: "DeFi",
      index: 0
    }
  }
];

const generateRandomNumber = () => Math.floor(Math.random() * 10).toString();

const BranchLine = ({ 
  active, 
  direction = "vertical",
  className = "",
  color = "muted-foreground",
  animate = true,
  glowIntensity = "normal"
}: { 
  active: boolean; 
  direction?: "vertical" | "horizontal"; 
  className?: string;
  color?: string;
  animate?: boolean;
  glowIntensity?: "low" | "normal" | "high";
}) => {
  const baseClasses = "absolute transition-all duration-300";
  const lineClasses = active ? "opacity-100" : "opacity-30";
  
  const glowStyles = {
    low: "blur(1px)",
    normal: "blur(2px)",
    high: "blur(3px)"
  };

  return (
    <div 
      className={`${baseClasses} ${lineClasses} ${className} relative overflow-hidden`}
      style={{ 
        width: direction === "vertical" ? "2px" : "100%",
        height: direction === "vertical" ? "100%" : "2px",
      }}
    >
      {/* Static background line */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${direction === "vertical" ? "to bottom" : "to right"}, var(--${color}) 50%, transparent)`,
          opacity: 0.3
        }}
      />
      
      {/* Enhanced glow effect */}
      {animate && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${direction === "vertical" ? "to bottom" : "to right"}, var(--${color}), transparent)`,
            filter: glowStyles[glowIntensity]
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Enhanced pulse effect on hover */}
      {active && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `linear-gradient(${direction === "vertical" ? "to bottom" : "to right"}, var(--${color}), transparent)`,
            filter: glowStyles[glowIntensity]
          }}
        />
      )}
    </div>
  );
};

const getCategoryStyle = (category: ProjectCategory) => {
  const styles = {
    DeFi: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
    Analytics: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
    Research: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20"
  };
  return styles[category] || "";
};

const getBranchIcon = (branch: GitProject['branch'], title: string) => {
  // Special cases based on project title/purpose
  if (title === "Zinc") {
    return {
      icon: Coins,
      hoverAnimation: {
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    };
  }
  
  if (title === "Trading Co") {
    return {
      icon: LineChart,
      hoverAnimation: {
        scale: [1, 1.2, 1],
        y: [0, -4, 0],
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    };
  }

  if (title.toLowerCase().includes('coming soon')) {
    return {
      icon: Construction,
      hoverAnimation: {
        rotate: [-10, 10, -10],
        scale: [1, 1.1, 1],
        transition: {
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    };
  }

  // Default branch icons as fallback
  const icons = {
    DeFi: {
      icon: Coins,
      hoverAnimation: {
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    },
    Analytics: {
      icon: LineChart,
      hoverAnimation: {
        scale: [1, 1.2, 1],
        y: [0, -4, 0],
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    },
    Research: {
      icon: Brain,
      hoverAnimation: {
        scale: [1, 1.2, 1],
        rotate: [-10, 10, -10],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    }
  };
  
  return icons[branch];
};

const ProjectCard = ({ 
  project,
  className = "",
  showBranchFrom = false
}: { 
  project: GitProject;
  className?: string;
  showBranchFrom?: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const branchIconConfig = getBranchIcon(project.branch, project.title);
  const IconComponent = branchIconConfig.icon;

  return (
    <div className={`relative ${className}`}>
      <ShimmerButton className="w-full group">
        <a 
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={(e) => {
            if (e.target instanceof HTMLButtonElement) {
              e.preventDefault();
            }
          }}
        >
          <Card 
            className="relative overflow-hidden dark:bg-black/100 bg-white/[0.1] 
              border-[1px] border-black/[0.15] dark:border-white/[0.08] 
              hover:border-black/25 dark:hover:border-white/[0.15] 
              transition-all duration-500 group-hover:shadow-lg
              ring-1 ring-black/[0.05] dark:ring-white/[0.05]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="relative z-10 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={isHovered ? branchIconConfig.hoverAnimation : { scale: 1 }}
                      className="relative"
                    >
                      <IconComponent 
                        className={`h-3.5 w-3.5 flex-shrink-0 transition-colors duration-300 
                          ${isHovered ? 'text-primary' : 'text-muted-foreground'}`} 
                      />
                    </motion.div>
                    <h3 className="text-sm font-medium truncate">{project.title}</h3>
                  </div>
                  <div className="relative mb-2">
                    <div className={`relative transition-all duration-300 ${isExpanded ? 'max-h-[none]' : 'max-h-[2.5rem] overflow-hidden'}`}>
                      <p className="text-xs text-muted-foreground">
                        {project.description}
                      </p>
                      {!isExpanded && (
                        <div 
                          className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white/90 dark:from-black/90 to-transparent pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                      }}
                      className="mt-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  </div>
                </div>
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SiGithub className="h-4 w-4" />
                </motion.span>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-[9px] px-1 py-0 bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  {project.commits !== undefined && (
                    <motion.div 
                      className="flex items-center gap-0.5"
                      whileHover={{ scale: 1.1 }}
                    >
                      <GitCommit className="h-3 w-3" />
                      <span>{project.commits}</span>
                    </motion.div>
                  )}
                  {project.category && (
                    <>
                      <span className="text-muted-foreground">|</span>
                      <motion.div 
                        className="flex items-center gap-0.5"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${getCategoryStyle(project.category)}`}>
                          {project.category}
                        </span>
                      </motion.div>
                    </>
                  )}
                </div>

                {project.demoUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-1.5 text-[10px] gap-1 hover:blur-[1px] group"
                    asChild
                  >
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Demo</span>
                      <motion.div
                        animate={isHovered ? { x: [0, 2, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ExternalLink className="h-2.5 w-2.5" />
                      </motion.div>
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </a>
      </ShimmerButton>
    </div>
  );
};

const BranchTimeline = ({ projects }: { projects: GitProject[] }) => {
  const branchProjects = projects.reduce((acc, project) => {
    if (!acc[project.branch]) {
      acc[project.branch] = [];
    }
    acc[project.branch].push(project);
    return acc;
  }, {} as Record<string, GitProject[]>);

  // Add state for tooltip visibility
  const [hoveredBranch, setHoveredBranch] = React.useState<string | null>(null);
  
  // Add scramble text state
  const [scrambleText, setScrambleText] = React.useState("");
  
  // Scramble effect hook
  React.useEffect(() => {
    if (!hoveredBranch) return;
    
    const finalText = hoveredBranch === "DeFi" ? "feat/defi-integration" :
                     hoveredBranch === "Analytics" ? "feat/analytics-dashboard" :
                     hoveredBranch === "Research" ? "feat/research-module" :
                     "main";
    
    let iteration = 0;
    const scrambleIterations = 15; // Increased iterations for more scramble effect
    
    const interval = setInterval(() => {
      setScrambleText(
        finalText
          .split("")
          .map((char, index) => {
            // Show actual character after scramble phase
            if (iteration > scrambleIterations) {
              return index < (iteration - scrambleIterations) ? char : generateRandomNumber();
            }
            // Pure scramble phase
            return generateRandomNumber();
          })
          .join("")
      );
      
      iteration += 1;
      
      if (iteration >= finalText.length + scrambleIterations + 1) {
        clearInterval(interval);
      }
    }, 40); // Slowed down slightly for better readability
    
    return () => clearInterval(interval);
  }, [hoveredBranch]);

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-5xl mx-auto">
      {/* Connection lines container */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Vertical line - Mobile only */}
        <motion.div 
          className="lg:hidden absolute left-1/2 top-0 bottom-0 w-[1px] transform -translate-x-1/2 overflow-hidden z-[2]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent" />
          <motion.div
            className="absolute inset-0 w-full h-[50%]"
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </motion.div>
        
        {/* Horizontal connection lines - Desktop only */}
        <div className="hidden lg:block absolute inset-x-0 top-0 h-full">
          {Object.keys(branchProjects).map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ 
                left: `${index * 20.33}%`, 
                width: '55.33%'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute top-[140px] w-full px-8">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Branches */}
      <div className="relative flex-1 lg:grid lg:grid-cols-3 lg:gap-8">
        {Object.entries(branchProjects).map(([branchName, branchProjects], branchIndex) => (
          <div 
            key={branchName}
            className={`relative mb-16 last:mb-0 lg:mb-0 z-[5] ${
              branchIndex === 1 ? 'lg:col-start-2' : 
              branchIndex === 2 ? 'lg:col-start-3' : 'lg:col-start-1'
            }`}
          >
            {/* Branch header */}
            <motion.div 
              className="flex items-center gap-2 mb-8 relative group justify-start lg:justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: branchIndex * 0.2 }}
              onMouseEnter={() => setHoveredBranch(branchName)}
              onMouseLeave={() => setHoveredBranch(null)}
            >
              <motion.div
                className="relative z-[15] bg-white dark:bg-black backdrop-blur-sm p-1.5 rounded-full border border-muted-foreground/20 shadow-sm"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GitBranch className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
              <div className="relative z-[16]">
                <div className="flex items-center gap-2 bg-white dark:bg-black backdrop-blur-sm px-3 py-1 rounded-full border border-muted-foreground/20">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">origin/</span>
                    <h3 className="text-sm font-medium capitalize bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {branchName}
                    </h3>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {hoveredBranch === branchName && (
                  <motion.div
                    className="absolute left-[calc(30%-2rem)] -top-8 text-[10px] text-muted-foreground/70 bg-white dark:bg-black backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-muted-foreground/10 shadow-sm z-[100] min-w-[140px] justify-center overflow-hidden lg:left-[calc(50%-4rem)]"
                    initial={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        mass: 0.5,
                        duration: 0.5
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.95,
                      filter: "blur(4px)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        mass: 0.5,
                        duration: 0.3
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: {
                        duration: 0.2
                      }
                    }}
                  >
                    <motion.div
                      initial={{ 
                        rotate: 45, 
                        scale: 0,
                        y: 15 
                      }}
                      animate={{ 
                        rotate: 0, 
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          delay: 0.1
                        }
                      }}
                      exit={{ 
                        rotate: 45, 
                        scale: 0,
                        y: 15,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        }
                      }}
                    >
                      <GitCommit className="w-3 h-3" />
                    </motion.div>
                    <motion.div 
                      className="overflow-hidden flex items-center"
                      initial={{ 
                        opacity: 0,
                        y: 20,
                        scale: 0.9
                      }}
                      animate={{ 
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          mass: 0.5,
                          delay: 0.15,
                          duration: 0.5
                        }
                      }}
                      exit={{ 
                        opacity: 0,
                        y: 20,
                        scale: 0.9,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          mass: 0.5,
                          duration: 0.3
                        }
                      }}
                    >
                      {scrambleText.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          className="font-mono"
                          initial={{ 
                            opacity: 0,
                            filter: "blur(8px)",
                            y: 10
                          }}
                          animate={{ 
                            opacity: 1,
                            filter: "blur(0px)",
                            y: 0,
                            transition: {
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                              mass: 0.3,
                              delay: 0.6 + (index * 0.03), // Longer initial delay, slower stagger
                              duration: 0.4
                            }
                          }}
                          exit={{ 
                            opacity: 0,
                            filter: "blur(12px)",
                            y: -5,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.02, // Faster exit stagger
                              ease: [0.4, 0, 0.2, 1]
                            }
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Branch projects */}
            <div className="flex flex-col items-center lg:items-stretch gap-8 relative z-[10]">
              {branchProjects.map((project, projectIndex) => (
                <div key={project.title} className="relative w-full">
             
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (branchIndex * 0.2) + (projectIndex * 0.1) }}
                    className="relative z-10"
                  >
                    <ProjectCard 
                      project={project}
                      showBranchFrom={project.branchFrom !== undefined}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GitProjectsSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const blurFilter = useTransform(
    smoothProgress,
    [0, 0.2, 1, 1],
    ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
  );

  const yTransform = useTransform(
    smoothProgress,
    [0, 0.1, 0.9, 1],
    ["25px", "0px", "0px", "25px"]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="container relative py-16 overflow-x-hidden"
      style={{
        opacity,
        filter: blurFilter,
        y: yTransform,
        willChange: "transform, opacity, filter"
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent opacity-90" />
      <div className="absolute bottom-0 w-full px-8 h-[2px]">
        <div className="w-full h-full border-b-[1px] border-dashed border-foreground/10" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title section with increased bottom margin */}
        <div className="space-y-2 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0. }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Project Timeline</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Branches of existence, commits of purpose
            </p>
          </motion.div>
        </div>

        <BranchTimeline projects={projects} />
      </div>
    </motion.section>
  );
};

