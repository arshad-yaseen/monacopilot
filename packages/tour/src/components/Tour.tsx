import React, { useEffect } from "react"
import Popover from "src/components/Popover"
import { useTourControls } from "../hooks"
import { TourProps } from "../types"

const Tour = ({ children, ...tour }: TourProps) => {
  const { addTour } = useTourControls()

  useEffect(() => {
    // Add the tour to the global tours state
    addTour(tour)
  }, [addTour, tour])

  return (
    <Popover preferredPosition="top-center">
      <Popover.Trigger>
        <button>hello</button>
      </Popover.Trigger>
      <Popover.Content>
        This is the content
        <input type="text" />
      </Popover.Content>
    </Popover>
  )
}

export default Tour
