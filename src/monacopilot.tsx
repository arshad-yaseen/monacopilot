import React from 'react';

import {Editor as MonacoEditor} from '@monaco-editor/react';

import {EDITOR_DEFAULT_OPTIONS} from './constants';
import {registerCopilot} from './copilot/register';
import {err} from './error';
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
  const _unregisterCopilotRef = React.useRef<(() => void) | undefined>();

  const onEditorDidMount = React.useCallback(
    (editor: StandaloneCodeEditor, monaco: Monaco) => {
      try {
        if (endpoint && props.language) {
          _unregisterCopilotRef.current = registerCopilot({
            monaco,
            filename,
            technologies,
            externalContext,
            endpoint,
            language: props.language,
          });
        }
      } catch (error) {
        err(error).monacopilotError('Error while registering copilot');
      }

      onMount?.(editor, monaco);
    },
    [
      endpoint,
      filename,
      onMount,
      props.language,
      technologies,
      externalContext,
    ],
  );

  React.useEffect(() => {
    return () => {
      _unregisterCopilotRef.current?.();
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
