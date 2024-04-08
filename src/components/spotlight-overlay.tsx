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
    onPointerUp={onClickOverlay}
    className="nt-spotlight-overlay-part">
    {children}
  </div>
);

const createOverlayStyle = (
  position: React.CSSProperties,
): React.CSSProperties => position;

/**
 * SpotlightOverlay is a component that renders an overlay around or over a target element.
 * It updates its position based on the target's bounding rectangle and repositions on window resize.
 */
const SpotlightOverlay = React.memo(
  ({target, onClickOverlay}: SpotlightOverlayProps) => {
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
      updateTargetRect();
      window.addEventListener('resize', updateTargetRect);

      return () => window.removeEventListener('resize', updateTargetRect);
    }, [target, updateTargetRect]);

    if (!targetRect || !target) {
      return (
        <div
          className="nt-spotlight-overlay-part"
          onClick={e => e.stopPropagation()}
          onPointerUp={onClickOverlay}
          style={createOverlayStyle({
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          })}
        />
      );
    }

    const {top, left, width, height} = targetRect;
    const bottomTop = top + height;
    const rightLeft = left + width;

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
