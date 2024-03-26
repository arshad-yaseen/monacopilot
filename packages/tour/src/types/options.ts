export interface TourOptions {
  /**
   * Whether to show the tour navigation buttons.
   * @default true
   */
  showNavigation?: boolean;
  /**
   * Whether to show the tour progress indicator.
   * @default true
   */
  showProgress?: boolean;
  /**
   * Controls the visibility of the tour mask. The tour mask is used to highlight
   * the current step's target element while dimming the rest of the page to focus
   * user attention on the highlighted element.
   * @default true
   */

  showMask?: boolean;
}

export interface StepOptions {
  /**
   * Whether to show the close button on the tour.
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to show the skip button on the tour.
   * @default true
   */
  showSkipButton?: boolean;
  /**
   * Whether to show the back button on the tour.
   * @default true
   */
  showBackButton?: boolean;
}
