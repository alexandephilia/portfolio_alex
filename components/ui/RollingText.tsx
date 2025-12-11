import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface RollingTextProps {
  words: string[];
  progress: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
  height?: string | number; // Height of the visible area
}

interface WordProps {
  word: string;
  index: number;
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ 
  word, 
  index, 
  progress 
}: WordProps) => {
  // Blur logic: 0 blur at index, 10px blur at index +/- 1
  const filter = useTransform(
    progress,
    [index - 0.5, index, index + 0.5],
    ['blur(8px)', 'blur(0px)', 'blur(8px)']
  );

  // Opacity logic: fade to 0 at edges to create soft mask 
  const opacity = useTransform(
    progress,
    [index - 0.6, index, index + 0.6],
    [0, 1, 0]
  );
  
  // Y shift to counteract some of the container movement if we wanted 'sticky' feeling, 
  // but for 'Swiss Roller' purely vertical is correct.
  // Although, if we want "fade out/in", the 0 opacity at 0.6 ensures it disappears as it leaves the window.

  return (
    <motion.div 
      className="flex items-end justify-center w-full h-full flex-shrink-0"
      style={{ 
        height: '100%',
        filter,
        opacity
      }}
    >
      {word}
    </motion.div>
  );
};

const RollingText: React.FC<RollingTextProps> = ({
  words,
  progress,
  className,
  style,
  height = "1em"
}) => {
  // We want to translate the entire column of words based on the progress.
  const y = useTransform(
    progress, 
    words.map((_, i) => i), 
    words.map((_, i) => `-${i * 100}%`)
  );

  return (
    <div 
      className={`overflow-visible ${className}`} 
      style={{ 
        height: height, 
        display: 'block',
        position: 'relative',
        ...style 
      }}
    >
      <motion.div
        style={{ y, width: '100%', height: '100%' }}
        className="flex flex-col"
      >
        {words.map((word, i) => (
          <Word key={i} word={word} index={i} progress={progress} />
        ))}
      </motion.div>
    </div>
  );
};

export default RollingText;
