'use client';

import {Tour, useTourControls} from 'next-tour';

export default function Home() {
  const {startTour, endTour, nextStep, prevStep, goToStep} = useTourControls();

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Hello World
      </h1>
      <Tour
        id="tour1"
        steps={[
          {
            target: '#target1',
            content: (
              <div className="space-x-2">
                <input
                  type="text"
                  placeholder="Enter something..."
                  className="border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg">
                  Tour 1 Submit
                </button>
              </div>
            ),
          },
          {target: '#target2', content: 'Tour 1 - This is the second step.'},
        ]}
      />
      <Tour
        id="tour2"
        steps={[
          {
            target: '#target1',
            content: (
              <div className="space-x-2">
                <input
                  type="text"
                  placeholder="Enter something..."
                  className="border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg">
                  Tour 2 Submit
                </button>
              </div>
            ),
          },
          {target: '#target2', content: 'Tour 2 - This is the second step.'},
        ]}
      />
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <div id="target1" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 1
        </div>
        <div id="target2" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 2
        </div>
      </div>
      <div className="flex justify-center gap-4 my-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => startTour('tour1')}>
          Start Tour 1
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => startTour('tour2')}>
          Start Tour 2
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={endTour}>
          End Tour
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={nextStep}>
          Next Step
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={prevStep}>
          Previous Step
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => goToStep(1)}>
          Go to First Step
        </button>
      </div>
    </main>
  );
}
