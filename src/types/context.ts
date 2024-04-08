import {FloatingPosition} from './common';
import {Tour, TourStep} from './tour';

export interface PopoverContextType {
  open: boolean;
  preferredPosition: FloatingPosition;
  target: HTMLElement | null;
  shouldShowOverlay?: boolean;
  onClickOutside?: () => void;
  onClickTarget?: () => void;
}

export interface TourContextType extends TourControls, TourState {}

export interface TourControls {
  /**
   * Adds a new tour programmatically.
   * @param {Tour} tour - The tour to be added.
   */
  addTour: (tour: Tour) => void;

  /**
   * Removes a tour by its id.
   * @param {string} id - The id of the tour to be removed.
   */
  removeTour: (id: string) => void;

  /**
   * Initiates a tour by its id.
   * @param {string} id - The id of the tour to be started.
   */
  startTour: (id: string) => void;

  /** Completes the currently active tour. This action marks the tour as completed. */
  completeTour: () => void;

  /** Closes the currently active tour without marking it as completed. This allows the tour to be resumed later from the step where it was left off. To continue the tour, call `continueTour`. */
  closeTour: () => void;

  /** Resumes the currently active tour from the step where it was left off. */
  continueTour: () => void;

  /** Advances the tour to the next step. */
  nextStep: () => void;

  /** Moves back to the previous step in the tour. */
  prevStep: () => void;

  /**
   * Jumps to a specific step in the tour.
   * @param {number} stepNumber - The step number to jump to. Step numbers start from 0 for the first step.
   */
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
