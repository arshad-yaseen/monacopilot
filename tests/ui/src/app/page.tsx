'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  CopilotRegistration,
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilots: CopilotRegistration[] = [];
    for (let i = 0; i < 10; i++) {
      const copilot = registerCopilot(monaco, editor, {
        endpoint: '/api/copilot',
        language: 'javascript',
      });
      copilots.push(copilot);
    }

    return () => {
      copilots.forEach(copilot => copilot.deregister());
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
