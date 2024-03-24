import { useContext } from "react"
import { TourContext } from "../components/TourProvider"

const useTourControls = () => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error(
      "Oops! It looks like useTourControls was called outside of a TourProvider context. Please ensure that your component is wrapped in a <TourProvider> to use the tour controls."
    )
  }
  return context
}

export default useTourControls
