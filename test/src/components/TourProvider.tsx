'use client';

import {PropsWithChildren} from 'react';

import {TourProvider as TourProviderBase} from 'next-tour';

const TourProvider = ({children}: PropsWithChildren) => {
  return <TourProviderBase>{children}</TourProviderBase>;
};

export default TourProvider;
