'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCopilot(monaco, editor, {
      endpoint: '/api/copilot',
      language: 'javascript',
    });

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <Editor
        language="javascript"
        onMount={(editor, monaco) => {
          setMonaco(monaco);
          setEditor(editor);
        }}
        className="h-screen w-screen"
        theme="vs-dark"
        options={{
          padding: {top: 16},
          scrollBeyondLastColumn: 0,
          codeLens: false,
          minimap: {enabled: false},
          quickSuggestions: false,
          folding: false,
          links: false,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          formatOnPaste: true,
        }}
      />
    </main>
  );
}
