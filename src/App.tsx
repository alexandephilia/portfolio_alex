import "./App.css"
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import CustomCursor from "./components/CustomCursor";
import TerminalLoader from "./components/TerminalLoader";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load pages with explicit loading states
const Index = lazy(() => 
  Promise.all([
    import("./pages/Index"),
    new Promise(resolve => setTimeout(resolve, 500)) // Minimum loading time
  ]).then(([module]) => module)
);

const AIResearchPage = lazy(() => 
  Promise.all([
    import("./pages/projects/ai"),
    new Promise(resolve => setTimeout(resolve, 500)) // Minimum loading time
  ]).then(([module]) => module)
);

const PromptEngineeringPage = lazy(() => 
  Promise.all([
    import("./pages/projects/prompt"),
    new Promise(resolve => setTimeout(resolve, 500)) // Minimum loading time
  ]).then(([module]) => module)
);

const queryClient = new QueryClient();

// Scrambling text loader for project pages
const ScrambleLoader = () => {
  const [scrambledText, setScrambledText] = useState("Loading");
  const targetText = "Loading";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    let frame = 0;
    const totalFrames = 20;

    const interval = setInterval(() => {
      frame++;

      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (frame / totalFrames > index / targetText.length) {
            return `<span class="no-blur">${char}</span>`;
          }
          return `<span class="blur-sm">${characters[Math.floor(Math.random() * characters.length)]}</span>`;
        })
        .join("");

      setScrambledText(scrambled);

      if (frame >= totalFrames) {
        frame = 0;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="font-mono text-foreground/80 text-lg flex items-center">
        <motion.span
          dangerouslySetInnerHTML={{ __html: scrambledText }}
          className="[&_.blur-sm]:blur-[2px] [&_.no-blur]:blur-none"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.2, 0.8, 1]
          }}
          className="font-mono text-foreground/80 ml-[1px]"
        >
          _
        </motion.span>
      </div>
    </motion.div>
  );
};

// Wrapper component that ensures minimum display time
const DelayedRender = ({ children }: { children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000); // Minimum 1 second display time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {shouldRender ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        <ScrambleLoader />
      )}
    </AnimatePresence>
  );
};

// Wrapper component that ensures minimum display time for Terminal Loader
const TerminalLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000); // Minimum 2 second display time for terminal effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!shouldRender ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
        >
          <TerminalLoader />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2 // Small delay to ensure smooth transition
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  // Track navigation
  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);

  // Only show scramble when coming back from project pages
  const isComingFromProject = previousPath?.startsWith('/projects/');

  return (
    <AnimatePresence mode="sync">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={isComingFromProject ? <ScrambleLoader /> : null}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TerminalLoaderWrapper>
                  <Index />
                </TerminalLoaderWrapper>
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/projects/ai"
          element={
            <Suspense fallback={<ScrambleLoader />}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DelayedRender>
                  <AIResearchPage />
                </DelayedRender>
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/projects/prompt"
          element={
            <Suspense fallback={<ScrambleLoader />}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DelayedRender>
                  <PromptEngineeringPage />
                </DelayedRender>
              </motion.div>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <Router>
            <AppRoutes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;