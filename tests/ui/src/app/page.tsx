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

    const completion = registerCompletion(monaco, editor, {
      endpoint: '/api/complete',
      language: 'javascript',
      maxContextLines: 60,
      requestHandler: async ({endpoint, body}) => {
        try {
          // Perform the fetch
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Custom-Header': 'custom-value',
            },
            body: JSON.stringify({
              ...body,
              custom: 'custom-value',
            }),
          });

          const data = await response.json();

          // Custom processing
          if (data.error) {
            // Handle error
            console.error('Custom Error Handling:', data.error);
            return null;
          }

          // Return the completion text
          return data.completion;
        } catch (error) {
          console.error('Fetch error:', error);
          return null;
        }
      },
    });

    return () => {
      completion.deregister();
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
