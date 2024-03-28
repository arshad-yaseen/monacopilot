import React from 'react';

import {scrollToStepTarget} from '../helpers';
import {useTourControls, useTourOptions, useTourState} from '../hooks';
import {StepProps} from '../types';
import {isInViewport} from '../utils';
import Popover from './core/Popover';

const Step = ({activeStep, tourOptions}: StepProps) => {
  const {endTour, nextStep, prevStep} = useTourControls();
  const {isTourOpen} = useTourState();
  const [popoverTarget, setPopoverTarget] = React.useState<HTMLElement | null>(
    null,
  );

  const {highlightTarget, preventCloseOnClickOutside} =
    useTourOptions(tourOptions);

  // Set the current step target element as the popover target
  React.useEffect(() => {
    if (!activeStep) {
      return undefined;
    }

    const targetElement = document.querySelector<HTMLElement>(
      activeStep.target,
    );

    if (!targetElement) {
      return undefined;
    }

    // Check if the target element is in the viewport
    const isTargetInViewport = isInViewport(targetElement);

    // If the target element is not in the viewport, scroll it into view
    if (!isTargetInViewport) {
      setPopoverTarget(null);

      scrollToStepTarget(targetElement, () => {
        setPopoverTarget(targetElement);
      });

      return () => {
        if (popoverTarget !== null) setPopoverTarget(null);
      };
    } else {
      // If the target element is in the viewport, set the popover target immediately
      if (popoverTarget !== targetElement) setPopoverTarget(targetElement);
    }

    return undefined;
  }, [activeStep, popoverTarget]);

  if (!activeStep) return null;

  return (
    <Popover
      open={isTourOpen}
      target={popoverTarget}
      preferredPosition={activeStep.position}
      shouldHighlightTarget={highlightTarget}
      onClickOutside={() =>
        !preventCloseOnClickOutside ? endTour() : undefined
      }>
      <Popover.Content data-tour-step>
        {activeStep.content}
        <button onClick={prevStep}>Prev</button>
        <button onClick={nextStep}>Next</button>
      </Popover.Content>
    </Popover>
  );
};

export default Step;
