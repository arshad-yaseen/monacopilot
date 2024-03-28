'use client';

import {Tour, useTourControls} from 'next-tour';

export default function Home() {
  const {startTour, endTour, nextStep, prevStep, goToStep} = useTourControls();

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 p-8 h-[200vh]">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Hello World
      </h1>
      <Tour
        id="tour1"
        options={{
          highlightTarget: false,
        }}
        steps={[
          {
            target: '#target1',
            title: "Let's get started",
            content:
              'This is the first step of the tour. If you need help, click Next. If not, click Skip.',
          },
          {
            target: '#target2',
            title: 'Next up',
            position: 'window-center',
            content:
              'This is the second step of the tour. If you need help, click Next. If not, click Skip.',
          },
          {
            target: '#target3',
            title: 'Final step',
            content:
              'This is the final step of the tour. If you need help, click Next. If not, click Skip.',
          },
        ]}
      />
      <Tour
        id="tour2"
        options={{
          highlightTarget: false,
        }}
        steps={[
          {
            target: '#target2',
            title: "Let's get started too",
            content:
              'This is the first step of the tour. If you need help, click Next. If not, click Skip.',
          },
          {
            target: '#target1',
            title: 'Next up',
            content:
              'This is the second step of the tour. If you need help, click Next. If not, click Skip.',
          },
          {
            target: '#target3',
            title: 'Final step',
            content:
              'This is the final step of the tour. If you need help, click Next. If not, click Skip.',
          },
        ]}
      />
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg">Target 1</div>
        <div className="bg-blue-500 text-white p-4 rounded-lg">Target 2</div>
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
          id="target1"
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
          id="target2"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => goToStep(1)}>
          Go to First Step
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-8 items-center pt-[700px]">
        <div id="target3" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 2
        </div>
      </div>
    </main>
  );
}
