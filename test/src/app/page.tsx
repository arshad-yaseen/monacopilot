'use client';

import {Editor} from 'monacopilot';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      MonacoPilot
      <Editor
        language="javascript"
        completionEndpoint="/api/auto-complete"
        className="h-screen w-screen"
      />
    </main>
  );
}
