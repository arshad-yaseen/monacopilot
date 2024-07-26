import {useEffect, useState} from 'react';

import {Editor, EditorProps, Theme} from '@monaco-editor/react';
import {motion} from 'framer-motion';
import {
  registerCopilot,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';
import {useTheme} from 'next-themes';

const EDITOR_DEFAULTS = {
  value: `// Start coding here to see the autocompletion in action!`,
  language: 'javascript',
  options: {
    padding: {top: 16, bottom: 16},
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    scrollBeyondLastLine: false,
    fontFamily: 'var(--font-mono)',
    fontSize: 16,
    scrollbar: {alwaysConsumeMouseWheel: false},
    scrollBeyondLastColumn: 0,
    codeLens: false,
    minimap: {
      enabled: false,
    },
    quickSuggestions: false,
    folding: false,
    foldingHighlight: false,
    foldingImportsByDefault: false,
    links: false,
    wordWrap: 'on',
    automaticLayout: true,
    formatOnPaste: true,
    inlineSuggest: {
      enabled: true,
      mode: undefined,
    },
  },
};

const EditorDemo = () => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);

  const {resolvedTheme} = useTheme();

  const theme: Theme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  useEffect(() => {
    if (!monaco || !editor) return;

    const copilot = registerCopilot(monaco, editor, {
      endpoint: '/api/copilot',
      language: 'javascript',
    });

    return () => {
      copilot.unregister();
    };
  }, [monaco, editor]);

  return (
    <motion.div
      initial={{opacity: 0, y: 6}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.6}}
      className="rounded-xl my-8 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 md:w-[700px] w-full h-[400px]">
      <Editor
        language={EDITOR_DEFAULTS.language}
        theme={theme}
        onMount={(editor, monaco) => {
          setMonaco(monaco);
          setEditor(editor);
        }}
        className="w-full"
        defaultValue={EDITOR_DEFAULTS.value}
        options={EDITOR_DEFAULTS.options as EditorProps['options']}
      />
    </motion.div>
  );
};

export default EditorDemo;
