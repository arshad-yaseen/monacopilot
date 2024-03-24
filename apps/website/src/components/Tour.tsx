"use client"

import { TourProvider } from "next-tour"
import React, { PropsWithChildren } from "react"

const Tour = ({ children }: PropsWithChildren) => {
  return (
    <TourProvider
      tours={[
        {
          id: "tour1",
          steps: [
            {
              target: "#target1",
              content: "This is the first step",
            },
            {
              target: "#target2",
              content: "This is the second step",
            },
          ],
        },
      ]}
    >
      {children}
    </TourProvider>
  )
}

export default Tour
