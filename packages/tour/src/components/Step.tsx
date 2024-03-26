import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {StepProps} from '../types';
import Popover from './core/Popover';

const Step = ({activeStep, tourOptions}: StepProps) => {
  const {nextStep, prevStep} = useTourControls();
  const {isTourOpen} = useTourState();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!activeStep) return;

    const target = document.querySelector(activeStep.target);
    if (target) {
      setTarget(target as HTMLElement);
    }
  }, [activeStep]);

  if (!activeStep) return null;

  return (
    <Popover
      open={isTourOpen}
      target={target}
      preferredPosition={activeStep.position}
      shouldMaskTarget={tourOptions?.showMask}>
      <Popover.Content data-tour-step>
        {activeStep.content}
        <button onClick={nextStep}>Next</button>
        <button onClick={prevStep}>Prev</button>
      </Popover.Content>
    </Popover>
  );
};

export default Step;
