'use client';

import {useEffect, useState} from 'react';

import MonacoEditor from '@monaco-editor/react';
import {
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

const LANGUAGE = 'javascript';
const COPILOT_ENDPOINT = '/api/copilot';

export default function JavaScriptEditor() {
  const [editorInstance, setEditorInstance] =
    useState<StandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monacoInstance || !editorInstance) return;

    const copilotRegistration = registerCopilot(
      monacoInstance,
      editorInstance,
      {
        endpoint: COPILOT_ENDPOINT,
        language: LANGUAGE,
      },
    );

    return () => {
      copilotRegistration.deregister();
    };
  }, [monacoInstance, editorInstance]);

  return (
    <MonacoEditor
      language={LANGUAGE}
      onMount={(editor, monaco) => {
        setEditorInstance(editor);
        setMonacoInstance(monaco);
      }}
    />
  );
}
