import React from 'react';
import { Brain, Sparkles, MessageCircle, Code, Lightbulb, Zap, Star, Coffee } from 'lucide-react';
import { BlogInlineIcon } from '@/components/BlogInlineIcon';

const iconMap = {
  'nihilism': <Brain size={14} />,
  'universe': <Sparkles size={14} />,
  'damn': <MessageCircle size={14} />,
  'code': <Code size={14} />,
  'think': <Lightbulb size={14} />,
  'energy': <Zap size={14} />,
  'magic': <Star size={14} />,
  'coffee': <Coffee size={14} />
};

export const addBlogInlineIcons = (text: string) => {
  const pattern = new RegExp(`(\\b${Object.keys(iconMap).join('\\b|\\b')}\\b)`, 'gi');

  return text.split(pattern).map((part, index) => {
    const lowercasePart = part.toLowerCase();
    const iconConfig = iconMap[lowercasePart as keyof typeof iconMap];

    return iconConfig
      ? <span key={index}>
          {part}
          <BlogInlineIcon animationType={
            lowercasePart === 'think' ? 'think' :
            lowercasePart === 'energy' ? 'spark' :
            lowercasePart === 'magic' ? 'pulse' :
            lowercasePart === 'coffee' ? 'spin' :
            lowercasePart === 'nihilism' ? 'bounce' :
            lowercasePart === 'universe' ? 'float' :
            lowercasePart === 'damn' ? 'glitch' :
            lowercasePart === 'code' ? 'wave' : 'default'
          }>
            {iconConfig}
          </BlogInlineIcon>
        </span>
      : part;
  });
}; 