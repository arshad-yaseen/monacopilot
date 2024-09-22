'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCompletion(monaco, editor, {
      endpoint: '/api/complete',
      language: 'javascript',
      trigger: 'onTyping',
      maxContextLines: 120,
    });

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <Editor
      language="javascript"
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
