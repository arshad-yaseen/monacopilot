import React from 'react';

import {Editor as MonacoEditor} from '@monaco-editor/react';

import {EDITOR_DEFAULT_OPTIONS} from './constants/common';
import err from './error';
import registerCopilot from './helpers/copilot/register';
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
  const disposableRef = React.useRef<(() => void) | undefined>();

  const onEditorDidMount = React.useCallback(
    (editor: StandaloneCodeEditor, monaco: Monaco) => {
      try {
        disposableRef.current = registerCopilot({
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
      disposableRef.current?.();
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
