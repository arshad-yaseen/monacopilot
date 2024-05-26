import React from 'react';

import {Monaco, Editor as MonacoEditor} from '@monaco-editor/react';

import {
  EDITOR_BUILT_IN_THEMES,
  EDITOR_DEFAULT_OPTIONS,
} from './constants/common';
import useStartCompletion from './hooks/use-start-completion';
import themes from './themes';
import type {
  EditorBuiltInTheme,
  EditorOptions,
  StandaloneCodeEditor,
} from './types/common';
import EditorProps from './types/editor-props';
import {deepMerge} from './utils/common';

const Editor = ({
  filename,
  endpoint,
  technologies,
  theme,
  completionSpeed,
  externalContext,
  ...props
}: EditorProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  const onEditorDidMount = React.useCallback(
    (editor: StandaloneCodeEditor, monaco: Monaco) => {
      setMonacoInstance(monaco);

      if (
        theme &&
        !EDITOR_BUILT_IN_THEMES.includes(theme as EditorBuiltInTheme)
      ) {
        monaco.editor.defineTheme(theme, themes[theme]);
        monaco.editor.setTheme(theme);
      }

      props.onMount?.(editor, monaco);
    },
    [props, theme],
  );

  useStartCompletion(
    filename,
    endpoint,
    technologies,
    props.language,
    completionSpeed,
    externalContext,
    monacoInstance,
  );

  return (
    <MonacoEditor
      {...props}
      key={theme}
      theme={theme}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default Editor;
