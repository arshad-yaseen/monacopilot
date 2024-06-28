'use client';

import MonaCopilot from 'monacopilot';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <MonaCopilot
        endpoint="/api/copilot"
        language="javascript"
        theme="github-light"
        className="h-screen w-screen"
        options={{
          padding: {top: 16},
          fontSize: 16,
        }}
      />
    </main>
  );
}
