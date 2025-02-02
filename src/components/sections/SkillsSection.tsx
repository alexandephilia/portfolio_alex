import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { 
  Code, 
  Wrench,
  Sparkles,
  Laptop,
  Terminal,
  Workflow,
  GitBranch,
  Rocket,
  Zap,
  GitCommit
} from "lucide-react";
import { BsCursorFill } from "react-icons/bs";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiBarChartFill, RiBuilding4Fill } from "react-icons/ri";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiWebflow,
  SiFramer,
  SiVercel,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNetlify,
  SiVite,
  SiPnpm,
  SiLinux,
  SiGit,
  SiPostman,
  SiApple
} from "react-icons/si";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import * as Ariakit from "@ariakit/react";

interface Skill {
  name: string;
  icon: React.ElementType;
  category: "frontend" | "tools";
  level: "Learning" | "Comfortable" | "Mastering" | "Mentoring";
}

const skills: Skill[] = [
  // Frontend Skills
  { name: "React", icon: SiReact, category: "frontend", level: "Mastering" },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", level: "Mastering" },
  { name: "TailwindCSS", icon: SiTailwindcss, category: "frontend", level: "Mastering" },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", level: "Mastering" },
  { name: "JavaScript", icon: SiJavascript, category: "frontend", level: "Mastering" },
  { name: "HTML5", icon: SiHtml5, category: "frontend", level: "Mastering" },
  { name: "CSS3", icon: SiCss3, category: "frontend", level: "Mastering" },
  { name: "Motion", icon: TbBrandFramerMotion, category: "frontend", level: "Comfortable" },

  // Development Tools
  { name: "Git", icon: SiGit, category: "tools", level: "Mastering" },
  { name: "Webflow", icon: SiWebflow, category: "tools", level: "Comfortable" },
  { name: "Cursor", icon: BsCursorFill, category: "tools", level: "Mentoring" },
  { name: "Terminal", icon: SiLinux, category: "tools", level: "Comfortable" },
  { name: "Vite", icon: SiVite, category: "tools", level: "Comfortable" },
  { name: "pnpm", icon: SiPnpm, category: "tools", level: "Comfortable" },
  { name: "Framer", icon: SiFramer, category: "tools", level: "Learning" },
  { name: "Postman", icon: SiPostman, category: "tools", level: "Comfortable" },
];

interface WorkExperience {
  company: string;
  logo: React.ElementType;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
}

const workExperiences: WorkExperience[] = [
  {
    company: "Tokyo Marine",
    logo: RiBarChartFill,
    role: "Sales Agent",
    duration: "Aug 2016 - Oct 2017",
    location: "Tangerang",
    achievements: [
      "Achieved sales targets exceeding expectations in first month",
      "Built strong client relationships and increased sales by 20%",
      "Developed effective sales strategies with mentor guidance"
    ]
  },
  {
    company: "Realta",
    logo: RiBuilding4Fill,
    role: "Quality Control",
    duration: "Aug 2017 - Sep 2021",
    location: "Jakarta",
    achievements: [
      "Ensured product quality standards and trace bug testing for good quality product to customers",
      "Implemented quality control procedures, automated testing and documentation",
      "Conducted thorough documentation for 100+ documents in RoboHelp"
   
    ]
  },
  {
    company: "Realta",
    logo: RiBuilding4Fill,
    role: "Front End Developer",
    duration: "Sep 2021 - Current",
    location: "Jakarta",
    achievements: [
      "Contributed to the development of 10+ web and redesign projects with 20% increase in optimization",
      "Building responsive and modern web applications for Employee management system, Hotel management system, and more",
      "Implementing best practices in UI/UX development and mobile responsive with implementation of lazy loading and speed loading optimization, SPA, and more"
    ]
  }
];

const getLevelColor = (level: Skill["level"]) => {
  switch (level) {
    case "Learning":
      return "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20";
    case "Comfortable":
      return "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20";
    case "Mastering":
      return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20";
    case "Mentoring":
      return "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20";
    default:
      return "bg-muted";
  }
};

const getOverallProgress = (skills: Skill[]) => {
  const levelScores = {
    Learning: 25,
    Comfortable: 50,
    Mastering: 75,
    Mentoring: 100
  };
  
  const total = skills.reduce((acc, skill) => acc + levelScores[skill.level], 0);
  return total / skills.length;
};

interface SkillTooltip {
  [key: string]: string;
}

const skillDescriptions: SkillTooltip = {
  "React": "Component-based UI development",
  "TypeScript": "Type-safe JavaScript development",
  "TailwindCSS": "Utility-first CSS framework",
  "Next.js": "React framework for production",
  "JavaScript": "Dynamic web programming",
  "HTML5": "Semantic web markup",
  "CSS3": "Modern web styling",
  "Motion": "React animation library",
  "Git": "Version control system",
  "Webflow": "Visual web development",
  "Cursor": "AI-powered code editor",
  "Terminal": "Command-line interface",
  "Vite": "Next-gen frontend tooling",
  "pnpm": "Fast package manager",
  "Framer": "Interactive design tool",
  "Postman": "API development platform"
};

const generateRandomNumber = () => Math.floor(Math.random() * 10).toString();

const ScrambleText = ({ text }: { text: string }) => {
  const [scrambledText, setScrambledText] = React.useState(text);
  const [isAnimating, setIsAnimating] = React.useState(true);
  
  React.useEffect(() => {
    if (!isAnimating) return;
    
    let iteration = 0;
    const scrambleIterations = 15;
    
    const interval = setInterval(() => {
      setScrambledText(
        text
          .split("")
          .map((char, index) => {
            if (iteration > scrambleIterations) {
              return index < (iteration - scrambleIterations) ? char : generateRandomNumber();
            }
            return generateRandomNumber();
          })
          .join("")
      );
      
      iteration += 1;
      
      if (iteration >= text.length + scrambleIterations + 1) {
        clearInterval(interval);
        setIsAnimating(false);
        setScrambledText(text);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, [text, isAnimating]);

  return (
    <div className="flex items-center tracking-tight leading-none">
      {scrambledText.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`font-mono ${char === " " ? "w-[0.25em]" : "w-[0.6em]"} inline-block text-center`}
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
              delay: 0.6 + (index * 0.03),
              duration: 0.4
            }
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(12px)",
            y: -5,
            transition: {
              duration: 0.3,
              delay: index * 0.02,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedTooltip = React.forwardRef<
  HTMLDivElement,
  { content: string; children: React.ReactNode }
>(({ content, children }, ref) => {
  const tooltip = Ariakit.useTooltipStore({
    placement: "top"
  });
  const mounted = Ariakit.useStoreState(tooltip, "mounted");

  return (
    <Ariakit.TooltipProvider store={tooltip}>
      <Ariakit.TooltipAnchor ref={ref} className="cursor-default">
        {children}
      </Ariakit.TooltipAnchor>
      <AnimatePresence>
        {mounted && (
          <Ariakit.Tooltip
            store={tooltip}
            gutter={4}
            className="text-[10px] text-foreground bg-muted/50 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1.5 border border-muted-foreground/10 shadow-sm z-[100] min-w-[140px] justify-center"
            render={
              <motion.div
                initial={{ 
                  opacity: 0,
                  y: 10,
                  scale: 0.98,
                  filter: "blur(4px)"
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.3,
                    delay: 0.15,
                    duration: 0.3
                  }
                }}
                exit={{ 
                  opacity: 0,
                  y: -5,
                  scale: 0.98,
                  filter: "blur(4px)",
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
              >
                <div className="flex items-center gap-1.5">
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
                    <GitCommit className="w-3 h-3 text-muted-foreground" />
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    initial={{ 
                      opacity: 0,
                      y: 10,
                      scale: 0.98
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 0.5,
                        delay: 0.15,
                        duration: 0.3
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      y: -5,
                      scale: 0.98,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <div className="py-0.5">
                      <ScrambleText text={content} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            }
          />
        )}
      </AnimatePresence>
    </Ariakit.TooltipProvider>
  );
});

const SkillCard = ({ 
  title, 
  icon: Icon, 
  skills: categorySkills 
}: { 
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}) => {
  const overallProgress = getOverallProgress(categorySkills);
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <ShimmerButton className="w-full group">
      <Card 
        className={`
          relative overflow-hidden dark:bg-black/100 bg-white/[0.1] 
          border-[1px] border-[#0071a9]/[0.15] dark:border-white/[0.08] 
          hover:border-[#0071a9]/25 dark:hover:border-white/[0.15] 
          transition-all duration-500 group-hover:shadow-lg
          ring-1 ring-[#0071a9]/[0.05] dark:ring-white/[0.05] shadow-sm 
          hover:shadow-[0_0_15px_rgba(0,113,169,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
          ${isTouched ? 'border-[#0071a9]/25 dark:border-white/[0.15] shadow-lg' : ''}
        `}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        onTouchCancel={() => setIsTouched(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ${isTouched ? 'text-primary' : ''}`} />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Overall Proficiency</span>
              <span className="text-xs font-medium">{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${overallProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {categorySkills.map((skill) => (
              <motion.div
                key={skill.name}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedTooltip content={skillDescriptions[skill.name]}>
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-2 text-center sm:text-left">
                    <skill.icon className={`h-4 w-4 text-muted-foreground ${isTouched ? 'text-primary' : ''}`} />
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm">{skill.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-[9px] px-1 py-0 w-fit mt-0.5 ${getLevelColor(skill.level)}`}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                </AnimatedTooltip>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ShimmerButton>
  );
};

const WorkExperienceTimeline = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedExperience = workExperiences[selectedIndex];
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const dotRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [dotPosition, setDotPosition] = React.useState({ top: 0, left: 0 });

  // Update dot position when selection changes
  React.useEffect(() => {
    const updateDotPosition = () => {
      const currentDot = dotRefs.current[selectedIndex];
      if (!currentDot || !timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const dotRect = currentDot.getBoundingClientRect();

      setDotPosition({
        top: dotRect.top - timelineRect.top,
        left: dotRect.left - timelineRect.left
      });
    };

    updateDotPosition();
    window.addEventListener('resize', updateDotPosition);
    return () => window.removeEventListener('resize', updateDotPosition);
  }, [selectedIndex]);

  return (
    <div className="relative flex items-start px-3 sm:pl-32 gap-4 sm:gap-16 max-w-2xl mx-auto">
      {/* Timeline Section (Left) */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute sm:left-[7px] left-[5px] top-3 w-[2px] h-[calc(100%+3rem)] bg-muted-foreground/20" />
        {/* Timeline Points */}
        <div ref={timelineRef} className="relative flex flex-col gap-10 sm:gap-16">
          {/* Animated Floating Dot */}
          <AnimatePresence mode="wait">
            <motion.div
              key="floating-dot"
              className="absolute z-20 w-3 h-3 sm:w-4 sm:h-4"
              initial={false}
              animate={{
                top: dotPosition.top,
                left: dotPosition.left,
                scale: 1
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.5
              }}
            >
              <motion.div
                className="w-full h-full rounded-full bg-primary border-2 border-primary"
                initial={{ scale: 1 }}
                animate={{ scale: 1  }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                  mass: 0.5
                }}
              />
            </motion.div>
          </AnimatePresence>

          {workExperiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.role}`}
              onClick={() => setSelectedIndex(index)}
              className="relative group flex items-center gap-2 sm:gap-4 cursor-pointer"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
            >
              {/* Static Dot */}
              <div 
                ref={el => dotRefs.current[index] = el}
                className={`timeline-dot relative z-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-[1.5px] sm:border-2 transition-colors
                  ${index === selectedIndex 
                    ? "border-primary bg-transparent" 
                    : "bg-background border-muted-foreground/30 group-hover:border-primary"
                  }`}
              />
              
              {/* Company & Duration */}
              <div 
                className={`flex flex-col items-start transition-colors
                  ${index === selectedIndex ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
              >
                <span className="text-[11px] sm:text-sm font-medium leading-tight">{experience.company}</span>
                <span className="text-[10px] sm:text-xs opacity-70 leading-tight">{experience.duration.split(" - ")[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Section (Right) */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedExperience.company}-${selectedExperience.role}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-1.5 rounded-lg bg-muted/50 mt-0.5 sm:mt-0">
                <selectedExperience.logo className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1 sm:space-y-0.5">
                <h3 className="text-sm sm:text-base font-semibold flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="leading-tight">{selectedExperience.role}</span>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-inherit opacity-70 sm:opacity-100">
                      <span className={selectedExperience.company === "Tokyo Marine" || selectedExperience.company === "Realta" ? "text-amber-500" : "text-primary"}>@</span>
                      <span className={selectedExperience.company === "Tokyo Marine" || selectedExperience.company === "Realta" ? "text-amber-500" : ""}>{selectedExperience.company}</span>
                    </div>
                  </div>
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground/80">
                  <span className="leading-tight">{selectedExperience.duration}</span>
                  <span className="hidden sm:inline-block">•</span>
                  <span className="leading-tight">{selectedExperience.location}</span>
                </div>
              </div>
            </div>
            <motion.div 
              className="space-y-2.5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {selectedExperience.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="flex items-start gap-2"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <GitCommit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary mt-[3px] sm:mt-1 shrink-0" />
                  <span className="text-[11px] sm:text-xs leading-tight">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
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
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  const yTransform = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    ["50px", "0px", "0px", "50px"]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="container relative py-16 overflow-x-hidden"
      style={{
        opacity,
        filter: blurFilter,
        y: yTransform,
        willChange: "transform"
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
        {/* Title section */}
        <div className="space-y-2 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Skills & Expertise</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Crafting digital experiences with modern tools and technologies
            </p>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <SkillCard
            title="Frontend"
            icon={Laptop}
            skills={skills.filter(skill => skill.category === "frontend")}
          />
          <SkillCard
            title="Development"
            icon={Wrench}
            skills={skills.filter(skill => skill.category === "tools")}
          />
        </div>

        {/* Work Experience Timeline */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Work Experience</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              My professional journey and achievements
            </p>
          </motion.div>
          <WorkExperienceTimeline />
        </div>
      </div>
    </motion.section>
  );
};
