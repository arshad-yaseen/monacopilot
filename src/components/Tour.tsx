'use client';

import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {TourProps} from '../types';

import '../styles.css';

import Step from './step';

/**
 * The Tour component is responsible for rendering the tour's current step.
 * It subscribes to tour state to determine if it should render and uses tour controls to register itself.
 */
const Tour = React.memo(({id, ...props}: TourProps) => {
  const {activeTour, activeStep, isTourOpen} = useTourState();
  const {addTour, removeTour} = useTourControls();

  const tourProps = React.useMemo(() => ({id, ...props}), [id, props]);

  React.useEffect(() => {
    // Registers this tour with the global tours state on mount
    addTour(tourProps);

    return () => {
      removeTour(id);
    };
  }, [id, tourProps, addTour, removeTour]);

  // Determines if the current tour is the active one and should be shown
  const isTourActive = activeTour?.id === id;

  // Render null if this is not the active tour or if the tour is not open
  if (!isTourActive || !isTourOpen) return null;

  // Render the current step of the tour
  return <Step step={activeStep} />;
});

Tour.displayName = 'NextTour';

export default Tour;
