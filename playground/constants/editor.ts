import type { EditorProps } from "@monaco-editor/react";

export const DEFAULT_MONACO_EDITOR_OPTIONS: EditorProps["options"] = {
    padding: { top: 16, bottom: 16 },
    scrollBeyondLastColumn: 0,
    codeLens: false,
    minimap: { enabled: false },
    quickSuggestions: false,
    folding: false,
    links: false,
    fontSize: 15,
    wordWrap: "on",
    automaticLayout: true,
    formatOnPaste: true,
    fontFamily: "var(--font-mono)",
    glyphMargin: false,
    scrollbar: {
        verticalSliderSize: 0,
        verticalScrollbarSize: 0,
        vertical: "hidden",
    },
    renderLineHighlight: "none",
} as const;
