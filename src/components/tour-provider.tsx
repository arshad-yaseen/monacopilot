import React from 'react';

import {TourProviderProps} from '../types';
import TourManager from './tour-manager';

const TourProvider = (props: TourProviderProps) => {
  return <TourManager {...props} />;
};

export default TourProvider;
