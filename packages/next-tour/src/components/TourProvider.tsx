import { createContext, useCallback, useState } from "react"
import { Tour, TourContextValue, TourProviderProps } from "../types"

export const TourContext = createContext<TourContextValue | null>(null)

const TourProvider = ({ children }: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)
  const [tours, setTours] = useState<Tour[]>([])
  const [activeTour, setActiveTour] = useState<Tour | null>(null)
  const [activeStep, setActiveStep] = useState<number>(0)

  const totalSteps: number = activeTour?.steps.length ?? 0

  const addTour = useCallback((tour: Tour) => {
    setTours((prevTours) => [...prevTours, tour])
  }, [])

  const startTour = useCallback(
    (id: string) => {
      const tour = tours.find((tour) => tour.id === id)
      if (!tour) return

      setActiveTour(tour)
      setIsTourOpen(true)
      setActiveStep(1)
    },
    [tours]
  )

  const endTour = useCallback(() => {
    setIsTourOpen(false)
    setActiveTour(null)
    setActiveStep(0)
  }, [])

  const nextStep = useCallback(() => {
    setActiveStep((prevStep) => Math.min(totalSteps, prevStep + 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setActiveStep((prevStep) => Math.max(1, prevStep - 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setActiveStep(step)
  }, [])

  return (
    <TourContext.Provider
      value={{
        isTourOpen,
        activeTour,
        activeStep,
        totalSteps,
        tours,

        addTour,
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
