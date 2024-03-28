import {useEffect, useLayoutEffect} from 'react';

import {isBrowser, isSafari} from '../utils';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// Prevents scrolling on the body element
export const useLockBodyScroll = (preventScroll: boolean) => {
  useIsomorphicLayoutEffect(() => {
    if (!preventScroll) {
      return;
    }

    // Call the appropriate method based on the platform
    const restoreFn = isSafari
      ? loackBodyScrollSafari()
      : loackBodyScrollStandard();

    return () => {
      restoreFn();
    };
  }, [preventScroll]);
};

const loackBodyScrollStandard = () => {
  const originalStyle = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = originalStyle;
  };
};

// Mobile Safari presents unique challenges for preventing body scroll, especially when dealing with collapsed UI components, visible keyboards, and input focus behaviors. To address these without causing scroll jankiness, we:

// 1. Block touch scrolling outside scrollable elements and at the extremes within them.
// 2. Manually manage focus on inputs to avoid unintended scrolling.
// 3. Use transformations and negative margins to simulate a static viewport, maintaining visual consistency while technically locking the scroll position.
// 4. Employ scroll event handlers as a fallback to ensure the page remains at the top, counteracting any forced scrolls by browser behaviors.
const loackBodyScrollSafari = () => {
  const originalStyles = {
    overflow: document.body.style.overflow,
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    right: document.body.style.right,
  };

  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = originalStyles.overflow;
    document.body.style.position = originalStyles.position;
    document.body.style.top = originalStyles.top;
    document.body.style.left = originalStyles.left;
    document.body.style.right = originalStyles.right;
    window.scrollTo(0, scrollY);
  };
};

export default useLockBodyScroll;
