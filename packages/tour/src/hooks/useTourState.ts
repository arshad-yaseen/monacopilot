import { useContext } from "react"
import { TourContext } from "../components/TourProvider"
import { TourState } from "../types"

const useTourState = (): TourState => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error(
      "Oops! It looks like useTour was called outside of a TourProvider context. Please ensure that your component is wrapped in a <TourProvider>"
    )
  }

  const { tours, activeStep, activeTour, isTourOpen, totalSteps } = context

  return { tours, activeStep, activeTour, isTourOpen, totalSteps }
}

export default useTourState
