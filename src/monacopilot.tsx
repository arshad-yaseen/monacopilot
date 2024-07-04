import React from 'react';

import {Editor as MonacoEditor} from '@monaco-editor/react';

import {EDITOR_DEFAULT_OPTIONS} from './constants';
import {err} from './error';
import {registerCopilot} from './helpers/copilot';
import {
  EditorOptions,
  Monaco,
  MonaCopilotProps,
  StandaloneCodeEditor,
} from './types';
import {deepMerge} from './utils';

const MonaCopilot = ({
  filename,
  endpoint,
  technologies,
  externalContext,
  onMount,
  ...props
}: MonaCopilotProps) => {
  const _disposeCopilotRef = React.useRef<(() => void) | undefined>();

  const onEditorDidMount = React.useCallback(
    (editor: StandaloneCodeEditor, monaco: Monaco) => {
      try {
        _disposeCopilotRef.current = registerCopilot({
          monaco,
          filename,
          endpoint,
          technologies,
          externalContext,
          language: props.language,
        });
      } catch (error) {
        err(error).monacopilotError('Error while registering copilot');
      }

      onMount?.(editor, monaco);
    },
    [
      filename,
      endpoint,
      technologies,
      externalContext,
      onMount,
      props.language,
    ],
  );

  React.useEffect(() => {
    return () => {
      _disposeCopilotRef.current?.();
    };
  }, []);

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default MonaCopilot;
