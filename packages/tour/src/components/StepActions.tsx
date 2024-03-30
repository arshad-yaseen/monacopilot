import React from 'react';

import {useTourControls, useTourState} from '../hooks';

const StepActions = () => {
  const {totalSteps, activeStepIndex} = useTourState();
  const {nextStep, prevStep, endTour} = useTourControls();

  const showBackButton = totalSteps > 1 && activeStepIndex > 0;
  const showNextButton = activeStepIndex < totalSteps - 1;
  const showFinishButton = activeStepIndex === totalSteps - 1;

  return (
    <div className="nt-step-actions">
      {showBackButton && (
        <button
          onClick={() => prevStep()}
          className="nt-button"
          data-variant="outline">
          Back
        </button>
      )}
      <button
        onClick={() => endTour()}
        className="nt-button"
        data-variant="outline">
        Close
      </button>
      <div style={{flex: 1}} />
      {showNextButton && (
        <button
          onClick={() => nextStep()}
          className="nt-button"
          data-variant="primary">
          Next
        </button>
      )}
      {showFinishButton && (
        <button
          onClick={() => endTour()}
          className="nt-button"
          data-variant="primary">
          Finish
        </button>
      )}
    </div>
  );
};

export default StepActions;
