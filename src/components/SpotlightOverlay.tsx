import React from 'react';

import {
  SpotlightOverlayPartProps,
  SpotlightOverlayProps,
  TargetRect,
} from '../types';

const OverlayPart = ({
  style,
  children,
  onClickOverlay,
}: SpotlightOverlayPartProps) => (
  <div
    style={style}
    onClick={e => e.stopPropagation()}
    onPointerUp={onClickOverlay}>
    {children}
  </div>
);

const createOverlayStyle = (
  position: React.CSSProperties,
): React.CSSProperties => ({
  position: 'fixed',
  zIndex: 10000,
  pointerEvents: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  ...position,
});

const SpotlightOverlay = React.memo(
  ({target, isOpen, onClickOverlay}: SpotlightOverlayProps) => {
    const [targetRect, setTargetRect] = React.useState<TargetRect | null>(null);
    const padding = 5; // Padding around the target element in pixels

    const updateTargetRect = React.useCallback(() => {
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
      }
    }, [target]);

    React.useEffect(() => {
      if (!isOpen) return;

      updateTargetRect();
      window.addEventListener('resize', updateTargetRect);

      return () => window.removeEventListener('resize', updateTargetRect);
    }, [isOpen, target, updateTargetRect]);

    if (!isOpen || !targetRect) {
      return null;
    }

    const {top, left, width, height} = targetRect;
    const bottomTop = top + height;
    const rightLeft = left + width;

    if (!target) {
      return (
        <div
          style={createOverlayStyle({
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          })}
        />
      );
    }

    return (
      <>
        <OverlayPart
          style={createOverlayStyle({
            top: 0,
            left: 0,
            width: '100%',
            height: `${top}px`,
          })}
          onClickOverlay={onClickOverlay}
        />
        <OverlayPart
          style={createOverlayStyle({
            top: `${bottomTop}px`,
            left: 0,
            width: '100%',
            height: `${window.innerHeight - bottomTop}px`,
          })}
          onClickOverlay={onClickOverlay}
        />
        <OverlayPart
          style={createOverlayStyle({
            top: `${top}px`,
            left: 0,
            width: `${left}px`,
            height: `${height}px`,
          })}
          onClickOverlay={onClickOverlay}
        />
        <OverlayPart
          style={createOverlayStyle({
            top: `${top}px`,
            left: `${rightLeft}px`,
            width: `${window.innerWidth - rightLeft}px`,
            height: `${height}px`,
          })}
          onClickOverlay={onClickOverlay}
        />
      </>
    );
  },
);

SpotlightOverlay.displayName = 'SpotlightOverlay';

export default SpotlightOverlay;
