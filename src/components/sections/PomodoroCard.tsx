import { Card } from "@/components/ui/card";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Brain, Sun, Mountain, Rocket, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CSSProperties } from 'react';

type TimerMode = 'work' | 'break';

const getTimeBasedTheme = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
        return {
            text: "Rise & Grind",
            icon: "sun",
            colors: {
                bg: "bg-amber-500/10 dark:bg-amber-400/10",
                border: "border-amber-500/20 dark:border-amber-400/20",
                hover: "hover:bg-amber-500/20 dark:hover:bg-amber-400/20",
                text: "text-amber-700 dark:text-amber-300",
                iconColor: "text-amber-600 dark:text-amber-400"
            }
        };
    } else if (hour >= 12 && hour < 17) {
        return {
            text: "Peak Focus",
            icon: "mountain",
            colors: {
                bg: "bg-sky-500/10 dark:bg-sky-400/10",
                border: "border-sky-500/20 dark:border-sky-400/20",
                hover: "hover:bg-sky-500/20 dark:hover:bg-sky-400/20",
                text: "text-sky-700 dark:text-sky-300",
                iconColor: "text-sky-600 dark:text-sky-400"
            }
        };
    } else if (hour >= 17 && hour < 22) {
        return {
            text: "Final Sprint",
            icon: "rocket",
            colors: {
                bg: "bg-orange-500/10 dark:bg-orange-400/10",
                border: "border-orange-500/20 dark:border-orange-400/20",
                hover: "hover:bg-orange-500/20 dark:hover:bg-orange-400/20",
                text: "text-orange-700 dark:text-orange-300",
                iconColor: "text-orange-600 dark:text-orange-400"
            }
        };
    } else {
        return {
            text: "Night Owl",
            icon: "moon",
            colors: {
                bg: "bg-indigo-500/10 dark:bg-indigo-400/10",
                border: "border-indigo-500/20 dark:border-indigo-400/20",
                hover: "hover:bg-indigo-500/20 dark:hover:bg-indigo-400/20",
                text: "text-indigo-700 dark:text-indigo-300",
                iconColor: "text-indigo-600 dark:text-indigo-400"
            }
        };
    }
};

const AnimatedNumber = ({ number }: { number: string }) => {
    return (
        <div className="relative w-10 h-[1.2em] inline-flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={number}
                    initial={{
                        y: -100,
                        opacity: 0,
                        filter: "blur(8px)"
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)"
                    }}
                    exit={{
                        y: 100,
                        opacity: 0,
                        filter: "blur(8px)"
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                        type: "spring",
                        stiffness: 200,
                        damping: 30
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        backfaceVisibility: 'hidden' as CSSProperties['backfaceVisibility'],
                        transform: 'translateZ(0)',
                    }}
                >
                    {number}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const PomodoroCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [taskInput, setTaskInput] = useState('');
    const [currentTask, setCurrentTask] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [taskColor, setTaskColor] = useState('');
    const [timeTheme, setTimeTheme] = useState(getTimeBasedTheme());

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const blurValue = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current || !isHovered) return;
            const rect = cardRef.current.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovered]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Switch modes when timer ends
            setMode(prev => prev === 'work' ? 'break' : 'work');
            setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60);
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeTheme(getTimeBasedTheme());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleReset = () => {
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
        setIsRunning(false);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const getComplementaryColor = (hue: number) => {
        const complementaryHue = (hue + 180) % 360;
        return {
            primary: `hsla(${hue}, 100%, 85%, 0.2)`,
            complementary: `hsla(${complementaryHue}, 100%, 85%, 0.1)`,
            border: `hsla(${hue}, 100%, 75%, 0.3)`
        };
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskInput.trim()) {
            setCurrentTask(taskInput);
            setTaskInput('');
            const hue = Math.floor(Math.random() * 360);
            setTaskColor(JSON.stringify(getComplementaryColor(hue)));
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            style={{ filter: blurValue }}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <Card
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-black/20 ring-1 ring-black/5 dark:border-white/10 hover:border-black/30 hover:ring-black/10"
                style={{
                    minHeight: '320px',
                    padding: '1.5rem',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
            >
                <AnimatePresence>
                    {currentTask && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(4px)" }}
                            className="absolute top-6 right-6 max-w-[200px]"
                        >
                            <div
                                className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-[2px] shadow-sm transition-all duration-300"
                                style={{
                                    background: `linear-gradient(135deg, ${JSON.parse(taskColor).primary}, ${JSON.parse(taskColor).complementary})`,
                                    border: `1px solid ${JSON.parse(taskColor).border}`,
                                    boxShadow: `0 2px 10px ${JSON.parse(taskColor).complementary}`,
                                }}
                            >
                                <p className="text-[8px] sm:text-sm font-medium">{currentTask}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mb-6">
                    <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors
                        ${mode === 'work' ? timeTheme.colors.bg : 'bg-black/5 dark:bg-white/5'}
                        ${mode === 'work' ? timeTheme.colors.border : 'border-black/10 dark:border-white/10'}
                        border`}
                    >
                        {mode === 'work' ? (
                            <>
                                {timeTheme.icon === 'sun' && <Sun className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${timeTheme.colors.iconColor}`} />}
                                {timeTheme.icon === 'mountain' && <Mountain className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${timeTheme.colors.iconColor}`} />}
                                {timeTheme.icon === 'rocket' && <Rocket className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${timeTheme.colors.iconColor}`} />}
                                {timeTheme.icon === 'moon' && <Moon className={`h-2.5 w-2.5 sm:h-4 sm:w-4 ${timeTheme.colors.iconColor}`} />}
                                <span className={`text-[8px] sm:text-sm font-medium ${timeTheme.colors.text}`}>
                                    {timeTheme.text}
                                </span>
                            </>
                        ) : (
                            <>
                                <Coffee className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                                <span className="text-[8px] sm:text-sm font-medium">Break Time</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                    <span className="text-5xl sm:text-6xl font-mono font-bold flex items-center justify-center gap-1">
                        {formatTime(timeLeft).split('').map((digit, index, array) => (
                            <Fragment key={`${index}-${digit}`}>
                                {digit === ':' ? (
                                    <div className="w-6 flex justify-center">:</div>
                                ) : (
                                    <AnimatedNumber number={digit} />
                                )}
                            </Fragment>
                        ))}
                    </span>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        data-magnetic="true"
                        className="p-2 sm:p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors pointer-events-auto"
                    >
                        {isRunning ? (
                            <Pause className="h-4 w-4 sm:h-6 sm:w-6" />
                        ) : (
                            <Play className="h-4 w-4 sm:h-6 sm:w-6" />
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        data-magnetic="true"
                        className="p-2 sm:p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors pointer-events-auto"
                    >
                        <RotateCcw className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                </div>

                <div className="mt-6 w-[90%] sm:w-[80%] max-w-[260px] sm:max-w-[300px] mx-auto">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="What are you working on?"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 text-[10px] sm:text-sm text-center transition-all duration-300"
                            style={{
                                fontSize: `${Math.max(9, Math.min(12, 14 - taskInput.length / 10))}px`
                            }}
                        />
                    </div>
                </div>

                {isHovered && (
                    <div
                        className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`
                        }}
                    />
                )}
            </Card>
        </motion.div>
    );
};