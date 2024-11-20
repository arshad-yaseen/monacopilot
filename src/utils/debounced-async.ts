/**
 * Creates a debounced version of a function that returns a promise.
 * The debounced function will delay execution by the specified wait time,
 * cancelling any pending executions when called again within that time.
 *
 * @template T - The type of the function to debounce
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay execution
 * @returns A debounced version of the function with a cancel method
 * @example
 * const debouncedFn = debouncedAsync(myAsyncFn, 300);
 * await debouncedFn(); // Will execute after 300ms
 * debouncedFn.cancel(); // Cancels pending execution
 */
export const debouncedAsync = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
} => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let reject: ((reason?: any) => void) | null = null;

  const debouncedFunc = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, rejectPromise) => {
      if (timeout) {
        clearTimeout(timeout);
        if (reject) reject('Cancelled');
      }

      reject = rejectPromise;

      timeout = setTimeout(() => {
        resolve(func(...args));
        reject = null;
      }, wait);
    });
  };

  debouncedFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      if (reject) reject('Cancelled');
      timeout = null;
      reject = null;
    }
  };

  return debouncedFunc;
};
