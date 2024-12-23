/**
 * Creates a debounced version of a function that returns a promise.
 * Adjusts delay based on typing speed - uses full delay for rapid typing,
 * shorter delay after pauses.
 *
 * @param func - Function to debounce
 * @param baseWait - Max delay in ms
 * @param threshold - Pause threshold in ms
 * @returns Debounced function with cancel method
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

  const debouncedFunc = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    lastArgs = args;
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastCallTime;
    lastCallTime = currentTime;

    // Cancel any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const delay = timeSinceLastCall < threshold ? baseWait : threshold;

    // Create a new promise for this call
    currentPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          if (lastArgs) {
            const result = await func(...lastArgs);
            resolve(result);
          }
        } catch (error) {
          reject(error);
        } finally {
          // Reset state
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
    // Don't reject the promise on cancel, allowing code after fetchCompletion to execute
    lastArgs = null;
  };

  return debouncedFunc;
};
