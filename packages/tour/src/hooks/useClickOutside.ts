import React from 'react';

/**
 * This hook listens for clicks outside of the specified ref element.
 * When a click is detected outside of the ref element, the callback is called.
 */
const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) => {
  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, callback]);
};

export default useClickOutside;
