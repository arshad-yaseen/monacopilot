import React from 'react';

import {executeStepOptionCallback, getStepOptions} from '../helpers';
import {Tour, TourContextType, TourProviderProps} from '../types';

export const TourContext = React.createContext<TourContextType | null>(null);

/**
 * TourManager provides a context for managing and interacting with a series of tours.
 * It handles tour state, navigation between tour steps, and the execution of step-specific callbacks.
 */
const TourManager = ({children}: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = React.useState<boolean>(false);
  const [activeTour, setActiveTour] = React.useState<Tour | null>(null);
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);

  const toursRef = React.useRef<Tour[]>([]);
  const totalSteps: number = activeTour?.steps.length ?? 0;

  const activeStep = React.useMemo(
    () => activeTour?.steps[activeStepIndex] ?? null,
    [activeTour, activeStepIndex],
  );

  const addTour = React.useCallback((tour: Tour) => {
    if (toursRef.current.some(t => t.id === tour.id)) return;
    toursRef.current.push(tour);
  }, []);

  const removeTour = React.useCallback((id: string) => {
    toursRef.current = toursRef.current.filter(t => t.id !== id);
  }, []);

  const startTour = React.useCallback((id: string) => {
    const tour = toursRef.current.find(t => t.id === id);
    if (!tour) return;
    setActiveTour(tour);
    setIsTourOpen(true);
    setActiveStepIndex(0);
  }, []);

  const completeTour = React.useCallback(() => {
    setIsTourOpen(false);
    setActiveTour(null);
    setActiveStepIndex(0);
  }, []);

  const closeTour = React.useCallback(() => {
    setIsTourOpen(false);
  }, []);

  const continueTour = React.useCallback(() => {
    if (!activeTour || !activeStep) return;
    setIsTourOpen(true);
  }, [activeTour, activeStep]);

  const nextStep = React.useCallback(async () => {
    if (!activeStep) return;
    const options = getStepOptions(activeStep);
    const canProceed = await executeStepOptionCallback(options.onBeforeNext);

    if (canProceed) {
      setActiveStepIndex(prevStep => Math.min(totalSteps - 1, prevStep + 1));
      await executeStepOptionCallback(options.onNext);
    }
  }, [activeStep, totalSteps]);

  const prevStep = React.useCallback(async () => {
    if (!activeStep) return;
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

  return (
    <TourContext.Provider
      value={{
        isTourOpen,
        activeStep,
        activeTour,
        activeStepIndex,
        totalSteps,
        tours: toursRef.current,
        addTour,
        removeTour,
        startTour,
        completeTour,
        closeTour,
        continueTour,
        goToStep,
        nextStep,
        prevStep,
      }}>
      {children}
    </TourContext.Provider>
  );
};

export default TourManager;
