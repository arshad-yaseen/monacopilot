import React from 'react';

import {Editor as MonacoEditor} from '@monaco-editor/react';

import {EDITOR_DEFAULT_OPTIONS} from './constants/common';
import useStartCompletion from './hooks/core/use-start-completion';
import type {EditorOptions, Monaco, StandaloneCodeEditor} from './types/common';
import type MonaCopilotProps from './types/monacopilot-props';
import {deepMerge} from './utils/common';

const MonaCopilot = ({
  filename,
  endpoint,
  technologies,
  externalContext,
  onMount,
  ...props
}: MonaCopilotProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  const onEditorDidMount = React.useCallback(
    (editor: StandaloneCodeEditor, monaco: Monaco) => {
      setMonacoInstance(monaco);

      onMount?.(editor, monaco);
    },
    [onMount],
  );

  useStartCompletion(
    filename,
    endpoint,
    technologies,
    props.language,
    externalContext,
    monacoInstance,
  );

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default MonaCopilot;
