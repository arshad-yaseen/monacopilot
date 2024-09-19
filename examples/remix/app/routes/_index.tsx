import {useEffect, useState} from 'react';

import {Editor} from '@monaco-editor/react';
import type {MetaFunction} from '@remix-run/node';
import {
  Monaco,
  registerCompletion,
  type StandaloneCodeEditor,
} from 'monacopilot';

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ];
};

export default function Index() {
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCompletion(monaco, editor, {
      endpoint: '/complete',
      language: 'javascript',
    });

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <Editor
      language="javascript"
      height={'100vh'}
      width={'100%'}
      onMount={(editor, monaco) => {
        setEditor(editor);
        setMonaco(monaco);
      }}
    />
  );
}
