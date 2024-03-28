import React from 'react';

import {FOCUSABLE_ELEMENTS_QUERY} from '../constants';

/**
 * Hook to trap focus within a given element.
 * @param ref React.RefObject pointing to the HTMLElement to trap focus within.
 */
const useFocusTrap = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const getFocusableElements = (): HTMLElement[] =>
      Array.from(node.querySelectorAll(FOCUSABLE_ELEMENTS_QUERY)).filter(
        (el: Element): el is HTMLElement => !el.hasAttribute('disabled'),
      );

    let focusableElements = getFocusableElements();

    // Initially focus on the first element, if available.
    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      const isForwardTab = !event.shiftKey && activeElement === lastElement;
      const isBackwardTab = event.shiftKey && activeElement === firstElement;

      if (isForwardTab || isBackwardTab) {
        const targetElement = event.shiftKey ? firstElement : lastElement;
        targetElement.focus();
        event.preventDefault();
      }

      // Refresh list
      focusableElements = getFocusableElements();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ref]);
};

export default useFocusTrap;
