import React from 'react';

import {useTourState} from '../hooks';

const StepProgress = () => {
  const {activeStepIndex, totalSteps} = useTourState();

  const progress = React.useMemo(() => {
    if (totalSteps === 0) return 0;

    // When on the last step, return 100% to signify completion.
    if (activeStepIndex === totalSteps - 1) return 100;

    return (activeStepIndex / totalSteps) * 100;
  }, [activeStepIndex, totalSteps]);

  return (
    <div className="nt-step-progress">
      <div className="nt-step-progress-bar" style={{width: `${progress}%`}} />
    </div>
  );
};

export default StepProgress;
