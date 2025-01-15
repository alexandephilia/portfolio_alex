import React, { memo } from 'react';
import { isChromium } from '@/utils/browser';

interface OptimizedBlurContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const OptimizedBlurContainer = memo(({ 
  children, 
  className, 
  style 
}: OptimizedBlurContainerProps) => {
  // Cache Chrome detection
  const isChrome = React.useMemo(() => isChromium(), []);
  
  // Memoize styles with proper TypeScript types
  const computedStyles = React.useMemo(() => ({
    ...style,
    transform: isChrome ? 'translateZ(0)' : undefined,
    backfaceVisibility: isChrome ? 'hidden' as const : undefined,
    willChange: isChrome ? 'transform' : undefined,
  }), [style, isChrome]);

  return (
    <div className={className} style={computedStyles}>
      {children}
    </div>
  );
});

OptimizedBlurContainer.displayName = 'OptimizedBlurContainer';