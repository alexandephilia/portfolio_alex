import FloatingMenu from "@/components/FloatingMenu";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/navigation/MobileNav";
import BlogSection from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GitProjectsSection } from "@/components/sections/GitProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AnimatedGradientText } from "@/components/ui/animated-text";
import { AnimatedTyping } from "@/components/ui/animated-typing";
import { Button } from "@/components/ui/button";
import { GradientBlur } from "@/components/ui/gradient-blur";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import GrainOverlay from "@/components/GrainOverlay";

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

interface HeroSectionProps {
  name: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  profileImage: string;
}

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 16.67) { // ? Longer than one frame
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
                <div className="flex flex-col items-center text-center gap-1 px-1">
                  <div className="inline-flex flex-wrap items-center justify-center gap-0.5 text-[11px] md:text-sm lg:text-base">
                    <span className="inline-flex items-center">
                      <strong className="dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70]">An over-thinker, science fiction enthusiast and coffee lover (yep) who found a joy in experimenting and exploration, also a front end developer</strong>
                    </span>
                    <span className="inline-flex items-center whitespace-nowrap">
                      <strong className="dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70]">who thinks about</strong>
                      <span className="ml-2">
                        <AnimatedTyping
                          words={['coffee', 'crypto', 'life', 'space', 'abyss', 'ai']}
                          className="text-[11px] md:text-sm lg:text-base font-bold text-[#2a2a29] drop-shadow-[0_0_0.0rem_#656564] animate-pulse mix-blend-screen filter brightness-150 dark:text-[#EEEEEE] dark:drop-shadow-[0_0_0.3rem_#00ff9570] dark:animate-pulse dark:mix-blend-screen dark:filter dark:brightness-100"
                        />
                      </span>
                    </span>
                  </div>
                </div>
              }
              subtitle={
                <div className="flex flex-col items-center text-center gap-2 dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70] max-w-[340px] sm:max-w-none mx-auto">
                  <p className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] md:text-sm lg:text-base">
                    <strong>Lost in digital realities with </strong>
                    <motion.span
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-blue-500/20 dark:bg-blue-500/20 border border-blue-500/20 shadow-sm shadow-blue-500/20 dark:shadow-none"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3 h-3 md:w-3.5 md:h-3.5" alt="React" />
                      <span className="text-[9px] md:text-xs text-blue-500 dark:text-blue-400">React</span>
                    </motion.span>
                    <strong>and</strong>
                    <motion.span
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-cyan-500/20 dark:bg-cyan-500/20 border border-cyan-500/20 shadow-sm shadow-cyan-500/20 dark:shadow-none"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-500 dark:text-cyan-400" fill="currentColor">
                        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                      </svg>
                      <span className="text-[9px] md:text-xs text-cyan-500 dark:text-cyan-400">Tailwind</span>
                    </motion.span>
                    <strong>diving into </strong>
                    <motion.span
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-yellow-500/20 dark:bg-yellow-500/20 border border-yellow-500/20 shadow-sm shadow-yellow-500/20 dark:shadow-none"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-500 dark:text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a2 2 0 0 1 2 2v2h3a3 3 0 0 1 3 3v1.17a3 3 0 1 1-2 0V9a1 1 0 0 0-1-1h-3v2.17a3 3 0 1 1-4 0V8H7a1 1 0 0 0-1 1v1.17a3 3 0 1 1-2 0V9a3 3 0 0 1 3-3h3V4a2 2 0 0 1 2-2zM7 14a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H7zm2 2h2v2H9v-2zm4 0h2v2h-2v-2z" />
                      </svg>
                      <span className="text-[9px] md:text-xs text-yellow-500 dark:text-yellow-400">AI</span>
                    </motion.span>
                    <strong>and crafting </strong>
                    <motion.span
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-purple-500/20 dark:bg-purple-500/20 border border-purple-500/20 shadow-sm shadow-purple-500/20 dark:shadow-none"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-500 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                      </svg>
                      <span className="text-[9px] md:text-xs text-purple-500 dark:text-purple-400">Prompting</span>
                    </motion.span>
                    <strong>— while questioning the absurdity of binary existence.</strong>
                  </p>
                </div>
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
      <GrainOverlay baseOpacity={0.05} />

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