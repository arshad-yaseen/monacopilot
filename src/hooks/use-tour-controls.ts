import React from 'react';

import {TourContext} from '../components/tour-manager';
import {TourControls} from '../types';

const useTourControls = (): TourControls => {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error(
      'useTourControls must be used within a <TourProvider> component',
    );
  }

  const {
    startTour,
    completeTour,
    closeTour,
    continueTour,
    goToStep,
    nextStep,
    prevStep,
    addTour,
    removeTour,
  } = context;

  return {
    startTour,
    completeTour,
    goToStep,
    nextStep,
    prevStep,
    closeTour,
    continueTour,
    addTour,
    removeTour,
  };
};

export default useTourControls;
