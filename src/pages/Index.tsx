import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Github, Linkedin, Mail, User, Menu, Book, Wrench, Heart, Coffee } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Code, Server } from "lucide-react";
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
  SiReplit,
  SiCardano
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StatusBadge } from "@/components/ui/statusbadge";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { motion, useAnimationControls } from "framer-motion";
import BlogSection from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import FloatingMenu from "@/components/FloatingMenu";
import { MobileNav } from "@/components/navigation/MobileNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { AnimatedGradientText } from "@/components/ui/animated-text";
import { AnimatedTyping } from "@/components/ui/animated-typing";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GitProjectsSection } from "@/components/sections/GitProjectsSection";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 space-x-0 rounded-md p-3 leading-none no-underline outline-none transition-all hover:text-accent-foreground hover:blur-[2px]",
            className
          )}
          {...props}
        >
          <div className="text-xs font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface GrainProps {
  opacity?: number;
}

const Grain = React.memo(({ opacity = 0.8 }: GrainProps) => {
  const controls = useAnimationControls();
  const { theme } = useTheme();

  useEffect(() => {
    controls.start({
      x: ["0%", "-5%", "-15%", "7%", "-5%", "-15%", "15%", "0%", "3%", "-10%"],
      y: ["0%", "-10%", "5%", "-25%", "25%", "10%", "0%", "15%", "35%", "10%"],
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
        willChange: "transform",
        backfaceVisibility: "hidden",
        translateZ: 0,
        type: "tween"
      }
    });
  }, [controls]);

  const grainStyle = React.useMemo(() => ({
    width: "100%",
    height: "100%",
    position: "fixed" as const,
    top: 0,
    left: 0,
    pointerEvents: "none" as const,
    zIndex: 9999,
    overflow: "hidden",
    willChange: "transform",
    transform: "translateZ(0)"
  }), []);

  const overlayStyle = React.useMemo(() => ({
    backgroundSize: "32px 32px",
    backgroundRepeat: "repeat" as const,
    background: theme === 'dark'
      ? "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
      : "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
    opacity: theme === 'dark' ? opacity : opacity * 0.8,
    inset: "-200%",
    width: "500%",
    height: "500%",
    position: "absolute" as const,
    filter: theme === 'dark'
      ? 'none'
      : 'invert(1) brightness(0.8)',
    backfaceVisibility: "hidden" as const,
    perspective: 1000,
    transformStyle: "preserve-3d" as const
  }), [theme, opacity]);

  return (
    <div style={grainStyle}>
      <motion.div
        animate={controls}
        style={overlayStyle}
        initial={false}
      />
    </div>
  );
});

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 16.67) { // Longer than one frame
            console.warn('Long task detected:', entry);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <nav className="fixed w-full top-0 z-50">
        <div
          className="relative"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          {/* Update blur layer with matching styles */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Content container with proper z-index */}
          <div className="relative z-10 container max-w-5xl flex h-16 items-center justify-between">
            {/* Left side - Logo and Desktop Navigation */}
            <div className="flex items-center gap-6">
              <AnimatedGradientText
                text="Alexandeism"
                className="text-xl"
              />
              {/* Desktop Navigation - Moved here */}
              <div className="hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>About</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[520px] p-6">
                          <div className="grid grid-cols-[250px_1fr] gap-4">
                            {/* Profile Card - Left Side */}
                            <div className="flex flex-col h-full rounded-md bg-gradient-to-b from-muted/30 to-muted/20 p-4">
                              <div className="text-base font-bold">
                                Garry Alexander
                              </div>
                              <p className="text-xs leading-tight text-muted-foreground mb-4 mt-2">
                                A <strong>nihilist</strong> who loves to code and coffee ☕
                              </p>
                              <div className="grid grid-cols-2 gap-2 mt-auto">
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="hover:blur-[1px] transition-all duration-300 text-xs py-1"
                                  asChild
                                >
                                  <a href="https://www.reddit.com/user/Alexandeisme/" target="_blank" rel="noopener noreferrer">Reddit</a>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="hover:blur-[1px] transition-all duration-300 text-xs py-1"
                                  asChild
                                >
                                  <a href="https://www.linkedin.com/in/alexandephilia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="hover:blur-[1px] transition-all duration-300 text-xs py-1"
                                  asChild
                                >
                                  <a href="https://x.com/0xnihilism" target="_blank" rel="noopener noreferrer">Twitter</a>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="hover:blur-[1px] transition-all duration-300 text-xs py-1"
                                  asChild
                                >
                                  <a href="mailto:0xnihilist@gmail.com">Email</a>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="hover:blur-[1px] transition-all duration-300 text-xs py-1 col-span-2"
                                  asChild
                                >
                                  <a href="resume.pdf" target="_blank" rel="noopener noreferrer">
                                    Resume
                                  </a>
                                </Button>
                              </div>
                            </div>

                            {/* About Section - Right Side */}
                            <div className="flex flex-col h-full mt-1">
                              <div className="text-base font-bold mt-3">
                                About Me
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground mt-2">
                                A digital craftsman at the crossroads of technology and existential thought. Weaving elegant code into meaningful experiences while pondering life's deeper questions. Fueled by curiosity, coffee, and a touch of cosmic nihilism.
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Hobbies</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] grid-cols-2 gap-0 p-4">
                          <Link to="/projects/ai" className="no-underline">
                            <ListItem
                              title="AI Research"
                              className="h-auto p-3"
                            >
                              Exploring research of the latest LLMs
                            </ListItem>
                          </Link>
                          <Link to="/projects/prompt" className="no-underline">
                            <ListItem
                              title="Prompt Engineering"
                              className="h-auto p-3"
                            >
                              Crafting effective prompts for AI systems
                            </ListItem>
                          </Link>
                          <ListItem
                            href="https://uiverse.io/profile/0xnihilism"
                            title="Web Components"
                            className="h-auto p-3"
                          >
                            Building reusable UI components
                          </ListItem>
                          <ListItem
                            href="https://toolfolio.io/"
                            title="Toolfolio"
                            className="h-auto p-3"
                          >
                            Collection of developer tools
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Right side - Mobile Menu and Theme Toggle */}
            <div className="flex items-center gap-2">
              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center">
                <MobileNav />
              </div>
              <div className="flex items-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Hero Section */}
          <div className="container max-w-5xl px-4 sm:px-6 md:px-8">
            <HeroSection
              name="Hey! I am Alex 👋"
              title={
                <div className="flex flex-col items-center text-center gap-1 px-2">
                  {/* First line - Combined description */}
                  <div className="inline-flex flex-wrap items-center justify-center gap-0.5 text-[11px] md:text-sm lg:text-base">
                    <span className="inline-flex items-center">
                      <strong className="dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70]">An over-thinker and coffee lover (yep),</strong>
                    </span>
                    <span className="inline-flex items-center">
                      <strong className="dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70]">also a front end developer who thinks about</strong>
                    </span>
                    <span className="inline-flex items-center pl-1">
                      <AnimatedTyping
                        words={["coffee", "crypto", "life", "space", "abyss", "ai"]}
                        className="text-[11px] md:text-sm lg:text-base font-bold text-[#2a2a29] drop-shadow-[0_0_0.0rem_#656564] animate-pulse mix-blend-screen filter brightness-150 dark:text-[#EEEEEE] dark:drop-shadow-[0_0_0.3rem_#00ff9570] dark:animate-pulse dark:mix-blend-screen dark:filter dark:brightness-100"
                      />
                    </span>
                  </div>
                </div>
              }
              subtitle={
                <>
                  <span className="text-[11px] md:text-sm lg:text-base">
                    and experiment in the cosmic absurdity of life.{" "}
                    <strong className="dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                      Starting from 0 to 1, or probably creating an accidental masterpiece.
                    </strong>
                  </span>
                </>
              }
              profileImage="/Untitled.jpeg"
            />
            <SkillsSection />
            <ProjectsSection />
            <GitProjectsSection />
            <BlogSection />
            <ContactSection />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Add Grain effect */}
      <Grain opacity={0.05} />

      {/* Footer Section */}
      <footer className="border-t mt-16 relative z-10">
        <div className="container max-w-5xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Built with caffeine by <strong>Garry Alexander</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Deployed on
              </span>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <svg height="16" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H85.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Menu */}
      <FloatingMenu />

      {/* Add the GradientBlur component */}
      <GradientBlur />
    </div>
  );
};

export default Index;