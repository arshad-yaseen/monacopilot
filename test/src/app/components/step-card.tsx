import {PropsWithChildren} from 'react';

type StepCardProps = PropsWithChildren<{
  stepNumber: number;
  stepId: string;
  className?: string;
}>;

const StepCard = ({stepNumber, stepId, className, ...props}: StepCardProps) => {
  return (
    <div
      {...props}
      data-tour-step-id={stepId}
      className={`px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-md font-medium w-fit h-fit ${className}`}>
      <h1 className="text-neutral-800 dark:text-neutral-200 text-lg">
        Step {stepNumber}
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        This is the content of step {stepNumber}
      </p>
    </div>
  );
};

export default StepCard;
