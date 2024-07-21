/**
 * Debounces a function that returns a Promise.
 *
 * @param func - The function to debounce. This should be a function that returns a Promise.
 * @param delay - The delay in milliseconds to wait before considering that typing has stopped.
 * @returns A debounced version of the function.
 */
export const debounce = <T extends (...args: any[]) => Promise<any>>(
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
