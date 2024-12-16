'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  CompletionMetadata,
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [completionMetadata, setCompletionMetadata] =
    useState<CompletionMetadata | null>(null);
  const [completionRequestsCount, setCompletionRequestsCount] =
    useState<number>(0);

  useEffect(() => {
    if (!monaco || !editor) return;

    const completion = registerCompletion(monaco, editor, {
      endpoint: '/api/complete',
      language: 'javascript',
      maxContextLines: 60,
      trigger: 'onTyping',
      requestHandler: async ({body, endpoint}) => {
        setCompletionMetadata(body.completionMetadata);
        setCompletionRequestsCount(prev => prev + 1);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return {
          completion: data.completion,
        };
      },
    });

    editor.onDidChangeCursorPosition(() => {
      setCompletionMetadata(null);
    });

    return () => {
      completion.deregister();
    };
  }, [monaco, editor]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <Editor
        language="javascript"
        onMount={(editor: StandaloneCodeEditor, monaco: Monaco) => {
          setMonaco(monaco);
          setEditor(editor);
        }}
        theme="vs-dark"
        height="500px"
        width="100%"
        options={{
          padding: {top: 24},
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
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontSize: 14,
          fontFamily: 'monospace',
        }}>
        <span>Completion requests count: {completionRequestsCount}</span>
      </div>
      {completionMetadata && (
        <pre
          style={{fontSize: 14, fontFamily: 'monospace', padding: '16px 20px'}}>
          <code>{JSON.stringify(completionMetadata, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}
