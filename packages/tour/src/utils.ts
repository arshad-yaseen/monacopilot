/** Check if an element is in the viewport.
 * @param el HTMLElement to check.
 */
export const isInViewport = (el: HTMLElement): boolean => {
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

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent,
);

export const isBrowser = typeof window !== 'undefined';
