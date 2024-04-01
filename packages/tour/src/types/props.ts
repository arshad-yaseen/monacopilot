import React from 'react';

import {FloatingPosition} from './common';
import {Tour, TourStep} from './tour';

export type TourProviderProps = React.PropsWithChildren<unknown>;

export type TourProps = Tour;

export interface PopoverProps
  extends React.PropsWithChildren<{
    open: boolean;
    preferredPosition?: FloatingPosition;
    target: HTMLElement | null;
    onClickOutside?: () => void;
    shouldShowOverlay?: boolean;
  }> {}

export interface SpotlightOverlayProps {
  target: HTMLElement | null;
  isOpen: boolean;
  onClickOverlay?: () => void;
}

export interface StepProps {
  step: TourStep | null;
}

export interface ProgressProps {
  progress: number;
}
