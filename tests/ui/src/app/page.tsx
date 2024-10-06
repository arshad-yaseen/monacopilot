'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  registerCompletion,
  registerSelectionActions,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const completion = registerCompletion(monaco, editor, {
      endpoint: 'https://api.dev.withcortex.ai/misc/complete-code',
      language: 'javascript',
      relatedFiles: [
        {
          path: './code_step.js',
          content: 'const document = $input.document$\n...',
        },
      ],
    });

    const selectionActions = registerSelectionActions(monaco, editor, {
      actions: ['modify'],
      modify: {
        endpoint: 'https://api.dev.withcortex.ai/misc/modify-code',
      },
    });

    return () => {
      completion.deregister();
      selectionActions.deregister();
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
      defaultValue={`const randomNumber = Math.random()\nconst isPalindrome = 'hello'`}
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
