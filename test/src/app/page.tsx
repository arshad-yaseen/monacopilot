'use client';

import {useState} from 'react';

import {Editor} from 'monacopilot';

export default function Home() {
  const [isFastCompletion, setFastCompletion] = useState(false);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <div className="w-full flex justify-center items-center py-4 border-b">
        <div className="flex gap-2">
          <label htmlFor="speed">Little Faster completion</label>
          <input
            type="checkbox"
            id="speed"
            checked={isFastCompletion}
            onChange={() => setFastCompletion(!isFastCompletion)}
          />
        </div>
      </div>
      <Editor
        language="javascript"
        theme="github-light"
        endpoint="/api/copilot"
        className="h-screen w-screen"
        completionSpeed={isFastCompletion ? 'little-faster' : 'normal'}
        options={{
          padding: {top: 16},
        }}
      />
    </main>
  );
}
