import React from 'react';
import { Code, Link, Star, Zap } from 'lucide-react';

const iconMap = {
  '[code]': <Code className="inline h-3 w-3 mx-0.5 -mt-0.5" />,
  '[link]': <Link className="inline h-3 w-3 mx-0.5 -mt-0.5" />,
  '[star]': <Star className="inline h-3 w-3 mx-0.5 -mt-0.5" />,
  '[zap]': <Zap className="inline h-3 w-3 mx-0.5 -mt-0.5" />
};

export const addBlogInlineIcons = (text: string) => {
  const parts = text.split(/(\[code\]|\[link\]|\[star\]|\[zap\])/g);
  return parts.map((part, index) => {
    const icon = iconMap[part as keyof typeof iconMap];
    return icon ? React.cloneElement(icon, { key: index }) : part;
  });
}; 