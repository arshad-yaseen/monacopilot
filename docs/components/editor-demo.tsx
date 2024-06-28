import {motion} from 'framer-motion';
import MonaCopilot, {Theme} from 'monacopilot';
import {useTheme} from 'next-themes';

const EDITOR_DEFAULTS = {
  value: `// Start coding here to see the autocompletions in action!`,
  language: 'javascript',
  options: {
    padding: {top: 16, bottom: 16},
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    scrollBeyondLastLine: false,
    fontFamily: 'var(--font-mono)',
    fontSize: 15,
    scrollbar: {alwaysConsumeMouseWheel: false},
  },
};

const EditorDemo = () => {
  const {resolvedTheme} = useTheme();
  const theme: Theme =
    resolvedTheme === 'dark' ? 'codesandbox-dark' : 'github-light';

  return (
    <motion.div
      initial={{opacity: 0, y: 6}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.6}}
      className="rounded-xl my-8 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 md:w-[700px] w-full h-[400px]">
      <MonaCopilot
        endpoint="/api/copilot"
        language={EDITOR_DEFAULTS.language}
        theme={theme}
        className="w-full"
        defaultValue={EDITOR_DEFAULTS.value}
        options={EDITOR_DEFAULTS.options}
      />
    </motion.div>
  );
};

export default EditorDemo;
