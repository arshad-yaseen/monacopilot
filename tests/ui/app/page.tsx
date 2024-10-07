'use client';

import '@/app/selection-actions.css';

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
      endpoint: '/api/complete',
      language: 'javascript',
    });

    const selectionActions = registerSelectionActions(monaco, editor, {
      actions: ['modify'],
      modify: {
        endpoint: '/api/modify',
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
      defaultValue={`// Simple custom language interpreter in JavaScript

// Define the language syntax
const syntax = {
  PRINT: 'PRINT',
  ADD: 'ADD',
  SUB: 'SUB',
  MUL: 'MUL',
  DIV: 'DIV',
};

// Interpreter function
function interpret(code) {
  const tokens = code.split(' ');
  const stack = [];

  for (let token of tokens) {
    if (token in syntax) {
      switch (token) {
        case syntax.PRINT:
          console.log(stack.pop());
          break;
        case syntax.ADD:
          stack.push(stack.pop() + stack.pop());
          break;
        case syntax.SUB:
          const b = stack.pop();
          const a = stack.pop();
          stack.push(a - b);
          break;
        case syntax.MUL:
          stack.push(stack.pop() * stack.pop());
          break;
        case syntax.DIV:
          const divisor = stack.pop();
          const dividend = stack.pop();
          stack.push(dividend / divisor);
          break;
      }
    } else {
      stack.push(Number(token));
    }
  }
}

// Example usage
const program = '3 4 ADD 2 MUL PRINT';
interpret(program);  // Outputs: 14`}
      width="100%"
      options={{
        padding: {top: 16},
        scrollBeyondLastColumn: 0,
        codeLens: false,
        minimap: {enabled: false},
        quickSuggestions: false,
        folding: false,
        links: false,
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        formatOnPaste: true,
        fontFamily: '--font-geist-mono',
      }}
    />
  );
}
