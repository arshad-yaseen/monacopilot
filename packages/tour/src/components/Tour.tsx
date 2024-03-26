import "../styles.css"
import React from "react"
import { useTourControls, useTourState } from "../hooks"
import { TourProps } from "../types"
import Step from "./Step"

const Tour = ({ options, ...tour }: TourProps) => {
  const { addTour } = useTourControls()
  const { activeTour, activeStepIndex } = useTourState()

  React.useEffect(() => {
    // Add this tour to the list of available tours
    addTour(tour)
  }, [addTour, tour])

  const activeStep = activeTour?.steps[activeStepIndex] ?? null

  return <Step activeStep={activeStep} tourOptions={options} />
}

export default Tour
