import EditorDemo from '@/components/editor-demo';
import {Button} from '@/components/ui/button';
import Snippet from '@/components/ui/snippet';
import {GitHubLogoIcon} from '@radix-ui/react-icons';
import {motion} from 'framer-motion';

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center container">
      <motion.h1
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="text-5xl font-semibold tracking-tighter text-center leading-tight relative">
        Monaco Editor <br />
        Redefined
      </motion.h1>
      <motion.p
        initial={{opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4, delay: 0.2}}
        className="text-muted-foreground mt-4 mb-6 text-center">
        Extended Monaco Editor with AI auto-completion and new themes.
      </motion.p>
      <motion.div
        initial={{opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4, delay: 0.4}}
        className="flex gap-2">
        <Button className="rounded-full">Documentation</Button>
        <Button variant="outline" className="rounded-full gap-2">
          <GitHubLogoIcon />
          GitHub
        </Button>
      </motion.div>
      <EditorDemo />
      <motion.div
        initial={{opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4, delay: 0.8}}>
        <Snippet value="npm install monacopilot" />
      </motion.div>
    </section>
  );
};

export default Hero;
