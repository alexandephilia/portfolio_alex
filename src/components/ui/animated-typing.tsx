import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

interface AnimatedTypingProps {
  words: string[];
  className?: string;
  textSize?: string;
}

export const AnimatedTyping = ({ words, className = "", textSize = "text-[11px] md:text-sm lg:text-base" }: AnimatedTypingProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [key, setKey] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText === currentWord) {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          setKey(prev => prev + 1);
        }, 150);
      }
    } else {
      if (displayText === "") {
        timeoutId = setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }, 500);
      } else {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
          setKey(prev => prev + 1);
        }, 75);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentWordIndex, words]);

  return (
    <div className={`inline-block relative ${className}`}>
      <div className={`inline-block whitespace-pre ${textSize}`}>
        {displayText.split('').map((char, index) => (
          <motion.div
            key={`${key}-${index}`}
            initial={isTyping ? {
              opacity: 0,
              filter: "blur(8px)",
              y: 10,
              scale: 0.9
            } : {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1
            }}
            animate={isTyping ? {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1
            } : {
              opacity: 0,
              filter: "blur(8px)",
              y: -10,
              scale: 0.9
            }}
            transition={{
              duration: isTyping ? 0.15 : 0.12,
              ease: "easeInOut",
              delay: isTyping ? index * 0.025 : (displayText.length - index) * 0.02
            }}
            className="inline-block text-[#2a2a29] dark:text-[#EEEEEE] dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            style={{
              willChange: "transform, opacity, filter",
              backfaceVisibility: "hidden" as const,
              transform: "translateZ(0)",
              transformStyle: "preserve-3d" as const
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.div>
        ))}
      </div>

      <motion.span
        animate={{
          opacity: [1, 0],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.5, 0, 0.5, 1]
          }
        }}
        className="inline-block ml-[1px] text-[#2a2a29] dark:text-[#EEEEEE] dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        _
      </motion.span>
    </div>
  );
}; 