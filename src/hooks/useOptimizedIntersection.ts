import { useEffect, useCallback } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useOptimizedIntersection = (
  callback: () => void,
  options: IntersectionOptions = { threshold: 0.1, rootMargin: '50px' }
) => {
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);
    
    return () => observer.disconnect();
  }, [handleIntersection, options]);

  return useCallback((element: HTMLElement | null) => {
    if (element) {
      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [handleIntersection, options]);
}; 