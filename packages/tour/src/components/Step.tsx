import React, {useEffect, useState} from 'react';

import {scrollToStepTarget} from '../helpers';
import {useTourControls, useTourOptions, useTourState} from '../hooks';
import {StepProps} from '../types';
import {isInView} from '../utils';
import Popover from './core/Popover';
import StepContent from './StepContent';
import StepFooter from './StepFooter';

const Step: React.FC<StepProps> = ({step}) => {
  const {endTour} = useTourControls();
  const {isTourOpen} = useTourState();
  const {highlightTarget, preventCloseOnClickOutside} = useTourOptions();

  const [popoverTarget, setPopoverTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!step) {
      setPopoverTarget(null);
      return;
    }

    const {target: targetSelector} = step;

    if (!targetSelector) {
      setPopoverTarget(null);
      return;
    }

    const trySetTarget = () => {
      const targetElement = document.querySelector<HTMLElement>(targetSelector);
      if (!targetElement) return false;

      // Check if the target is in view, if not, scroll to it.
      if (isInView(targetElement)) {
        setPopoverTarget(targetElement);
        return true;
      } else {
        // Scroll to the target and then set it as popover target.
        scrollToStepTarget(targetElement, () =>
          setPopoverTarget(targetElement),
        );
        return true;
      }
    };

    // Attempt to set the target. If unsuccessful, observe the DOM for changes.
    if (trySetTarget()) return;

    const observer = new MutationObserver(() => {
      if (trySetTarget()) observer.disconnect();
    });

    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
      setPopoverTarget(null);
    };
  }, [step, isTourOpen]);

  if (!step || !isTourOpen) return null;

  return (
    <Popover
      open={isTourOpen}
      target={popoverTarget}
      preferredPosition={step.position}
      shouldHighlightTarget={highlightTarget}
      onClickOutside={() => {
        if (!preventCloseOnClickOutside) endTour();
      }}>
      <Popover.Content
        className="nt-step-container"
        data-target-highlight={highlightTarget}>
        <StepContent>
          <StepContent.Title>{step.title}</StepContent.Title>
          {step.content}
        </StepContent>
        <StepFooter />
      </Popover.Content>
    </Popover>
  );
};

export default Step;
