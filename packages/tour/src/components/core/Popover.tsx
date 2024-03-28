import React from 'react';

import ReactDOM from 'react-dom';

import {DEFAULT_POPOVER_POSITION} from '../../constants';
import {getPopoverFloatingPosition} from '../../helpers';
import {useFocusTrap, usePreventScroll} from '../../hooks';
import {
  FloatingCoords,
  FloatingRect,
  PopoverContextType,
  PopoverProps,
} from '../../types';
import {setStyle} from '../../utils';

const PopoverContext = React.createContext<PopoverContextType | null>(null);

const usePopover = (): PopoverContextType => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within a Popover component');
  }
  return context;
};

const Popover = ({
  children,
  open,
  preferredPosition = DEFAULT_POPOVER_POSITION,
  target,
  onClickOutside,
  shouldHighlightTarget = true,
}: PopoverProps) => {
  if (!target || !open) return null;

  return (
    <PopoverContext.Provider
      value={{
        open,
        preferredPosition,
        target,
        onClickOutside,
        shouldHighlightTarget,
      }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverContent = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    open,
    target,
    preferredPosition,
    onClickOutside,
    shouldHighlightTarget,
  } = usePopover();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const popoverContainerRef = React.useRef<HTMLDivElement>(null);
  const [targetRect, setTargetRect] = React.useState<FloatingRect | null>(null);

  // Get the target element's rect
  React.useEffect(() => {
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect(rect);
    }
  }, [target]);

  // Position the popover based on the target element
  React.useEffect(() => {
    if (!open || !targetRect || !popoverRef.current) return;
    const newCoords: FloatingCoords = getPopoverFloatingPosition(
      targetRect,
      popoverRef.current.getBoundingClientRect(),
      preferredPosition,
    );

    const {current: popover} = popoverRef;

    popover.style.top = `${newCoords.top}px`;
    popover.style.left = `${newCoords.left}px`;

    // Add transition after the initial positioning
    const animationTimeoutId = setTimeout(() => {
      popover.style.transition =
        'top var(--nt-transition-duration), left var(--nt-transition-duration)';
    }, 50);

    return () => {
      clearTimeout(animationTimeoutId);
    };
  }, [open, targetRect, preferredPosition]);

  // Highlight the target element and dim the background if `shouldHighlightTarget` is true
  React.useEffect(() => {
    if (shouldHighlightTarget && target && popoverContainerRef.current) {
      const restoreTargetZIndex = setStyle(target, 'zIndex', '10001');

      popoverContainerRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

      const changedPopoverContainer = popoverContainerRef.current;

      return () => {
        changedPopoverContainer.style.backgroundColor = '';
        restoreTargetZIndex();
      };
    }
  }, [shouldHighlightTarget, target]);

  // Trapping focus inside the popover
  useFocusTrap(popoverRef);
  // Preventing scrolling on the body when the popover is open
  usePreventScroll(open);

  // Invoke the `onClickOutside` callback when clicking outside the popover.
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverContainerRef.current === e.target) {
        onClickOutside?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClickOutside]);

  return ReactDOM.createPortal(
    <div ref={popoverContainerRef} data-nt-popover-container>
      <div {...props} ref={popoverRef} data-nt-popover>
        {children}
      </div>
    </div>,
    document.body,
  );
};

Popover.Content = PopoverContent;

export default Popover;
