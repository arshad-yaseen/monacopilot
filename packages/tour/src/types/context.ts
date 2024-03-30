import {FloatingPosition} from './common';
import {Tour, TourStep} from './tour';

export interface PopoverContextType {
  open: boolean;
  preferredPosition: FloatingPosition;
  target: HTMLElement | null;
  onClickOutside?: () => void;
  shouldHighlightTarget?: boolean;
}

export interface TourContextType extends TourControls, TourState {}

export interface TourControls {
  /** Add a new tour programmatically. */
  addTour: (tour: Tour) => void;
  /** Start a tour by its id. */
  startTour: (id: string) => void;
  /** End the currently active tour. */
  endTour: () => void;
  /** Advance to the next step in the tour. */
  nextStep: () => void;
  /** Move back to the previous step in the tour. */
  prevStep: () => void;
  /** Jump to a specific step in the tour by the step number. */
  goToStep: (stepNumber: number) => void;
}

export interface TourState {
  /** Whether the tour is currently open. */
  isTourOpen: boolean;
  /** The list of tours available to the user. */
  tours: Tour[];
  /** The currently active tour. */
  activeTour: Tour | null;
  /** The currently active step. */
  activeStep: TourStep | null;
  /** The index of the currently active step. */
  activeStepIndex: number;
  /** The total number of steps in the currently active tour. */
  totalSteps: number;
}
