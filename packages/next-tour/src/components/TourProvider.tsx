import { createContext, FC, useCallback, useState } from "react"
import { Tour, TourContextValue, TourProviderProps } from "../types"

export const TourContext = createContext<TourContextValue | null>(null)

const TourProvider: FC<TourProviderProps> = ({ children, tours }) => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)
  const [currentTour, setCurrentTour] = useState<Tour | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)

  const totalSteps: number = currentTour?.steps.length ?? 0

  const startTour = useCallback(
    (id: string) => {
      const tour = tours.find((tour) => tour.id === id)
      if (!tour) return

      setCurrentTour(tour)
      setIsTourOpen(true)
      setCurrentStep(1)
    },
    [tours]
  )

  const endTour = useCallback(() => {
    setIsTourOpen(false)
    setCurrentTour(null)
    setCurrentStep(0)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.min(totalSteps, prevStep + 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  return (
    <TourContext.Provider
      value={{
        isTourOpen,
        currentTour,
        currentStep,
        totalSteps,
        startTour,
        endTour,
        goToStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export default TourProvider
