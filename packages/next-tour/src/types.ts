export interface TourProviderProps {
  children: React.ReactNode
  tours: Tour[]
}

export interface Tour {
  /** A unique identifier for the tour, used for starting the tour programmatically. */
  id: string
  /** An ordered list of steps that the user will follow during the tour. */
  steps: TourStep[]
}

export interface TourStep {
  /** The CSS selector of the target element for this step. */
  target: string
  /** The content to display for this step. */
  content: React.ReactNode
}

export interface TourContextValue {
  /** Indicates if a tour is currently active or visible. */
  isTourOpen: boolean
  /** The tour object that is currently active, or null if no tour is active. */
  currentTour: Tour | null
  /** The index (starting from 1) of the current step within the active tour. */
  currentStep: number
  /** The total number of steps in the active tour. */
  totalSteps: number
  /** Start a tour by its ID. */
  startTour: (id: string) => void
  /** End the currently active tour. */
  endTour: () => void
  /** Advance to the next step in the tour. */
  nextStep: () => void
  /** Move back to the previous step in the tour. */
  prevStep: () => void
  /** Jump to a specific step in the tour, identified by a index (starting from 1). */
  goToStep: (step: number) => void
}
