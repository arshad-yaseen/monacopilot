export interface TourProviderProps {
  children: React.ReactNode
}

export interface TourProps extends Tour {
  children: React.ReactNode
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

export interface TourContextValue extends TourState, TourControls {}

export interface TourControls {
  /** Add a new tour programmatically. */
  addTour: (tour: Tour) => void
  /** Start a tour by its id. */
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

export interface TourState {
  /** Whether the tour is currently open. */
  isTourOpen: boolean
  /** The list of tours available to the user. */
  tours: Tour[]
  /** The currently active tour. */
  activeTour: Tour | null
  /** The index (starting from 1) of the currently active step in the tour. */
  activeStep: number
  /** The total number of steps in the currently active tour. */
  totalSteps: number
}
