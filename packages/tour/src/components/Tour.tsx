import '../styles.css';

import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {TourProps} from '../types';
import Step from './Step';

const Tour = (props: TourProps) => {
  const {addTour} = useTourControls();
  const {activeTour, activeStepIndex} = useTourState();

  // Add this tour to the global tours state
  React.useEffect(() => {
    addTour(props);
  }, [addTour, props]);

  // Determine if this tour is the active tour
  const isActiveTour = activeTour?.id === props.id;

  // Find the active step within the active tour
  const activeStep = isActiveTour ? activeTour.steps[activeStepIndex] : null;

  // Only render the Step component if this tour is active
  if (!isActiveTour) return null;

  return <Step activeStep={activeStep} tourOptions={activeTour.options} />;
};

export default Tour;
