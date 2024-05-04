import {motion} from 'framer-motion';
import {Editor, Theme} from 'monacopilot';
import {useTheme} from 'next-themes';

const EDITOR_DEFAULTS = {
  value: `// Try editing this code to see the AI auto-completion in action
const reverse = (str) => {
  return str.split("").reverse().join("");
};

const isPalindrome = (str) => {};`,
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
    resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  return (
    <motion.div
      initial={{opacity: 0, y: 6}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.6}}
      className="rounded-xl my-8 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 md:w-[700px] w-full h-[400px]">
      <Editor
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
