import React from 'react';

import {Monaco, Editor as MonacoEditor} from '@monaco-editor/react';

import Config from './classes/config';
import {EDITOR_DEFAULT_OPTIONS} from './constants/common';
import {useStartCompletion} from './hooks/use-start-completion';
import {EditorOptions, EditorProps, EditorType} from './types/common';
import {deepMerge} from './utils/common';

const Editor = ({endpoint, framework, ...props}: EditorProps) => {
  const [monacoInstance, setMonacoInstance] = React.useState<Monaco | null>(
    null,
  );

  React.useEffect(() => {
    Config.setEndpoint(endpoint);
  }, [endpoint]);

  const onEditorDidMount = React.useCallback(
    (editor: EditorType, monaco: Monaco) => {
      setMonacoInstance(monaco);

      props.onMount?.(editor, monaco);
    },
    [props],
  );

  useStartCompletion(monacoInstance, props.language, framework);

  return (
    <MonacoEditor
      {...props}
      onMount={onEditorDidMount}
      options={deepMerge<EditorOptions>(props.options, EDITOR_DEFAULT_OPTIONS)}
    />
  );
};

export default Editor;
