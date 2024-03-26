import React from 'react';

import {TourContext} from '../components/TourProvider';
import {TourState} from '../types';

const useTourState = (): TourState => {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error(
      'useTourState must be used within a <TourProvider> component',
    );
  }

  const {tours, activeStepIndex, activeTour, isTourOpen, totalSteps} = context;

  return {tours, activeStepIndex, activeTour, isTourOpen, totalSteps};
};

export default useTourState;
