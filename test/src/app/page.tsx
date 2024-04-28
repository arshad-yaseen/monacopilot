'use client';

import {Editor} from 'monacopilot';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <Editor
        language="javascript"
        theme="twilight"
        endpoint="/api/copilot"
        className="h-screen w-screen"
      />
    </main>
  );
}
