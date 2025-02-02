import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useAnimationControls, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Grain component
const Grain = ({ opacity = 0.8 }) => {
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
            }
        });
    }, [controls]);

    return (
        <div style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
            willChange: "transform",
            transform: "translateZ(0)"
        }}>
            <motion.div
                animate={controls}
                style={{
                    backgroundSize: "64px 64px",
                    backgroundRepeat: "repeat",
                    background: theme === 'dark'
                        ? "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
                        : "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
                    opacity: theme === 'dark' ? opacity : opacity * 0.8,
                    inset: "-200%",
                    width: "400%",
                    height: "400%",
                    position: "absolute",
                    filter: theme === 'dark'
                        ? 'none'
                        : 'invert(1) brightness(0.8)',
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                    transformStyle: "preserve-3d"
                }}
            />
        </div>
    );
};

interface ResearchLink {
    title: string;
    description: string;
    url: string;
    category: string;
    tags: string[];
}

const researchLinks: ResearchLink[] = [
    {
        title: "HuggingFace",
        description: "Leading hub for machine learning with over 300k models, 50k datasets, and 50k demo apps. Community-driven platform for AI research and deployment.",
        url: "https://huggingface.co/",
        category: "AI Platform",
        tags: ["Open Source", "Models", "Datasets", "Community", "Research"]
    },
    {
        title: "Perplexity",
        description: "AI-powered search engine and knowledge discovery tool that provides accurate, real-time information with direct source citations and interactive follow-up capabilities.",
        url: "https://www.perplexity.ai/",
        category: "AI Search",
        tags: ["Search", "Knowledge", "Citations", "Interactive", "Real-time"]
    },
    {
        title: "Anthropic",
        description: "Explore Claude's capabilities in reasoning, analysis, and coding assistance.",
        url: "https://claude.ai",
        category: "AI Assistants",
        tags: ["Claude", "Close Source", "Research"]
    },
    {
        title: "OpenAI",
        description: "Latest developments in GPT's large language models and their applications.",
        url: "https://openai.com/gpt-4",
        category: "Language Models",
        tags: ["GPT", "Close Source", "Research", "Memories", "Reasoning"]
    },
    {
        title: "DeepSeek",
        description: "Powerful AI model with 236B parameters and 64K context length. Specializes in math, code, and reasoning with impressive benchmark results.",
        url: "https://www.deepseek.com",
        category: "AI Models",
        tags: ["Open Source", "Math", "Coding", "Reasoning"]
    },
    {
        title: "Mistral",
        description: "Open and portable generative AI offering cutting-edge models. Features customization and multi-deployment options.",
        url: "https://mistral.ai",
        category: "Open Source AI",
        tags: ["Open Source", "Customizable", "Multi-deployment"]
    },
];

// Update TerminalWindow component with white borders (instead of green)
const TerminalWindow = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border border-border bg-background/40 backdrop-blur-sm overflow-hidden relative transition-colors duration-300">
        <div className="h-8 border-b border-border flex items-center px-4 bg-muted/30 backdrop-blur-sm transition-colors duration-300">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
        </div>
        <div className="relative">
            {children}
        </div>
    </div>
);

// TypewriterText component for terminal-like elements
const TypewriterText = ({ text, onComplete, className = "" }: {
    text: string;
    onComplete?: () => void;
    className?: string;
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setDisplayedText(""); // Reset text when component mounts
        setIsTyping(true);
        const chars = text.split('');
        let currentIndex = 0;

        const timer = setInterval(() => {
            if (currentIndex < chars.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(timer);
                setIsTyping(false);
                onComplete?.();
            }
        }, 50);

        return () => clearInterval(timer);
    }, [text, onComplete]);

    return (
        <span className={`inline-block ${className}`}>
            {displayedText}
            {isTyping && (
                <span className="border-r-2 border-foreground animate-blink ml-[1px]">&nbsp;</span>
            )}
        </span>
    );
};

// BlurRevealText component for descriptions
const BlurRevealText = ({ text, delay = 0, className = "" }: {
    text: string;
    delay?: number;
    className?: string;
}) => {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(10px)",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        duration: 0.5,
                        delay: delay + (index * 0.1),
                        ease: "easeOut"
                    }}
                    className="inline-block whitespace-pre"
                >
                    {word}{' '}
                </motion.span>
            ))}
        </span>
    );
};

const AIResearchPage = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);
    const [exitingIndex, setExitingIndex] = useState<number | null>(null);

    const handleBack = () => {
        setIsExiting(true);
        window.history.back();
    };

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                setIsExiting(false);
            }, 300); // Match the exit animation duration
            return () => clearTimeout(timer);
        }
    }, [isExiting]);

    return (
        <AnimatePresence mode="wait">
            {!isExiting ? (
                <motion.div
                    key="ai-research"
                    className="min-h-screen bg-background/50 backdrop-blur-sm text-foreground font-mono relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        transition: {
                            duration: 0.3,
                            ease: [0.32, 0.72, 0, 1]
                        }
                    }}
                >
                    <Grain opacity={0.05} />

                    <nav className="fixed w-full top-0 z-50">
                        <div className="bg-background/80 backdrop-blur-sm border-b border-border transition-colors duration-300">
                            <div className="container max-w-5xl flex h-16 items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-foreground hover:text-foreground/80"
                                    onClick={handleBack}
                                    disabled={isExiting}
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <TypewriterText
                                    text="~/ai-research $"
                                    className="ml-4 text-base md:text-xl text-foreground"
                                />
                            </div>
                        </div>
                    </nav>

                    <div className="container max-w-5xl pt-24 pb-16">
                        <div className="opacity-100">
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
                                {researchLinks.map((link, index) => {
                                    const [isHovered, setIsHovered] = useState(false);
                                    const [position, setPosition] = useState({ x: 0, y: 0 });
                                    const cardRef = useRef<HTMLDivElement>(null);

                                    useEffect(() => {
                                        const handleMouseMove = (e: MouseEvent) => {
                                            if (!cardRef.current || !isHovered) return;

                                            const rect = cardRef.current.getBoundingClientRect();
                                            const x = e.clientX - rect.left;
                                            const y = e.clientY - rect.top;

                                            requestAnimationFrame(() => {
                                                setPosition({ x, y });
                                            });
                                        };

                                        window.addEventListener('mousemove', handleMouseMove);
                                        return () => window.removeEventListener('mousemove', handleMouseMove);
                                    }, [isHovered]);

                                    return (
                                        <motion.div
                                            key={index}
                                            className="h-full col-span-1 md:col-span-1"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{
                                                opacity: 0,
                                                y: -20,
                                                transition: {
                                                    duration: 0.2,
                                                    ease: "easeIn",
                                                    delay: isExiting ? Math.max(0, (researchLinks.length - 1 - index) * 0.1) : 0
                                                }
                                            }}
                                            transition={{
                                                delay: index * 0.2,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <div 
                                                ref={cardRef}
                                                className="relative group h-full"
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                <ShimmerButton className="w-full h-full group">
                                                    <Card className="relative flex flex-col h-[300px] md:h-[280px] cursor-pointer transition-all duration-500 ease-out dark:bg-black/100 bg-white/[0.1] rounded-lg border-[1px] border-black/20 ring-1 ring-black/5 dark:border-white/10 dark:ring-white/5 hover:border-black/30 hover:ring-black/10 hover:shadow-[0_0_15px_rgb(39,39,42)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                                        {/* Grid Pattern Overlay - Light Mode */}
                                                        <div className="absolute inset-0 w-full h-full dark:opacity-0">
                                                            <svg
                                                                className="w-full h-full opacity-[0.08]"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="100%"
                                                                height="100%"
                                                            >
                                                                <defs>
                                                                    <pattern
                                                                        id={`ai-grid-light-${index}`}
                                                                        width="24"
                                                                        height="24"
                                                                        patternUnits="userSpaceOnUse"
                                                                    >
                                                                        <path
                                                                            d="M 24 0 L 0 0 0 24"
                                                                            fill="none"
                                                                            stroke="black"
                                                                            strokeWidth="0.5"
                                                                        />
                                                                    </pattern>
                                                                    <linearGradient id={`ai-fade-light-${index}`} x1="0" y1="1" x2="0.5" y2="0.5">
                                                                        <stop offset="0" stopColor="white" />
                                                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                                                    </linearGradient>
                                                                    <mask id={`ai-fade-mask-light-${index}`}>
                                                                        <rect width="100%" height="100%" fill={`url(#ai-fade-light-${index})`} />
                                                                    </mask>
                                                                </defs>
                                                                <rect width="100%" height="100%" fill={`url(#ai-grid-light-${index})`} mask={`url(#ai-fade-mask-light-${index})`} />
                                                            </svg>
                                                        </div>

                                                        {/* Grid Pattern Overlay - Dark Mode */}
                                                        <div className="absolute inset-0 w-full h-full opacity-0 dark:opacity-100">
                                                            <svg
                                                                className="w-full h-full opacity-[0.65]"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="100%"
                                                                height="100%"
                                                            >
                                                                <defs>
                                                                    <pattern
                                                                        id={`ai-grid-dark-${index}`}
                                                                        width="24"
                                                                        height="24"
                                                                        patternUnits="userSpaceOnUse"
                                                                    >
                                                                        <path
                                                                            d="M 24 0 L 0 0 0 24"
                                                                            fill="none"
                                                                            stroke="rgba(255, 255, 255, 0.3)"
                                                                            strokeWidth="0.5"
                                                                        />
                                                                    </pattern>
                                                                    <linearGradient id={`ai-fade-dark-${index}`} x1="0" y1="1" x2="0.4" y2="0.8">
                                                                        <stop offset="0" stopColor="white" />
                                                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                                                    </linearGradient>
                                                                    <mask id={`ai-fade-mask-dark-${index}`}>
                                                                        <rect width="100%" height="100%" fill={`url(#ai-fade-dark-${index})`} />
                                                                    </mask>
                                                                </defs>
                                                                <rect width="100%" height="100%" fill={`url(#ai-grid-dark-${index})`} mask={`url(#ai-fade-mask-dark-${index})`} />
                                                            </svg>
                                                        </div>

                                                        <CardHeader className="p-4 relative z-20">
                                                            <CardTitle className="text-sm md:text-base text-foreground transition-colors duration-300 flex items-center gap-2">
                                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                                {link.title}
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="p-4 pt-0 flex-grow relative z-20">
                                                            <div className="relative h-full">
                                                                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                                                    {link.description}
                                                                </p>
                                                                <div className="mt-4 flex flex-wrap gap-2">
                                                                    {link.tags.map((tag, tagIndex) => (
                                                                        <Badge 
                                                                            key={tagIndex}
                                                                            variant="secondary" 
                                                                            className="text-[10px] md:text-xs bg-muted/10 backdrop-blur-sm transition-colors duration-300"
                                                                        >
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto relative z-20 border-t border-border/50">
                                                            <div className="text-[10px] md:text-xs text-muted-foreground transition-colors duration-300">
                                                                {link.category}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 hover:bg-muted/30 bg-muted/20 backdrop-blur-sm transition-all duration-300"
                                                                onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Button>
                                                        </CardFooter>

                                                        {/* Shimmer effect */}
                                                        {isHovered && (
                                                            <div
                                                                className="absolute inset-0 z-10 transition-opacity duration-300"
                                                                style={{
                                                                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`
                                                                }}
                                                            />
                                                        )}
                                                    </Card>
                                                </ShimmerButton>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default AIResearchPage; 