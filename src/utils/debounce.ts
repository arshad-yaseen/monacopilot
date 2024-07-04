/**
 * Debounces a function that returns a Promise.
 *
 * @param func - The function to debounce. This should be a function that returns a Promise.
 * @param delay - The delay in milliseconds to wait before considering that typing has stopped.
 * @returns A debounced version of the function.
 */
const debounceFn = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number = 1000,
): ((...funcArgs: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timerRef: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunc = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timerRef) {
      clearTimeout(timerRef);
    }

    return new Promise<ReturnType<T>>((resolve, reject) => {
      timerRef = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };

  return debouncedFunc;
};

export default debounceFn;
