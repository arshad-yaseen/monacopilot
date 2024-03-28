import {FloatingPosition} from './common';
import {StepOptions, TourOptions} from './options';

export interface Tour {
  /** A unique identifier for the tour, used for starting the tour programmatically. */
  id: string;
  /** An ordered list of steps that the user will follow during the tour. */
  steps: TourStep[];
  /** Optional configuration options for the tour. */
  options?: TourOptions;
}

export interface TourStep {
  /** The CSS selector of the target element for this step. */
  target: string;
  /** The title to display for this step. */
  title?: string;
  /** The content to display for this step. */
  content: React.ReactNode;
  /**
   * Optional position of the step
   * @default "bottom-center"
   */
  position?: FloatingPosition;
  /** Optional configuration options for the step. */
  options?: StepOptions;
}

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
  /** The index of the currently active step in the tour. */
  activeStepIndex: number;
  /** The total number of steps in the currently active tour. */
  totalSteps: number;
}
