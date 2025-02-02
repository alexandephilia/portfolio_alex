import { useEffect, useState } from "react";
import SplitText from "@/components/ui/split-text";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TerminalLoader = () => {
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const navigate = useNavigate();

    const text = "Hello!";
    const baseDelay = { mobile: 75, tablet: 100, desktop: 150 };
    const exitDuration = 0.6;

    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={() => navigate("/")}>
            {!isAnimationComplete && (
                <motion.div
                    className="flex items-center justify-center min-h-screen bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: exitDuration, ease: "easeInOut" }}
                >
                    <SplitText
                        text={text}
                        className="text-8xl font-bold text-foreground"
                        delay={baseDelay}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        textAlign="center"
                        onLetterAnimationComplete={handleAnimationComplete}
                        fontSize={{ mobile: '3rem', tablet: '5rem', desktop: '9rem' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalLoader;