'use client';

import {useEffect, useState} from 'react';

import Editor from '@monaco-editor/react';
import {
  applyDiffDecorations,
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';

const ORIGINAL_TEXT = `// Simple calculator function
function add(a, b) {
  return a + b;
}

// Greet function
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Array of numbers
const numbers = [1, 2, 3, 4, 5];

// Calculate sum of numbers
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

console.log("Sum:", sum);`;

const MODIFIED_TEXT = `// Simple calculator function
function add(a, b) {
  return a + b;
}

// Greet function
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Array of numbers
const numbers = [1, 2, 3, 4, 5];

// Calculate sum of numbers
let sum = 0;
const randomNumber = Math.random()

console.log("Sum:", sum);`;

export default function Home() {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const completion = registerCompletion(monaco, editor, {
      endpoint: '/api/complete',
      language: 'javascript',
      maxContextLines: 60,
    });

    const decorations = applyDiffDecorations(
      editor,
      ORIGINAL_TEXT,
      MODIFIED_TEXT,
    );

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    return () => {
      completion.deregister();
      decorations?.clear();
    };
  }, [monaco, editor]);

  return (
    <Editor
      language="javascript"
      onMount={(editor, monaco) => {
        setMonaco(monaco);
        setEditor(editor);
      }}
      defaultValue={ORIGINAL_TEXT}
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
