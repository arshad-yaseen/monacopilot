import React from 'react';

import StepActions from './StepActions';
import StepProgress from './StepProgress';

const StepFooter = () => {
  return (
    <footer className="nt-step-footer ring-2 ring-offset-2">
      <StepProgress />
      <StepActions />
    </footer>
  );
};

export default StepFooter;
