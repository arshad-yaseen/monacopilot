'use client';

import StepCard from '@/app/components/step-card';
import {Tour} from 'next-tour';

const BasicPage = () => {
  return (
    <div className="container flex justify-center py-32 gap-4">
      <div>
        <div className="first" />
        <div className="second">
          <div className="third" data-showed="false" />
        </div>
      </div>
      <Tour
        id="tour"
        options={{
          startImmediately: true,
        }}
        steps={[
          {
            id: 'step-1',
            title: 'Step 1',
            content:
              'This is the first step of the tour. You can click on the next button to go to the next step.',
          },
          {
            id: 'step-2',
            title: 'Step 2',
            content:
              'This is the second step of the tour. You can click on the next button to go to the next step.',
          },
          {
            id: 'step-3',
            title: 'Step 3',
            content:
              'This is the third step of the tour. You can click on the next button to go to the next step.',
          },
        ]}
      />
      <StepCard stepNumber={1} stepId="step-1" />
      <StepCard stepNumber={2} stepId="step-2" />
      <StepCard stepNumber={3} stepId="step-3" />
    </div>
  );
};

export default BasicPage;
