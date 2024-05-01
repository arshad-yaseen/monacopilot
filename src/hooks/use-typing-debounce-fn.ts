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
  const [timer, setTimer] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const debouncedFunc = React.useCallback(
    (...args: Parameters<T>): Promise<ReturnType<T>> => {
      if (timer) {
        clearTimeout(timer);
      }

      return new Promise<ReturnType<T>>((resolve, reject) => {
        const newTimer = setTimeout(() => {
          func(...args)
            .then(resolve)
            .catch(reject);
        }, delay);

        setTimer(newTimer);
      });
    },
    [func, delay, timer],
  );

  React.useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedFunc;
};

export default useTypingDebounceFn;
