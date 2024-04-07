import {StepOptions, TourOptions} from './options';

export interface Tour {
  /** A unique identifier for the tour, used for starting the tour programmatically. */
  id: string;
  /** An ordered list of steps that the user will follow during the tour. */
  steps: TourStep[];
  /** Optional configuration options for the tour. */
  options?: TourOptions;
}

export interface TourStep extends StepOptions {
  /** The id of the step that you specified in `data-tour-step-id` attribute of the target element.
   * If not provided, the step will be displayed in center of the screen like a modal.
   */
  id?: string;
  /** The title to display for this step. */
  title?: string;
  /** The content to display for this step.
   * This can be a string or a React component.
   */
  content: React.ReactNode;
}
