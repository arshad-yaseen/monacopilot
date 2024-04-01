import {useEffect} from 'react';

import {FOCUSABLE_ELEMENTS_QUERY} from '../constants';

/**
 * Traps focus within the element ref provided.
 * @param ref - React ref of the element to trap focus within.
 * @param enabled - If true, focus will be trapped within the element.
 */
const useFocusTrap = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  enabled: boolean,
): void => {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const node = ref.current;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements: HTMLElement[] = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_QUERY),
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const isShiftPressed = event.shiftKey;

      if (isShiftPressed && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!isShiftPressed && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    node.addEventListener('keydown', trapFocus);

    return () => {
      node.removeEventListener('keydown', trapFocus);
    };
  }, [enabled, ref]);
};

export default useFocusTrap;
