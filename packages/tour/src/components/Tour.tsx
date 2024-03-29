import '../styles.css';

import React from 'react';

import {useTourControls, useTourState} from '../hooks';
import {TourProps} from '../types';
import Step from './Step';

const Tour = React.memo(({id, ...restProps}: TourProps) => {
  const {addTour} = useTourControls();
  const {activeTour, activeStepIndex} = useTourState();

  const tourProps = React.useMemo(() => ({id, ...restProps}), [id, restProps]);

  // Add this tour to the global tours state
  React.useEffect(() => {
    addTour(tourProps);
  }, [addTour, tourProps]);

  // Check if this tour is the active tour
  const isActiveTour = activeTour?.id === id;

  // Get the active step from the active tour
  const activeStep = isActiveTour ? activeTour.steps[activeStepIndex] : null;

  if (!isActiveTour) return null;

  return <Step activeStep={activeStep} tourOptions={activeTour.options} />;
});

Tour.displayName = 'Next Tour';

export default Tour;
