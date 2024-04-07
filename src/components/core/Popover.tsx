import React from 'react';

import ReactDOM from 'react-dom';

import {_DEFAULT_POPOVER_POSITION} from '../../constants';
import {calculatePopoverPosition} from '../../helpers';
import {useFocusTrap, useLockBodyScroll} from '../../hooks';
import {PopoverContextType, PopoverProps} from '../../types';
import {cls} from '../../utils';
import SpotlightOverlay from '../spotlight-overlay';

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
  preferredPosition = _DEFAULT_POPOVER_POSITION,
  target,
  shouldShowOverlay = true,
  onClickOutside,
  onClickTarget,
}: PopoverProps) => {
  if (!open) return null;

  return (
    <PopoverContext.Provider
      value={{
        open,
        preferredPosition,
        target,
        shouldShowOverlay,
        onClickOutside,
        onClickTarget,
      }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverContent = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    open,
    target,
    preferredPosition,
    shouldShowOverlay,
    onClickOutside,
    onClickTarget,
  } = usePopover();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = React.useState(false);

  // Position the popover
  React.useEffect(() => {
    const {current: popover} = popoverRef;

    if (!open || !popover) return;

    const positionPopover = () => {
      const targetRect = target?.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const {translateX, translateY} = calculatePopoverPosition({
        popoverRect,
        targetRect,
        preferredPosition,
      });

      requestAnimationFrame(() => {
        popover.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    positionPopover();

    let restore: (() => void) | undefined;

    // Wait for the popover to be positioned before enabling transitions
    const timeoutId = setTimeout(() => {
      if (!isPositioned) setIsPositioned(true);
    }, 20);

    window.addEventListener('resize', positionPopover);

    return () => {
      if (restore) restore();
      clearTimeout(timeoutId);
      window.removeEventListener('resize', positionPopover);
    };
  }, [open, target, preferredPosition, shouldShowOverlay, isPositioned]);

  // Listen for clicks on the target element
  React.useEffect(() => {
    if (!target) return;

    const handleTargetClick = (event: MouseEvent) => {
      if (!open || !onClickTarget) return;

      const targetElement = event.target as HTMLElement;
      if (targetElement !== target) return;

      onClickTarget();
    };

    target.addEventListener('click', handleTargetClick);

    return () => {
      target.removeEventListener('click', handleTargetClick);
    };
  }, [open, target, onClickOutside, onClickTarget]);

  useFocusTrap(popoverRef, open);
  useLockBodyScroll(open);

  return ReactDOM.createPortal(
    <div
      data-show-overlay={shouldShowOverlay}
      className={cls('nt-popover-root', {'enable-transition': isPositioned})}>
      <div className={cls('nt-popover', className)} {...props} ref={popoverRef}>
        {children}
      </div>
      <SpotlightOverlay
        target={target}
        isOpen={open}
        onClickOverlay={onClickOutside}
      />
    </div>,
    document.body,
  );
};

Popover.Content = PopoverContent;

export default Popover;
