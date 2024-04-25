'use client';

import {Editor} from 'rich-monaco-editor';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <Editor
        language="javascript"
        completionEndpoint="/api/auto-complete"
        theme="github-dark"
        className="h-screen w-screen"
      />
    </main>
  );
}
