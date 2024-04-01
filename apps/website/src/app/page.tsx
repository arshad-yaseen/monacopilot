'use client';

import {useTourControls} from 'next-tour';

export default function Home() {
  const {startTour} = useTourControls();
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 p-8 h-[200vh]">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Hello World
      </h1>
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <div id="target1" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 1
        </div>
        <div id="target2" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 2
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <div
          id="target3"
          className="bg-blue-500 text-white p-4 rounded-lg mt-[1200px] absolute">
          Target 3
        </div>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-fit"
        onClick={() => startTour('tour1')}>
        Start Tour
      </button>
    </main>
  );
}
