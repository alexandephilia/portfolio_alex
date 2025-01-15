export const performanceMonitor = {
  marks: new Set<string>(),

  start(id: string) {
    if (process.env.NODE_ENV === 'development') {
      performance.mark(`${id}-start`);
      this.marks.add(id);
    }
  },

  end(id: string) {
    if (process.env.NODE_ENV === 'development' && this.marks.has(id)) {
      performance.mark(`${id}-end`);
      performance.measure(id, `${id}-start`, `${id}-end`);
      this.marks.delete(id);
      
      const measurements = performance.getEntriesByName(id);
      if (measurements[0]?.duration > 16.67) { // 60fps threshold
        console.warn(`Performance warning: ${id} took ${measurements[0].duration.toFixed(2)}ms`);
      }
    }
  }
}; 