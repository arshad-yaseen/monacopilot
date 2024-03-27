export interface TourOptions {
  /**
   * Whether to show the tour navigation buttons.
   * Enables navigating through the tour steps with next and previous buttons.
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Whether to show the tour progress indicator.
   * Displays the current step number over the total steps, providing users with a sense of how much of the tour remains.
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to visually highlight the target element of each tour step.
   * When enabled, draws attention to the element that the tour step is focused on, often by dimming the background or creating a visual border around the element.
   * @default true
   */
  highlightTarget?: boolean;

  /**
   * Whether to prevent the tour from closing when clicking outside the tour step.
   * When enabled, the tour will only close when the user clicks the close button or completes the tour.
   * @default false
   */
  preventCloseOnClickOutside?: boolean;
}

export interface StepOptions {
  /**
   * Whether to show the close button on the tour.
   * Allows users to exit the tour before completion.
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether to show the skip button on the tour.
   * Enables users to skip the tour and proceed to the end.
   * @default true
   */
  showSkipButton?: boolean;

  /**
   * Whether to show the back button on the tour.
   * Allows users to navigate to the previous step of the tour.
   * @default true
   */
  showBackButton?: boolean;
}
