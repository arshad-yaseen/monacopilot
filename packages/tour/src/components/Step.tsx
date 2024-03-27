import React from 'react';

import {useTourControls, useTourOptions, useTourState} from '../hooks';
import {StepProps} from '../types';
import Popover from './core/Popover';

const Step = ({activeStep, tourOptions}: StepProps) => {
  const {endTour} = useTourControls();
  const {isTourOpen} = useTourState();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  const {highlightTarget, preventCloseOnClickOutside} =
    useTourOptions(tourOptions);

  React.useEffect(() => {
    if (!activeStep) return;

    const targetElement = document.querySelector(activeStep.target);
    if (targetElement) {
      setTarget(targetElement as HTMLElement);
    }
  }, [activeStep]);

  if (!activeStep) return null;

  return (
    <Popover
      open={isTourOpen}
      target={target}
      preferredPosition={activeStep.position}
      shouldHighlightTarget={highlightTarget}
      onClickOutside={() =>
        !preventCloseOnClickOutside ? endTour() : undefined
      }>
      <Popover.Content data-tour-step>{activeStep.content}</Popover.Content>
    </Popover>
  );
};

export default Step;
