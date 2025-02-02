import { useEffect, useState } from "react";
import SplitText from "@/components/ui/split-text";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TerminalLoader = () => {
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [shouldExit, setShouldExit] = useState(false);
    const navigate = useNavigate();

    const text = "Hello!";
    const baseDelay = { mobile: 75, tablet: 100, desktop: 150 };

    useEffect(() => {
        if (isAnimationComplete && !shouldExit) {
            // Start exit animation immediately after split-text completes
            setShouldExit(true);
        }

        if (shouldExit) {
            // Only navigate after exit animation is done
            const timer = setTimeout(() => {
                navigate("/");
            }, 500); // Match the exit animation duration
            return () => clearTimeout(timer);
        }
    }, [isAnimationComplete, shouldExit, navigate]);

    return (
        <AnimatePresence mode="wait">
            {!shouldExit && (
                <motion.div
                    className="flex items-center justify-center min-h-screen bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SplitText
                        text={text}
                        className="text-8xl font-bold text-foreground"
                        delay={baseDelay}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        textAlign="center"
                        onLetterAnimationComplete={() => setIsAnimationComplete(true)}
                        fontSize={{ mobile: '3rem', tablet: '5rem', desktop: '9rem' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalLoader;