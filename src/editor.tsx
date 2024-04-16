import React from 'react';

import {Monaco, Editor as MonacoEditor} from '@monaco-editor/react';

import Config from './classes/config';
import {DEFAULT_LANGUAGE, EDITOR_DEFAULT_OPTIONS} from './constants/common';
import {useStartCompletion} from './hooks/use-start-completion';
import {CodeEditorType, EditorOptions, EditorProps} from './types/common';
import {deepMerge} from './utils/common';

const Editor = ({endpoint, ...props}: EditorProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  React.useEffect(() => {
    Config.setEndpoint(endpoint);
  }, [endpoint]);

  const onEditorDidMount = React.useCallback(
    (editor: CodeEditorType, monaco: Monaco) => {
      setMonacoInstance(monaco);

      props.onMount?.(editor, monaco);
    },
    [props],
  );

  useStartCompletion(monacoInstance, props.language || DEFAULT_LANGUAGE);

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default Editor;