import React from 'react';

import {
  getStepOptions,
  getStepTargetSelector,
  getTourOptions,
  scrollToStepTarget,
} from '../helpers';
import {useTourControls, useTourState} from '../hooks';
import {StepProps} from '../types';
import {isInView} from '../utils';
import Popover from './core/popover';
import StepContent from './step-content';
import StepFooter from './step-footer';

/**
 * The Step component is responsible for rendering the current step of the tour.
 * It manages the popover target and handles.
 */
const Step = React.memo(({step}: StepProps) => {
  const {closeTour, nextStep, prevStep} = useTourControls();
  const {isTourOpen, activeTour} = useTourState();

  const {showOverlay, preventCloseOnClickOutside} = getTourOptions(activeTour);
  const {placement, backOnClickTarget, closeOnClickTarget, nextOnClickTarget} =
    getStepOptions(step);

  const [popoverTarget, setPopoverTarget] = React.useState<HTMLElement | null>(
    null,
  );

  React.useEffect(() => {
    if (!step?.id) return;

    const targetSelector = getStepTargetSelector(step.id);
    const targetElement = document.querySelector<HTMLElement>(targetSelector);

    const trySetTarget = (): boolean => {
      if (!targetElement) return false;

      // Only set the target or scroll if the target is not in view.
      if (isInView(targetElement)) {
        setPopoverTarget(targetElement);
      } else {
        scrollToStepTarget(targetElement, () =>
          setPopoverTarget(targetElement),
        );
      }
      return true;
    };

    // Initial attempt to set the popover target.
    if (trySetTarget()) return;

    // MutationObserver to detect and react to changes in the DOM if the initial attempt fails.
    const observer = new MutationObserver(() => {
      if (trySetTarget()) observer.disconnect();
    });

    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
    };
  }, [step?.id]);

  if (!popoverTarget || !step) return null;

  return (
    <Popover
      open={isTourOpen}
      target={popoverTarget}
      preferredPosition={placement}
      shouldShowOverlay={showOverlay}
      onClickOutside={() => {
        if (!preventCloseOnClickOutside) closeTour();
      }}
      onClickTarget={() => {
        if (nextOnClickTarget) nextStep();
        if (backOnClickTarget) prevStep();
        if (closeOnClickTarget) closeTour();
      }}>
      <Popover.Content>
        <StepContent>
          <StepContent.Title>{step.title}</StepContent.Title>
          {step.content}
        </StepContent>
        <StepFooter />
      </Popover.Content>
    </Popover>
  );
});

Step.displayName = 'Next Tour Step';

export default Step;
