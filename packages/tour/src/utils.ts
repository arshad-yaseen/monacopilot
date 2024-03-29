import {ClassValue} from './types';

/** Check if an element is in the viewport.
 * @param el HTMLElement to check.
 */
export const isInView = (el: HTMLElement): boolean => {
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

/** Set a style on an element and return a function to restore it.
 * @param el HTMLElement to set the style on.
 * @param style Style to set.
 * @param value Value to set.
 */
export const setStyle = (
  el: HTMLElement,
  style: keyof React.CSSProperties,
  value: string,
) => {
  const cur = el.style[style];
  el.style[style] = value;
  return () => {
    el.style[style] = cur;
  };
};

/** Generate a class name string from a list of class names or class name maps. Allows for conditional class names. */
export const cn = (...args: ClassValue[]): string => {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(cn(...arg)); // Recursively process arrays
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

/** Debounce a function.
 * @param func Function to debounce.
 * @param timeout Timeout in milliseconds.
 */
export const debounce = (
  func: () => void,
  timeout: number = 100,
): (() => void) => {
  let timer: number;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func();
    }, timeout);
  };
};

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent,
);

export const isBrowser = typeof window !== 'undefined';
