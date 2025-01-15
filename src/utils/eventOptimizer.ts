export const createOptimizedEventHandler = <T extends (...args: any[]) => void>(
  handler: T,
  wait = 16.67 // One frame at 60fps
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let lastArgs: Parameters<T>;

  return (...args: Parameters<T>) => {
    lastArgs = args;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handler(...lastArgs);
    }, wait);
  };
}; 