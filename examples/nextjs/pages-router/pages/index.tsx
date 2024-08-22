"use client";

import { useEffect, useState } from "react";

import MonacoEditor from "@monaco-editor/react";
import {
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from "monacopilot";

export default function Home() {
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCopilot(monaco, editor, {
      endpoint: "/api/copilot",
      language: "javascript",
    });

    return () => {
      copilot.deregister();
    };
  }, [monaco, editor]);

  return (
    <main>
      <MonacoEditor
        language="javascript"
        height={"100vh"}
        width={"100%"}
        onMount={(editor, monaco) => {
          setEditor(editor);
          setMonaco(monaco);
        }}
      />
    </main>
  );
}
