'use client';

import StepCard from '@/app/components/step-card';
import {Tour} from 'next-tour';

const ScrollToTargetPage = () => {
  return (
    <div className="container flex justify-center py-32 gap-4 h-[200vh]">
      <Tour
        id="tour"
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
          {
            id: 'step-4',
            title: 'Step 4',
            content:
              'This is the fourth step of the tour. You can click on the next button to go to the next step.',
          },
        ]}
      />
      <StepCard stepNumber={1} stepId="step-1" />
      <StepCard stepNumber={2} stepId="step-2" className="mt-[400px]" />
      <StepCard stepNumber={3} stepId="step-3" className="mt-[1000px]" />

      <div className="h-[500px] overflow-y-scroll w-[300px] rounded-md py-4 px-3 flex justify-center items-center border border-neutral-500 relative">
        <StepCard stepNumber={4} stepId="step-4" className="mt-[1000px]" />
      </div>
    </div>
  );
};

export default ScrollToTargetPage;
