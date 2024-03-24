import { createContext, useCallback, useMemo, useState } from "react"
import { TourContextValue, TourProviderProps } from "../types"

export const TourContext = createContext<TourContextValue | null>(null)

const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [totalSteps, setTotalSteps] = useState<number>(0)

  const startTour = useCallback(() => {
    setIsTourOpen(true)
    setCurrentStep(0)
  }, [])

  const endTour = useCallback(() => {
    setIsTourOpen(false)
    setCurrentStep(0)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.min(totalSteps - 1, prevStep + 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const value = useMemo(
    () => ({
      isTourOpen,
      currentStep,
      totalSteps,
      setTotalSteps,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
    }),
    [
      isTourOpen,
      currentStep,
      totalSteps,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
    ]
  )

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>
}

export default TourProvider
