"use client"

import { Tour, useTourControls } from "next-tour"

export default function Home() {
  const { startTour, endTour, nextStep, prevStep, goToStep } = useTourControls()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <Tour
        id="tour1"
        steps={[
          { target: "#target1", content: "This is the first step." },
          { target: "#target2", content: "This is the second step." },
        ]}
      >
        hello
      </Tour>
      <div id="target1" className="bg-blue-500 p-4 rounded-lg">
        Target 1
      </div>
      <div className="flex-1" />
      <div id="target2" className="bg-blue-500 p-4 rounded-lg">
        Target 2
      </div>
      <hr />
      <button onClick={() => startTour("tour1")}>Start Tour</button>
      <button onClick={endTour}>End Tour</button>
      <button onClick={nextStep}>Next Step</button>
      <button onClick={prevStep}>Previous Step</button>
      <button onClick={() => goToStep(1)}>Go to Step 1</button>
    </main>
  )
}
