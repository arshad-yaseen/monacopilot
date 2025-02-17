'use client';

import {useEffect, useState} from 'react';

import {DEFAULT_MONACO_EDITOR_OPTIONS} from '@/constants/editor';
import MonacoEditor from '@monaco-editor/react';
import {
    registerCompletion,
    type Monaco,
    type StandaloneCodeEditor,
} from 'monacopilot';

const Editor = () => {
    const [monaco, setMonaco] = useState<Monaco | null>(null);
    const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

    useEffect(() => {
        if (!monaco || !editor) return;

        const completion = registerCompletion(monaco, editor, {
            endpoint: '/api/code-completion',
            language: 'python',
            trigger: 'onTyping',
        });

        return () => {
            completion.deregister();
        };
    }, [monaco, editor]);

    return (
        <MonacoEditor
            height="400px"
            width="800px"
            language="python"
            className="rounded-lg border border-slate-200 dark:border-slate-800"
            options={DEFAULT_MONACO_EDITOR_OPTIONS}
            onMount={(editor, monaco) => {
                setEditor(editor);
                setMonaco(monaco);
            }}
        />
    );
};

export default Editor;
