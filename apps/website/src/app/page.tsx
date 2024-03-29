'use client';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 p-8 h-[200vh]">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Hello World
      </h1>
      {/* <Tour
        id="tour1"
        steps={[
          {
            target: '#target1',
            title: "Let's get started",
            content:
              'This is the first step of the tour. If you need help, click Next. If not, click Skip.',
          },
          {
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
      /> */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        <div id="target1" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 1
        </div>
        <div id="target2" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 2
        </div>
      </div>
      {/* <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-fit"
        onClick={() => startTour('tour1')}>
        Start Tour
      </button> */}

      <div className="flex flex-wrap justify-center gap-4 my-8 items-center pt-[700px]">
        <div id="target3" className="bg-blue-500 text-white p-4 rounded-lg">
          Target 3
        </div>
      </div>
    </main>
  );
}
