import {useEffect, useState} from 'react';

import {Editor} from '@monaco-editor/react';
import {
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

const CodeEditor = () => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const unregister = registerCopilot(monaco, editor, {
      endpoint: '/api/copilot',
      language: 'javascript',
    });

    return () => {
      unregister();
    };
  }, [monaco, editor]);

  return (
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
      }}
    />
  );
};

export default CodeEditor;
