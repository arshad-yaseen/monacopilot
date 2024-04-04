import {ClassValue} from './types';

/** Check if an element is in the viewport.
 * @param el HTMLElement to check.
 */
export const isInView = (el: HTMLElement | null): boolean => {
  if (!el || !window.visualViewport) return false;

  const rect = el.getBoundingClientRect();
  const SAFARI_ADJUSTMENT = 40;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.visualViewport.height - SAFARI_ADJUSTMENT &&
    rect.right <= window.visualViewport.width
  );
};

/** Generate a class name string from a list of class names or class name maps. Allows for conditional class names. */
export const cls = (...args: ClassValue[]): string => {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(cls(...arg));
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

/** Throttle a function.
 * @param func Function to throttle.
 * @param timeout Timeout in milliseconds.
 */
export const throttle = (
  func: () => void,
  timeout: number = 100,
): (() => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    // Set a new timer
    timer = setTimeout(() => {
      func();
      timer = null;
    }, timeout);
  };
};

export const uid = (base: string): string => {
  return `${base}-${Math.random().toString(36).slice(2, 11)}`;
};

export const isBrowser = typeof window !== 'undefined';
