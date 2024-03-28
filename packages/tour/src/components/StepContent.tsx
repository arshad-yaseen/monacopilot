import React, {PropsWithChildren} from 'react';

const StepContent = ({children}: PropsWithChildren) => {
  return <div data-nt-step-content>{children}</div>;
};

const StepTitle = ({children}: PropsWithChildren) => {
  return <h3 data-nt-step-title>{children}</h3>;
};

StepContent.Title = StepTitle;

export default StepContent;
