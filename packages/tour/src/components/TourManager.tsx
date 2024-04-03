import React from 'react';

import {executeStepOptionCallback, getStepOptions} from '../helpers';
import {Tour, TourContextType, TourProviderProps} from '../types';

export const TourContext = React.createContext<TourContextType | null>(null);

const TourManager = ({children}: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = React.useState<boolean>(false);

  const [activeTour, setActiveTour] = React.useState<Tour | null>(null);

  // Index of the currently active step within the tour
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);

  const toursRef = React.useRef<Tour[]>([]);
  const totalSteps: number = activeTour?.steps.length ?? 0;

  const activeStep = React.useMemo(
    () => activeTour?.steps[activeStepIndex] ?? null,
    [activeTour, activeStepIndex],
  );

  // Function to add a new tour
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

  const completeTour = () => {
    setIsTourOpen(false);
    setActiveTour(null);
    setActiveStepIndex(0);
  };

  const closeTour = () => {
    setIsTourOpen(false);
  };

  const continueTour = React.useCallback(() => {
    if (!activeTour || !activeStep) return;
    setIsTourOpen(true);
  }, [activeTour, activeStep]);

  const nextStep = React.useCallback(async () => {
    const options = getStepOptions(activeStep);
    const canProceed = await executeStepOptionCallback(options.onBeforeNext);

    if (canProceed) {
      setActiveStepIndex(prevStep => Math.min(totalSteps - 1, prevStep + 1));
      await executeStepOptionCallback(options.onNext);
    }
  }, [activeStep, totalSteps]);

  const prevStep = React.useCallback(async () => {
    const options = getStepOptions(activeStep);
    const canGoBack = await executeStepOptionCallback(options.onBeforeBack);

    if (canGoBack) {
      setActiveStepIndex(prevStep => Math.max(0, prevStep - 1));
      await executeStepOptionCallback(options.onBack);
    }
  }, [activeStep]);

  const goToStep = React.useCallback(
    (stepNumber: number) => {
      if (stepNumber < 0 || stepNumber >= totalSteps) return;
      setActiveStepIndex(stepNumber);
    },
    [totalSteps],
  );

  const contextValue = React.useMemo(
    () => ({
      isTourOpen,
      activeStep,
      activeTour,
      activeStepIndex,
      totalSteps,
      tours: toursRef.current,
      addTour,
      startTour,
      completeTour,
      closeTour,
      continueTour,
      goToStep,
      nextStep,
      prevStep,
    }),
    [
      isTourOpen,
      activeStep,
      activeTour,
      activeStepIndex,
      totalSteps,
      goToStep,
      nextStep,
      prevStep,
      continueTour,
    ],
  );

  return (
    <TourContext.Provider value={contextValue}>{children}</TourContext.Provider>
  );
};

export default TourManager;
