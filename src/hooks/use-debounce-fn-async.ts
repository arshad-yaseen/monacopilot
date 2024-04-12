import React from 'react';

/**
 * Debounce an asynchronous function.
 *
 * @param func The original, non-debounced asynchronous function.
 * @param delay The delay in milliseconds after which the function should execute.
 * @returns A debounced version of the asynchronous function that returns a promise.
 */
export function useDebounceFnAsync<
  Func extends (...args: any[]) => Promise<any>,
>(
  func: Func,
  delay: number = 1000,
): (...args: Parameters<Func>) => Promise<ReturnType<Func>> {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = React.useCallback(
    (...args: Parameters<Func>) => {
      return new Promise<ReturnType<Func>>((resolve, reject) => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          func(...args)
            .then(resolve)
            .catch(reject);
        }, delay);
      });
    },
    [func, delay],
  );

  return debouncedFunction;
}
