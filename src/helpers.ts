import {_DEFAULT_POPOVER_POSITION} from './constants';
import {
  FloatingCoords,
  FloatingPosition,
  FloatingRect,
  Tour,
  TourStep,
} from './types';
import {StepOptions, TourOptions} from './types/options';
import {throttle} from './utils';

export const calculatePopoverPosition = ({
  popoverRect,
  targetRect,
  preferredPosition,
  padding = 15,
}: {
  popoverRect: FloatingRect;
  targetRect: FloatingRect | null | undefined;
  preferredPosition: FloatingPosition;
  padding?: number;
}): FloatingCoords => {
  const {innerWidth: windowWidth, innerHeight: windowHeight} = window;
  let translateX = 0,
    translateY = 0;

  // Center the popover if targetRect is null or undefined
  if (!targetRect) {
    translateX = (windowWidth - popoverRect.width) / 2;
    translateY = (windowHeight - popoverRect.height) / 2;
    return {translateX, translateY};
  }

  // Helper functions to check if popover overflows the viewport
  const fitsInViewportX = (x: number) =>
    x >= 0 && x + popoverRect.width <= windowWidth;
  const fitsInViewportY = (y: number) =>
    y >= 0 && y + popoverRect.height <= windowHeight;

  // Calculate initial position based on preferredPosition
  switch (preferredPosition) {
    case 'top':
      translateX = targetRect.left + (targetRect.width - popoverRect.width) / 2;
      translateY = targetRect.top - popoverRect.height - padding;
      break;
    case 'right':
      translateX = targetRect.right + padding;
      translateY =
        targetRect.top + (targetRect.height - popoverRect.height) / 2;
      break;
    case 'bottom':
      translateX = targetRect.left + (targetRect.width - popoverRect.width) / 2;
      translateY = targetRect.bottom + padding;
      break;
    case 'left':
      translateX = targetRect.left - popoverRect.width - padding;
      translateY =
        targetRect.top + (targetRect.height - popoverRect.height) / 2;
      break;
    case 'center': // Center is a fallback and not typically a preferred position
      translateX = (windowWidth - popoverRect.width) / 2;
      translateY = (windowHeight - popoverRect.height) / 2;
      break;
  }

  // Adjust position if overflowing viewport
  if (!fitsInViewportX(translateX)) {
    if (preferredPosition === 'left' || preferredPosition === 'right') {
      // Try opposite side or center as a last resort
      translateX =
        preferredPosition === 'left'
          ? targetRect.right + padding
          : targetRect.left - popoverRect.width - padding;
      if (!fitsInViewportX(translateX)) {
        // If still doesn't fit, center it
        translateX = (windowWidth - popoverRect.width) / 2;
      }
    } else {
      // For top and bottom, horizontally center if overflow
      translateX = (windowWidth - popoverRect.width) / 2;
    }
  }

  if (!fitsInViewportY(translateY)) {
    if (preferredPosition === 'top' || preferredPosition === 'bottom') {
      // Try opposite side or center
      translateY =
        preferredPosition === 'top'
          ? targetRect.bottom + padding
          : targetRect.top - popoverRect.height - padding;
      if (!fitsInViewportY(translateY)) {
        // If still doesn't fit, center it
        translateY = (windowHeight - popoverRect.height) / 2;
      }
    } else {
      // For left and right, vertically center if overflow
      translateY = (windowHeight - popoverRect.height) / 2;
    }
  }

  return {translateX, translateY};
};

/** Scroll to the step target element and call the onCompleted callback when the scroll is completed. */
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
    500,
  );
  throttledRequestNextAnimationFrame();
};

export async function executeStepOptionCallback(
  callback?: () => void | Promise<void> | boolean | Promise<boolean>,
): Promise<boolean> {
  if (!callback) return true;
  const result = await callback();
  return result !== false;
}

export const getTourOptions = (tour: Tour | null): TourOptions => {
  const defaultOptions: TourOptions = {
    showOverlay: true,
    preventCloseOnClickOutside: false,
    showBackButton: true,
    showCloseButton: true,
    showProgress: true,
  };

  return {...defaultOptions, ...tour?.options};
};

export const getStepOptions = (step: TourStep | null): StepOptions => {
  const defaultOptions: StepOptions = {
    placement: _DEFAULT_POPOVER_POSITION,
    nextOnClickTarget: false,
    backOnClickTarget: false,
    closeOnClickTarget: false,
  };

  return {...defaultOptions, ...step};
};
