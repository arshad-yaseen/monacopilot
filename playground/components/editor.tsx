'use client';

import {useEffect, useRef} from 'react';

import {DEFAULT_MONACO_EDITOR_OPTIONS} from '@/constants/editor';
import MonacoEditor from '@monaco-editor/react';
import {CompletionRegistration, registerCompletion} from 'monacopilot';

const Editor = () => {
    const completionRef = useRef<CompletionRegistration | null>(null);

    useEffect(() => {
        return () => {
            completionRef.current?.deregister();
        };
    }, []);

    return (
        <MonacoEditor
            height="400px"
            width="800px"
            language="python"
            className="rounded-lg border border-slate-200 dark:border-slate-800"
            options={DEFAULT_MONACO_EDITOR_OPTIONS}
            onMount={(editor, monaco) => {
                completionRef.current = registerCompletion(monaco, editor, {
                    endpoint: '/api/code-completion',
                    language: 'python',
                    trigger: 'onTyping',
                });
            }}
        />
    );
};

export default Editor;
