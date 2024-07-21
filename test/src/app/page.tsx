'use client';

import {Editor} from '@monaco-editor/react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <Editor
        language="javascript"
        className="h-screen w-screen"
        theme="vs-dark"
        options={{
          padding: {top: 16},
        }}
      />
    </main>
  );
}
