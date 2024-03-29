import React from 'react';

import ReactDOM from 'react-dom';

import {_DEFAULT_POPOVER_POSITION} from '../../constants';
import {getPopoverFloatingPosition} from '../../helpers';
import {useFocusTrap, useLockBodyScroll} from '../../hooks';
import {PopoverContextType, PopoverProps} from '../../types';
import {cn, setStyle} from '../../utils';

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
  onClickOutside,
  shouldHighlightTarget = true,
}: PopoverProps) => {
  if (!open) return null;

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
  className,
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
  const [isPositioned, setIsPositioned] = React.useState(false);

  React.useEffect(() => {
    const {current: popover} = popoverRef;

    if (!open || !target || !popover) return;

    const positionPopover = () => {
      const targetRect = target.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const coords = getPopoverFloatingPosition(
        targetRect,
        popoverRect,
        preferredPosition,
      );

      setStyle(popover, 'top', `${coords.top}px`);
      setStyle(popover, 'left', `${coords.left}px`);

      setIsPositioned(true);
    };

    positionPopover();

    let restore: (() => void) | undefined;
    if (shouldHighlightTarget) {
      restore = setStyle(target, 'zIndex', '10001');
    }

    return () => {
      if (restore) restore();
    };
  }, [open, target, preferredPosition, shouldHighlightTarget]);

  useFocusTrap(popoverRef, open);
  useLockBodyScroll(open);

  return ReactDOM.createPortal(
    <>
      <div
        className={cn('nt-popover-overlay', {
          active: open && !!shouldHighlightTarget,
        })}
        onClick={onClickOutside}
      />
      <div
        {...props}
        ref={popoverRef}
        className={cn(
          'nt-popover',
          {'enable-transition': isPositioned},
          className,
        )}>
        {children}
      </div>
    </>,
    document.body,
  );
};

Popover.Content = PopoverContent;

export default Popover;
