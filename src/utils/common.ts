/**
 * A function that does nothing.
 */
export const noop = (): void => {};

/**
 * Debounces a function that returns a Promise.
 *
 * @param func - The function to debounce. This should be a function that returns a Promise.
 * @param delay - The delay in milliseconds to wait before considering that typing has stopped.
 * @returns A debounced function with a cancel method.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
} => {
  let timeout: NodeJS.Timeout | null = null;
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

/**
 * Joins an array of strings with commas and 'and' for the last element.
 *
 * @param arr - The array of strings to join
 * @returns The joined string
 */
export const joinWithAnd = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) {
    return '';
  }

  if (arr.length === 1) {
    return arr[0];
  }

  return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
};

/**
 * Reverses a string.
 *
 * @param str - The string to reverse
 * @returns The reversed string
 */
export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};
