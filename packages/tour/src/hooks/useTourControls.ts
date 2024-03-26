import React from 'react';

import {TourContext} from '../components/TourProvider';
import {TourControls} from '../types';

const useTourControls = (): TourControls => {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error(
      'useTourControls must be used within a <TourProvider> component',
    );
  }

  const {startTour, endTour, goToStep, nextStep, prevStep, addTour} = context;

  return {
    startTour,
    endTour,
    goToStep,
    nextStep,
    prevStep,
    addTour,
  };
};

export default useTourControls;
