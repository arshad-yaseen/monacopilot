import React from 'react';

import {scrollToStepTarget} from '../helpers';
import {useTourControls, useTourOptions, useTourState} from '../hooks';
import {StepProps} from '../types';
import {isInViewport} from '../utils';
import Popover from './core/Popover';
import StepContent from './StepContent';
import StepFooter from './StepFooter';

const Step = ({activeStep, tourOptions}: StepProps) => {
  const {endTour} = useTourControls();
  const {isTourOpen} = useTourState();
  const [popoverTarget, setPopoverTarget] = React.useState<HTMLElement | null>(
    null,
  );

  const {highlightTarget, preventCloseOnClickOutside} =
    useTourOptions(tourOptions);

  // Set the current step target element as the popover target
  React.useEffect(() => {
    if (!activeStep) {
      return;
    }

    const targetElement = document.querySelector<HTMLElement>(
      activeStep.target,
    );

    if (!targetElement) {
      return;
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

    return;
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
      <Popover.Content
        data-nt-step-container
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
``;

export default Step;
