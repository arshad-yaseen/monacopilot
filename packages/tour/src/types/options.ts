import {FloatingPosition} from './common';

export interface TourOptions {
  /**
   * Whether to show the tour progress indicator.
   * Displays the beautiful progress bar indicating the user's progress through the tour.
   * @default true
   */
  showProgress?: boolean;

  /**
   * Indicates whether the close button should be displayed on the tour.
   * Allows users to exit the tour before completion.
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Indicates whether the back button should be displayed on the tour.
   * Allows users to navigate to the previous step of the tour.
   * @default true
   */
  showBackButton?: boolean;

  /**
   * Whether to dim the background of the step to highlight the target element.
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Whether to prevent the tour from closing when clicking outside the tour step.
   * When enabled, the tour will only close when the user clicks the close button or completes the tour.
   * @default false
   */
  preventCloseOnClickOutside?: boolean;
}

export interface StepOptions {
  /**
   * Specifies the placement of the tour step relative to the target element.
   * This determines the position where the tour guide box will appear around the target.
   *
   * @default "bottom"
   */
  placement?: FloatingPosition;

  /**
   * Enables advancing to the next step by clicking the target element.
   * @default false
   */
  nextOnClickTarget?: boolean;

  /**
   * Enables going back to the previous step by clicking the target element.
   * @default false
   */
  backOnClickTarget?: boolean;

  /**
   * Allows closing the tour by clicking the target element.
   * @default false
   */
  closeOnClickTarget?: boolean;

  /**
   * A callback function that is executed before moving to the next step.
   * It can return a boolean or a Promise that resolves to a boolean.
   * If `false` is returned, the tour will not proceed to the next step.
   */
  onBeforeNext?: () => boolean | Promise<boolean> | void;

  /**
   * A callback function that is executed before moving back to the previous step.
   * It can return a boolean or a Promise that resolves to a boolean.
   * If `false` is returned, the tour will not move back to the previous step.
   */
  onBeforeBack?: () => boolean | Promise<boolean> | void;

  /** A callback function that is executed after moving to the next step. */
  onNext?: () => boolean | Promise<boolean> | void;

  /** A callback function that is executed after moving back to the previous step. */
  onBack?: () => boolean | Promise<boolean> | void;
}
