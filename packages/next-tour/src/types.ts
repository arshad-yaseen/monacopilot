export interface TourProviderProps {
  children: React.ReactNode
}

export interface TourContextValue {
  // Whether the tour is open or not
  isTourOpen: boolean
  // The current step of the tour
  currentStep: number
  // The total number of steps in the tour
  totalSteps: number
  // Set the total number of steps in the tour
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>
  // The function to start the tour
  startTour: () => void
  // The function to end the tour
  endTour: () => void
  // The function to go to the next step
  nextStep: () => void
  // The function to go to the previous step
  prevStep: () => void
  // The function to go to a specific step
  goToStep: (step: number) => void
}
