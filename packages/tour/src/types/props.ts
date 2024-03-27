import React from 'react';

import {FloatingPosition} from './common';
import {TourOptions} from './options';
import {Tour, TourStep} from './tour';

export type TourProviderProps = React.PropsWithChildren<unknown>;

export type TourProps = Tour;

export interface PopoverProps
  extends React.PropsWithChildren<{
    open: boolean;
    preferredPosition?: FloatingPosition;
    target: HTMLElement | null;
    onClickOutside?: () => void;
    shouldHighlightTarget?: boolean;
  }> {}

export interface StepProps {
  activeStep: TourStep | null;
  tourOptions?: TourOptions;
}
