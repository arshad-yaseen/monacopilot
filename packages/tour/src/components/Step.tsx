import React from 'react';

import {_DEFAULT_POPOVER_POSITION} from '../constants';
import {scrollToStepTarget} from '../helpers';
import {useTourControls, useTourOptions, useTourState} from '../hooks';
import {FloatingPosition, StepProps} from '../types';
import {isInView} from '../utils';
import Popover from './core/Popover';
import StepContent from './StepContent';
import StepFooter from './StepFooter';

const Step = ({activeStep, tourOptions}: StepProps) => {
  const {endTour} = useTourControls();
  const {isTourOpen} = useTourState();
  const [popoverPosition, setPopoverPosition] = React.useState<
    FloatingPosition | undefined
  >(_DEFAULT_POPOVER_POSITION);
  const [popoverTarget, setPopoverTarget] = React.useState<HTMLElement | null>(
    null,
  );

  const {highlightTarget, preventCloseOnClickOutside} =
    useTourOptions(tourOptions);

  React.useEffect(() => {
    if (!activeStep) {
      setPopoverTarget(null);
      return;
    }

    const newPosition = activeStep.target
      ? activeStep.position
      : 'window-center';

    setPopoverPosition(newPosition);

    const targetSelector = activeStep.target;
    if (!targetSelector) {
      setPopoverTarget(null);
      return;
    }

    const targetElement = document.querySelector<HTMLElement>(targetSelector);
    if (!targetElement) {
      console.warn(`Step target not found: ${targetSelector}`);
      setPopoverTarget(null);
      return;
    }

    const ensureTargetInView = () => {
      if (isInView(targetElement)) {
        setPopoverTarget(targetElement);
      } else {
        setPopoverTarget(null);
        scrollToStepTarget(targetElement, () =>
          setPopoverTarget(targetElement),
        );
      }
    };

    ensureTargetInView();
  }, [activeStep, isTourOpen]);

  if (!activeStep || !isTourOpen) return null;

  return (
    <Popover
      open={isTourOpen}
      target={popoverTarget}
      preferredPosition={popoverPosition}
      shouldHighlightTarget={highlightTarget}
      onClickOutside={() => !preventCloseOnClickOutside && endTour()}>
      <Popover.Content
        className="nt-step-container"
        data-target-highlight={highlightTarget}>
        <StepContent>
          <StepContent.Title>{activeStep.title}</StepContent.Title>
          {activeStep.content}
        </StepContent>
        <StepFooter />
      </Popover.Content>
    </Popover>
  );
};

export default Step;
