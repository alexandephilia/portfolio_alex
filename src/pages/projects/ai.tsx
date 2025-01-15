import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useAnimationControls, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

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
    <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden relative">
        <div className="h-8 border-b border-border flex items-center px-4 bg-muted/20">
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
        // Start from the last item
        setExitingIndex(researchLinks.length - 1);
    };

    useEffect(() => {
        if (exitingIndex !== null) {
            const timer = setTimeout(() => {
                if (exitingIndex > 0) {
                    setExitingIndex(exitingIndex - 1);
                } else if (exitingIndex === 0) {
                    setExitingIndex(null);
                    navigate('/');
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [exitingIndex, navigate]);

    return (
        <AnimatePresence mode="wait">
            {!isExiting ? (
                <motion.div
                    key="ai-research"
                    className="min-h-screen bg-background/50 text-foreground font-mono"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        transition: {
                            duration: 0.35,
                            ease: [0.32, 0.72, 0, 1],
                            delay: 0.5 // Delay the container exit until items have animated
                        }
                    }}
                    transition={{
                        duration: 0.35,
                        ease: [0.32, 0.72, 0, 1]
                    }}
                >
                    <Grain opacity={0.08} />

                    <nav className="fixed w-full top-0 z-50">
                        <div className="bg-background/80 backdrop-blur-sm border-b border-border">
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
                            {researchLinks.map((link, index) => (
                                <motion.div
                                    key={index}
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
                                        delay: index * 0.3,
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    className="mb-6"
                                >
                                    <TerminalWindow>
                                        <div className="p-6 relative">
                                            <div className="flex items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="group flex items-center gap-2 min-w-0 flex-1">
                                                            <span className="text-muted-foreground shrink-0 group-hover:text-foreground transition-colors">$</span>
                                                            <TypewriterText
                                                                text={link.title}
                                                                className="text-base md:text-lg font-bold text-foreground group-hover:text-foreground/80 transition-colors"
                                                            />
                                                        </div>
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-foreground transition-colors ml-4"
                                                        >
                                                            <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                                                        </a>
                                                    </div>
                                                    <div className="mt-4 text-foreground/90 bg-muted/20 p-2 rounded">
                                                        <BlurRevealText
                                                            text={link.description}
                                                            delay={index * 0.3 + 0.2}
                                                            className="text-xs md:text-sm group-hover:text-foreground transition-colors"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 mt-4 flex-wrap">
                                                        {link.tags.map((tag, tagIndex) => (
                                                            <motion.span
                                                                key={tagIndex}
                                                                initial={{
                                                                    opacity: 0,
                                                                    filter: 'blur(4px)',
                                                                    x: -20
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    filter: 'blur(0px)',
                                                                    x: 0
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                    delay: tagIndex * 0.1 + 0.5,
                                                                    ease: "easeOut"
                                                                }}
                                                                className="text-[10px] md:text-xs border border-border px-2 py-0.5 rounded-sm bg-muted/20 text-muted-foreground group-hover:text-foreground transition-colors"
                                                            >
                                                                {tag}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TerminalWindow>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default AIResearchPage; 