import React from 'react';

import {Position} from './common';
import {TourOptions} from './options';
import {Tour, TourStep} from './tour';

export type TourProviderProps = React.PropsWithChildren<unknown>;

export type TourProps = Tour;

export interface PopoverProps
  extends React.PropsWithChildren<{
    open: boolean;
    preferredPosition?: Position;
    target: HTMLElement | null;
    onClickOutside?: () => void;
    shouldMaskTarget?: boolean;
  }> {}

export interface StepProps {
  activeStep: TourStep | null;
  tourOptions?: TourOptions;
}
