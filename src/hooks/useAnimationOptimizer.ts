import { useEffect, useCallback } from 'react';

export const useAnimationOptimizer = (elementRef: React.RefObject<HTMLElement>) => {
  const optimize = useCallback(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    
    // Add optimization classes
    const classes = ['will-change-opacity', 'will-change-transform'];
    element.classList.add(...classes);
    
    // Cleanup function
    const cleanup = () => {
      if (element) {
        element.classList.remove(...classes);
      }
    };
    
    element.addEventListener('animationend', cleanup, { once: true });
    return cleanup;
  }, [elementRef]);

  useEffect(() => {
    const cleanup = optimize();
    return () => cleanup?.();
  }, [optimize]);

  return optimize;
}; 