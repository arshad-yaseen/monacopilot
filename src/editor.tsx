import React from 'react';

import {Monaco, Editor as MonacoEditor} from '@monaco-editor/react';

import {EDITOR_DEFAULT_OPTIONS} from './constants/common';
import useStartCompletion from './hooks/use-start-completion';
import {EditorOptionsType, EditorType} from './types/common';
import EditorProps from './types/editor-props';
import {deepMerge} from './utils/common';

const Editor = ({
  endpoint,
  framework,
  completionSpeed,
  ...props
}: EditorProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  const onEditorDidMount = React.useCallback(
    (editor: EditorType, monaco: Monaco) => {
      setMonacoInstance(monaco);

      props.onMount?.(editor, monaco);
    },
    [props],
  );

  useStartCompletion(
    endpoint,
    framework,
    completionSpeed,
    props.language,
    monacoInstance,
  );

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptionsType>(
        props.options,
        EDITOR_DEFAULT_OPTIONS,
      )}
    />
  );
};

export default Editor;
