import React from 'react';

import {SpotlightOverlayProps, TargetRect} from '../types';

const SpotlightOverlay = React.memo(
  ({target, isOpen, onClickOverlay}: SpotlightOverlayProps) => {
    const [targetRect, setTargetRect] = React.useState<TargetRect>({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
    const padding = 5; // Padding around the target element in pixels

    const updateTargetRect = React.useCallback(() => {
      if (target) {
        const rect = target.getBoundingClientRect();
        const paddedRect = {
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        };
        setTargetRect(prevRect => {
          if (
            paddedRect.top === prevRect.top &&
            paddedRect.left === prevRect.left &&
            paddedRect.width === prevRect.width &&
            paddedRect.height === prevRect.height
          ) {
            return prevRect;
          }
          return paddedRect;
        });
      }
    }, [target, padding]);

    React.useEffect(() => {
      if (isOpen) {
        updateTargetRect();
      }
    }, [isOpen, updateTargetRect]);

    if (!isOpen) {
      return null;
    }

    const viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`;
    const maskId = 'nt-popover-mask';

    return (
      <svg viewBox={viewBox} className="nt-popover-overlay">
        {target && (
          <defs>
            <mask id={maskId} x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx="10" // Rounded corners radius
                ry="10"
                fill="black"
              />
            </mask>
          </defs>
        )}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask={`url(#${maskId})`}
          onClick={onClickOverlay}
        />
      </svg>
    );
  },
);

SpotlightOverlay.displayName = 'Next Tour Spotlight Overlay';

export default SpotlightOverlay;
