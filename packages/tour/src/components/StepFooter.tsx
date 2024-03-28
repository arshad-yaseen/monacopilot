import React from 'react';

import {useTourControls, useTourState} from '../hooks';

const StepFooter = () => {
  const {nextStep, prevStep, endTour} = useTourControls();
  const {totalSteps, activeStepIndex} = useTourState();

  const showBackButton = totalSteps > 1 && activeStepIndex > 0;
  const showNextButton = activeStepIndex < totalSteps - 1;
  const showFinishButton = activeStepIndex === totalSteps - 1;

  return (
    <footer data-nt-tour-step-footer>
      <div data-nt-tour-step-footer-actions>
        {showBackButton && (
          <button
            onClick={() => prevStep()}
            data-nt-button
            data-variant="outline">
            Back
          </button>
        )}
        <button onClick={() => endTour()} data-nt-button data-variant="outline">
          Skip
        </button>
        <div style={{flex: 1}} />
        {showNextButton && (
          <button
            onClick={() => nextStep()}
            data-nt-button
            data-variant="primary">
            Next
          </button>
        )}
        {showFinishButton && (
          <button
            onClick={() => endTour()}
            data-nt-button
            data-variant="primary">
            Finish
          </button>
        )}
      </div>
    </footer>
  );
};

export default StepFooter;
