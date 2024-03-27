import React from 'react';

import ReactDOM from 'react-dom';

import {DEFAULT_POPOVER_POSITION} from '../../constants';
import {getFloatingPosition} from '../../helpers';
import {useFocusTrap} from '../../hooks';
import {
  FloatingCoords,
  FloatingRect,
  PopoverContextType,
  PopoverProps,
} from '../../types';

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
  const [targetFloatingRect, setTargetFloatingRect] =
    React.useState<FloatingRect | null>(null);

  // Update target FloatingRectangle on target change
  React.useEffect(() => {
    if (!target) return;
    const FloatingRect = target.getBoundingClientRect();
    setTargetFloatingRect(FloatingRect);
  }, [target]);

  // Recalculate position on open or targetFloatingRect change
  React.useEffect(() => {
    if (!open || !targetFloatingRect || !popoverRef.current) return;
    const floatingFloatingRect = popoverRef.current.getBoundingClientRect();

    const newFloatingCoords: FloatingCoords = getFloatingPosition(
      targetFloatingRect,
      floatingFloatingRect,
      preferredPosition,
    );

    popoverRef.current.style.top = `${newFloatingCoords.top}px`;
    popoverRef.current.style.left = `${newFloatingCoords.left}px`;

    const currentPopover = popoverRef.current;

    return () => {
      if (currentPopover) {
        currentPopover.style.top = '';
        currentPopover.style.left = '';
      }
    };
  }, [open, targetFloatingRect, preferredPosition, popoverRef]);

  // Add an overlay to the popover and highlight the target when `shouldHighlightTarget` is set to true.
  React.useEffect(() => {
    const popoverContainer = popoverContainerRef.current;
    if (!popoverContainer || !target || !shouldHighlightTarget) return;

    target.style.zIndex = '10001';
    popoverContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    return () => {
      target.style.zIndex = '';
      popoverContainer.style.backgroundColor = '';
    };
  }, [shouldHighlightTarget, target]);

  // Trap focus within the popover for accessibility
  useFocusTrap(popoverRef);

  // Invoke onClickOutside when clicked outside the popover
  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target === popoverContainerRef.current) {
        onClickOutside?.();
      }
    };
    if (open) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [onClickOutside, open]);

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
