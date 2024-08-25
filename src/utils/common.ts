/**
 * Creates a debounced version of an asynchronous function.
 *
 * @template T - The type of the function to be debounced
 * @param {T} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Object} An object containing the debounced function and a cancel method
 * @property {(...args: Parameters<T>) => Promise<ReturnType<T>>} - The debounced function
 * @property {() => void} cancel - A method to cancel the pending execution
 */
export const asyncDebounce = <T extends (...args: any[]) => any>(
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
