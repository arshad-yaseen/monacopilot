export interface TourProviderProps {
  children: React.ReactNode
  tours: Tour[]
}

export interface Tour {
  /** The ID of the tour */
  id: string
  /** The steps of the tour */
  steps: TourStep[]
}

export interface TourStep {
  target: string
  content: React.ReactNode
}

export interface TourContextValue {
  /** Whether the tour is currently open */
  isTourOpen: boolean
  /** The current tour */
  currentTour: Tour | null
  /** The current step of the tour */
  currentStep: number
  /** The total number of steps in the tour */
  totalSteps: number
  /** Start a tour */
  startTour: (id: string) => void
  /** End the current tour */
  endTour: () => void
  /** Go to the next step in the tour */
  nextStep: () => void
  /** Go to the previous step in the tour */
  prevStep: () => void
  /** Go to a specific step in the tour */
  goToStep: (step: number) => void
}
