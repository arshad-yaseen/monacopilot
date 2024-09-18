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
      language: 'python',
    });

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <Editor
      language="python"
      onMount={(editor, monaco) => {
        setMonaco(monaco);
        setEditor(editor);
      }}
      theme="vs-dark"
      height="100vh"
      width="100%"
      options={{
        padding: {top: 16},
        scrollBeyondLastColumn: 0,
        codeLens: false,
        minimap: {enabled: false},
        quickSuggestions: false,
        folding: false,
        links: false,
        fontSize: 17,
        wordWrap: 'on',
        automaticLayout: true,
        formatOnPaste: true,
      }}
    />
  );
}
