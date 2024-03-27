import React from 'react';

import {Tour, TourContextType, TourProviderProps} from '../types';

export const TourContext = React.createContext<TourContextType | null>(null);

const TourProvider = ({children}: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = React.useState<boolean>(false);
  // the currently active tour.
  const [activeTour, setActiveTour] = React.useState<Tour | null>(null);
  // the index of the currently active step within the active tour.
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);

  // All available tours.
  const toursRef = React.useRef<Tour[]>([]);

  const totalSteps: number = activeTour?.steps.length ?? 0;

  // function to add a new tour to the tours list.
  const addTour = (tour: Tour) => {
    toursRef.current.push(tour);
  };

  const startTour = (id: string) => {
    const tour = toursRef.current.find(t => t.id === id);
    if (!tour) return;

    setActiveTour(tour);
    setIsTourOpen(true);
    setActiveStepIndex(0);
  };

  const endTour = () => {
    setIsTourOpen(false);
    setActiveTour(null);
    setActiveStepIndex(0);
  };

  const nextStep = React.useCallback(() => {
    setActiveStepIndex(prevStep => Math.min(totalSteps - 1, prevStep + 1));
  }, [totalSteps]);

  const prevStep = () => {
    setActiveStepIndex(prevStep => Math.max(0, prevStep - 1));
  };

  const goToStep = React.useCallback(
    (stepNumber: number) => {
      if (stepNumber < 1 || stepNumber >= totalSteps) return;
      // decrement by 1, since the step number user provides is 1-based index.
      setActiveStepIndex(stepNumber - 1);
    },
    [totalSteps],
  );

  return (
    <TourContext.Provider
      value={{
        isTourOpen,
        activeTour,
        activeStepIndex,
        totalSteps,
        tours: toursRef.current,
        addTour,
        startTour,
        endTour,
        goToStep,
        nextStep,
        prevStep,
      }}>
      {children}
    </TourContext.Provider>
  );
};

export default TourProvider;
