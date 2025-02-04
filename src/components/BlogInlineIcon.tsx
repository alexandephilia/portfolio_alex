import { motion } from "framer-motion";
import React from "react";

interface BlogInlineIconProps {
  children: React.ReactNode;
  animationType?: 'default' | 'think' | 'spark' | 'pulse' | 'spin' | 'bounce' | 'float' | 'glitch' | 'wave';
}

export const BlogInlineIcon = ({ children, animationType = 'default' }: BlogInlineIconProps) => {
  const animations = {
    default: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    think: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
        y: [0, -3, 0],
        rotate: [0, 5, -5, 0]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    spark: {
      animate: {
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0],
        filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.15, 1],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    spin: {
      animate: {
        opacity: [0.5, 1, 0.5],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    },
    bounce: {
      animate: {
        opacity: [0.5, 1, 0.5],
        y: [0, -4, 0],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      animate: {
        opacity: [0.5, 1, 0.5],
        y: [0, -3, 0],
        x: [-2, 2, -2],
        rotate: [-5, 5, -5]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    glitch: {
      animate: {
        opacity: [0.5, 1, 0.5],
        x: [-1, 1, -1],
        y: [1, -1, 1],
        scale: [1, 1.05, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    wave: {
      animate: {
        opacity: [0.5, 1, 0.5],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const selectedAnimation = animations[animationType];

  return (
    <motion.span
      className="inline-flex items-center justify-center ml-1 mr-[0px] text-primary"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={selectedAnimation.animate}
      transition={selectedAnimation.transition}
      style={{
        verticalAlign: 'middle',
        display: 'inline-flex',
        height: '1em',
        width: '1em',
        position: 'relative',
        top: '-2px'
      }}
    >
      {children}
    </motion.span>
  );
}; 