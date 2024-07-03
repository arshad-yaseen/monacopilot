'use client';

import MonaCopilot from 'monacopilot';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <MonaCopilot
        endpoint="/api/copilot"
        language="rust"
        theme="github-dark-dimmed"
        className="h-screen w-screen"
        options={{
          padding: {top: 16},
        }}
      />
    </main>
  );
}
