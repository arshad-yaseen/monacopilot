import React from 'react';

import {
  EditorProps,
  Monaco,
  Editor as MonacoEditor,
} from '@monaco-editor/react';

import {DEFAULT_LANGUAGE, EDITOR_DEFAULT_OPTIONS} from './constants';
import {useCompletionProvider} from './hooks/use-completion-provider';
import {CodeEditorType, EditorOptions} from './types';
import {deepMerge} from './utils';

const Editor = (props: EditorProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  const onEditorDidMount = React.useCallback(
    (editor: CodeEditorType, monaco: Monaco) => {
      setMonacoInstance(monaco);

      props.onMount?.(editor, monaco);
    },
    [props],
  );

  useCompletionProvider(monacoInstance, props.language || DEFAULT_LANGUAGE);

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default Editor;
