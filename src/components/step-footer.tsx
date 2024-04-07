import React from 'react';

import StepActions from './step-actions';
import StepProgress from './step-progress';

const StepFooter = () => {
  return (
    <footer className="nt-step-footer ring-2 ring-offset-2">
      <StepProgress />
      <StepActions />
    </footer>
  );
};

export default StepFooter;
