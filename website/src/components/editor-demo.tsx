import {motion} from 'framer-motion';
import {Editor} from 'monacopilot';

const EDITOR_DEFAULT_VALUE = `// Try editing this code to see the AI auto-completion in action
const reverse = (str) => {
  return str.split("").reverse().join("");
}

const isPalindrome = (str) => {}`;
const DEFAULT_LANGUAGE = 'javascript';

const EditorDemo = () => {
  return (
    <motion.div
      initial={{opacity: 0, y: 6}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.6}}
      className="rounded-xl my-6 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 md:w-[700px] w-full h-[400px]">
      <Editor
        language={DEFAULT_LANGUAGE}
        theme="github-light"
        completionEndpoint="/api/autocomplete"
        className="w-full"
        defaultValue={EDITOR_DEFAULT_VALUE}
        options={{
          padding: {top: 16, bottom: 16},
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          scrollBeyondLastLine: false,
          fontFamily: 'var(--font-mono)',
          fontSize: 15,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
      />
    </motion.div>
  );
};

export default EditorDemo;
