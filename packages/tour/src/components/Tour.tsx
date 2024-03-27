import '../styles.css';

import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {TourProps} from '../types';
import Step from './Step';

const Tour = (props: TourProps) => {
  const {addTour} = useTourControls();
  const {activeTour, activeStepIndex} = useTourState();

  // Effect to register this tour in the system when it mounts or props change
  React.useEffect(() => {
    addTour(props);
  }, [addTour, props]);

  // Determine if this is the currently active tour
  const isActiveTour = activeTour?.id === props.id;

  // Find the active step within this tour, if it is active
  const activeStep = isActiveTour ? activeTour.steps[activeStepIndex] : null;

  // Only render the Step component if this is the active tour
  if (!isActiveTour) return null;

  return <Step activeStep={activeStep} tourOptions={activeTour.options} />;
};

export default Tour;
