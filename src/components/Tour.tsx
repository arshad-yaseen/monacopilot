'use client';

import '../styles.css';

import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {TourProps} from '../types';
import Step from './step';

const Tour = React.memo(({id, ...p}: TourProps) => {
  const {activeTour, activeStep, isTourOpen} = useTourState();
  const {addTour} = useTourControls();

  const tourProps = React.useMemo(() => ({id, ...p}), [id, p]);

  // Add this tour to the global tours state
  React.useEffect(() => {
    addTour(tourProps);
  }, [addTour, tourProps]);

  // Check if this tour is the active tour
  const isTourActive = activeTour?.id === id;

  if (!isTourActive || !isTourOpen) return null;

  return <Step step={activeStep} />;
});

Tour.displayName = 'Next Tour';

export default Tour;
