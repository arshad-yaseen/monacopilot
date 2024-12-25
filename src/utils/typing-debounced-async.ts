/**
 * Creates a debounced version of a function that returns a promise.
 * Adjusts delay based on typing speed - shorter delay after pauses.
 * Ensures that if a function call is in progress, new calls wait until it finishes.
 *
 * @param func - Function to debounce
 * @param baseWait - Max delay in ms (default: 600)
 * @param threshold - Pause threshold in ms (default: 200)
 */
export const typingDebouncedAsync = <
  T extends (...args: any[]) => Promise<any>,
>(
  func: T,
  baseWait: number = 600,
  threshold: number = 200,
): {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
} => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let currentPromise: Promise<ReturnType<T>> | null = null;
  let isExecuting = false;

  const debouncedFunc = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (isExecuting) {
      return Promise.resolve(undefined as ReturnType<T>);
    }

    lastArgs = args;
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastCallTime;
    lastCallTime = currentTime;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const delay = timeSinceLastCall < threshold ? baseWait : threshold;

    currentPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        isExecuting = true;
        try {
          if (lastArgs) {
            const result = await func(...lastArgs);
            resolve(result);
          } else {
            resolve(undefined as ReturnType<T>);
          }
        } catch (error) {
          reject(error);
        } finally {
          isExecuting = false;
          timeoutId = null;
          lastArgs = null;
        }
      }, delay);
    });

    return currentPromise;
  };

  debouncedFunc.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };

  return debouncedFunc;
};
