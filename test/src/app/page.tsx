'use client';

import {Editor} from 'ai-monaco-editor';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-6 py-32 px-6">
      <Editor
        language="javascript"
        className="h-[300px] w-[300px] border"
        provider="anthropic"
        model="claude-3-haiku-20240307"
        apiKey="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"
      />
    </main>
  );
}
