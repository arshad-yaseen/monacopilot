import { useContext } from "react"
import { TourContext } from "../components/TourProvider"
import { TourControls } from "../types"

const useTourControls = (): TourControls => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error(
      "Oops! It looks like useTourControls was called outside of a TourProvider context. Please ensure that your component is wrapped in a <TourProvider> to use the tour controls."
    )
  }

  const { startTour, endTour, goToStep, nextStep, prevStep, addTour } = context

  return { startTour, endTour, goToStep, nextStep, prevStep, addTour }
}

export default useTourControls
