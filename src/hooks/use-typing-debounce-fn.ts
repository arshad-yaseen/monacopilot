import React from 'react';

/**
 * Debounces a function that returns a Promise, and calls it instantly after typing stops.
 *
 * @param func - The function to debounce. This should be a function that returns a Promise.
 * @param delay - The delay in milliseconds to wait before considering that typing has stopped.
 * @returns A debounced version of the function.
 */
const useTypingDebounceFn = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number = 1000,
): ((...funcArgs: Parameters<T>) => Promise<ReturnType<T>>) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunc = React.useCallback(
    (...args: Parameters<T>): Promise<ReturnType<T>> => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      return new Promise<ReturnType<T>>((resolve, reject) => {
        timerRef.current = setTimeout(() => {
          func(...args)
            .then(resolve)
            .catch(reject);
        }, delay);
      });
    },
    [func, delay],
  );

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedFunc;
};

export default useTypingDebounceFn;
