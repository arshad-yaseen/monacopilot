import {FloatingCoords, FloatingPosition, FloatingRect} from './types';
import {throttle} from './utils';

// Calculate the floating position of the popover
export const getPopoverFloatingPosition = (
  floatingRect: FloatingRect,
  preferredPosition: FloatingPosition,
  targetRect?: FloatingRect, // Make targetRect optional
): FloatingCoords => {
  const spacing = 10;
  const viewPortMargin = 10;

  let top = 0;
  let left = 0;

  if (!targetRect || preferredPosition === 'window-center') {
    top = window.innerHeight / 2 - floatingRect.height / 2;
    left = window.innerWidth / 2 - floatingRect.width / 2;
  } else {
    switch (preferredPosition) {
      case 'top-center':
        top = targetRect.top! - floatingRect.height - spacing;
        left = targetRect.left! + targetRect.width / 2 - floatingRect.width / 2;
        break;
      case 'bottom-center':
        top = targetRect.top! + targetRect.height + spacing;
        left = targetRect.left! + targetRect.width / 2 - floatingRect.width / 2;
        break;
      case 'left-center':
        top = targetRect.top! + targetRect.height / 2 - floatingRect.height / 2;
        left = targetRect.left! - floatingRect.width - spacing;
        break;
      case 'right-center':
        top = targetRect.top! + targetRect.height / 2 - floatingRect.height / 2;
        left = targetRect.left! + targetRect.width + spacing;
        break;
    }
  }

  // Adjustments for viewport bounds
  top = Math.max(
    viewPortMargin,
    Math.min(top, window.innerHeight - floatingRect.height - viewPortMargin),
  );
  left = Math.max(
    viewPortMargin,
    Math.min(left, window.innerWidth - floatingRect.width - viewPortMargin),
  );

  return {top, left};
};

// Scroll to the step target element and call the onCompleted callback when the scroll is completed.
export const scrollToStepTarget = (
  targetElement: Element | null,
  onCompleted: () => void,
): void => {
  if (!targetElement) {
    onCompleted();
    return;
  }

  targetElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });

  let lastPosition: number | null = null;
  let animationFrameRequested = false;

  const checkScrollCompletion = () => {
    animationFrameRequested = false;

    const currentPosition = targetElement.getBoundingClientRect().top;
    if (currentPosition === lastPosition) {
      onCompleted();
      return;
    }

    lastPosition = currentPosition;
    requestNextAnimationFrame();
  };

  const requestNextAnimationFrame = () => {
    if (!animationFrameRequested) {
      requestAnimationFrame(checkScrollCompletion);
      animationFrameRequested = true;
    }
  };

  const throttledRequestNextAnimationFrame = throttle(
    requestNextAnimationFrame,
    100,
  );
  throttledRequestNextAnimationFrame();
};
