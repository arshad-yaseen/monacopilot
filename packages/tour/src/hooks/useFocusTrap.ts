import React from 'react';

import {FOCUSABLE_ELEMENTS_QUERY} from '../constants';

/**
 * This hook traps focus within a specified ref element, ensuring that keyboard navigation
 * does not move outside the bounds of the element.
 *
 * @param ref A React ref object pointing to the element to trap focus within.
 */
const useFocusTrap = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const getFocusableElements = (): HTMLElement[] =>
      Array.from(node.querySelectorAll(FOCUSABLE_ELEMENTS_QUERY)).filter(
        el => !el.hasAttribute('disabled'),
      ) as HTMLElement[];

    let focusableElements = getFocusableElements();

    // Focus on the first element initially if any are available.
    if (focusableElements[0]) focusableElements[0].focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // Refresh focusable elements to ensure the list is up-to-date.
      focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const {firstElement, lastElement} = {
        firstElement: focusableElements[0],
        lastElement: focusableElements[focusableElements.length - 1],
      };

      // Handling forward tab on the last element or backward tab on the first element.
      if (
        (event.shiftKey && document.activeElement === firstElement) ||
        (!event.shiftKey && document.activeElement === lastElement)
      ) {
        const targetElement = event.shiftKey ? lastElement : firstElement;
        targetElement.focus();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup to remove the event listener on component unmount.
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ref]);
};

export default useFocusTrap;
