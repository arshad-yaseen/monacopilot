'use client';

import MonacoEditor from '@monaco-editor/react';
import {getLanguageInfo} from '~/utils/editor';
import {useTheme} from 'next-themes';

interface CodeEditorProps {
  value: string;
  path: string;
  onChange: (value: string | undefined) => void;
}

export function Editor({value, path, onChange}: CodeEditorProps) {
  const {theme} = useTheme();
  const languageInfo = getLanguageInfo(path);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={languageInfo.name}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      value={value}
      onChange={onChange}
      options={{
        minimap: {enabled: false},
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      }}
    />
  );
}
