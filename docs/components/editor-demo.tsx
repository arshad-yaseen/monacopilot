import {useState} from 'react';

import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {TabsContent} from '@radix-ui/react-tabs';
import {motion} from 'framer-motion';
import {Editor, EditorProps, Theme} from 'monacopilot';
import {useTheme} from 'next-themes';

interface File {
  filename: string;
  language: string;
  path: string;
  content: string;
}

const COPILOT_ENDPOINT = '/api/copilot';

const EDITOR_OPTIONS: EditorProps['options'] = {
  padding: {top: 60, bottom: 16},
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  scrollBeyondLastLine: false,
  fontFamily: 'var(--font-mono)',
  fontSize: 15,
  renderLineHighlightOnlyWhenFocus: true,
  lineDecorationsWidth: 0,
};

const EditorDemo = () => {
  const [files, setFiles] = useState<Array<File>>([
    {
      filename: 'index.js',
      language: 'javascript',
      path: './index.js',
      content: `import { add } from './utils';\n\nconst result = add(1, 2);`,
    },
    {
      filename: 'utils.js',
      language: 'javascript',
      path: './utils.js',
      content:
        'export function add(a, b) { return a + b; }\nexport function subtract(a, b) { return a - b; }',
    },
    {
      filename: 'constants.js',
      language: 'javascript',
      path: './constants.js',
      content: 'export const PI = 3.14159;',
    },
  ]);

  return (
    <motion.div
      initial={{opacity: 0, y: 6}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.6}}
      className="rounded-xl my-8 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 md:w-[700px] w-full h-[400px] relative">
      <Tabs defaultValue="index.js" className="w-full h-full">
        <TabsList className="absolute top-0 border-b left-0 rounded-b-none z-50 w-full justify-start px-3 h-12 gap-2 bg-neutral-50 dark:bg-neutral-950">
          {files.map(file => (
            <TabsTrigger
              key={file.filename}
              value={file.filename}
              className="rounded-md border font-mono">
              {file.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {files.map(file => (
          <TabsContent
            key={file.filename}
            value={file.filename}
            className="w-full h-full">
            <RenderEditor
              filename={file.filename}
              value={file.content}
              language={file.language}
              externalContext={files
                .filter(f => f.filename !== file.filename)
                .map(f => ({path: f.path, content: f.content}))}
              setValue={(filename, value) =>
                setFiles(prevFiles =>
                  prevFiles.map(f =>
                    f.filename === filename ? {...f, content: value} : f,
                  ),
                )
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
};

interface RenderEditorProps extends EditorProps {
  setValue: (filename: string, value: string) => void;
}

const RenderEditor = ({
  setValue,
  filename,
  value,
  language,
  externalContext,
}: RenderEditorProps) => {
  const {resolvedTheme} = useTheme();
  const theme: Theme =
    resolvedTheme === 'dark' ? 'codesandbox-dark' : 'github-light';

  return (
    <Editor
      endpoint={COPILOT_ENDPOINT}
      theme={theme}
      options={EDITOR_OPTIONS}
      onChange={newValue => {
        if (filename && newValue) {
          setValue(filename, newValue);
        }
      }}
      value={value}
      language={language}
      className="w-full z-10"
      loading=""
      externalContext={externalContext}
    />
  );
};

export default EditorDemo;
