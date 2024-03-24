import { useEffect } from "react"
import { useTourControls } from "../hooks"
import { TourProps } from "../types"

const Tour = ({ children, ...tour }: TourProps) => {
  const { addTour } = useTourControls()

  useEffect(() => {
    // Add the tour to the globals tours state
    addTour(tour)
  }, [addTour, tour])

  return children
}

export default Tour
