import React from 'react';

import {TourProviderProps} from '../types';
import TourManager from './TourManager';

const TourProvider = (props: TourProviderProps) => {
  return <TourManager {...props} />;
};

export default TourProvider;
