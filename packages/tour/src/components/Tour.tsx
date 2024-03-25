import "../styles.css"
import React, { useEffect } from "react"
import { useTourControls } from "../hooks"
import { TourProps } from "../types"

const Tour = ({ children, ...tour }: TourProps) => {
  const { addTour } = useTourControls()

  useEffect(() => {
    // Add the tour to the global tours state
    addTour(tour)
  }, [addTour, tour])

  return <div className="tour__container">{children}</div>
}

export default Tour
