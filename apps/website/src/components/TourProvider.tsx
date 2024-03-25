"use client"

import { TourProvider as TourProviderCore } from "next-tour"
import { PropsWithChildren } from "react"

const TourProvider = ({ children }: PropsWithChildren) => {
  return <TourProviderCore>{children}</TourProviderCore>
}

export default TourProvider
