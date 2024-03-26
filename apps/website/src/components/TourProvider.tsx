'use client';

import {PropsWithChildren} from 'react';

import {TourProvider as TourProviderCore} from 'next-tour';

const TourProvider = ({children}: PropsWithChildren) => {
  return <TourProviderCore>{children}</TourProviderCore>;
};

export default TourProvider;
