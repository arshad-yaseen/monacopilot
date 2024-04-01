'use client';

import React from 'react';
import {useRouter} from 'next/navigation';

import {Tour} from 'next-tour';

const MyTour = () => {
  const {push} = useRouter();

  return (
    <Tour
      id="tour1"
      steps={[
        {
          target: '#target1',
          title: "Let's get started",
          content:
            'This is the first step of the tour. If you need help, click Next. If not, click Skip.',
        },
        {
          target: '#target2',
          title: 'Next up',
          content:
            'This is the second step of the tour. If you need help, click Next. If not, click Skip.',
        },
        {
          target: '#target3',
          title: 'Final step',
          content:
            'This is the final step of the tour. If you need help, click Next. If not, click Skip.',
        },
      ]}
    />
  );
};

export default MyTour;
