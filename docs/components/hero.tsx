import {useEffect, useState} from 'react';
import Link from 'next/link';

import EditorDemo from '@/components/editor-demo';
import {buttonVariants} from '@/components/ui/button';
import Snippet from '@/components/ui/snippet';
import {GITHUB_REPO_URL} from '@/constants';
import useTypewriter from '@/hooks/use-typewriter';
import {cn} from '@/utils/misc';
import {GitHubLogoIcon} from '@radix-ui/react-icons';
import {motion} from 'framer-motion';

const Hero = () => {
  const [isGhostVisible, setGhostVisible] = useState(false);
  const [isAcceptedVisible, setAcceptedVisible] = useState(false);
  const [isCursorHidden, setCursorHidden] = useState(false);

  const githubCopilot = useTypewriter('GitHub Copilot', 100, {
    onComplete: () => {
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      timeouts.push(setTimeout(() => setGhostVisible(true), 100));
      timeouts.push(
        setTimeout(() => {
          setGhostVisible(false);
          setAcceptedVisible(true);
        }, 700),
      );
      timeouts.push(setTimeout(() => setCursorHidden(true), 1300));

      return () => timeouts.forEach(clearTimeout);
    },
  });

  return (
    <section className="w-full flex flex-col items-center container">
      <motion.h1
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="md:text-6xl text-5xl font-semibold tracking-tighter text-center relative">
        {githubCopilot}
        {!isAcceptedVisible && <Cursor />}
        <br />
        {isGhostVisible || isAcceptedVisible ? (
          <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.05}}
            className={cn('text-neutral-950 dark:text-neutral-50', {
              'text-neutral-400 dark:text-neutral-500': isGhostVisible,
            })}>
            for Monaco Editor
          </motion.span>
        ) : (
          <span className="invisible">for Monaco Editor</span>
        )}
        {isAcceptedVisible && !isCursorHidden && <Cursor />}
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
        <Link
          href="/docs"
          className={cn(buttonVariants({variant: 'default'}), 'rounded-full')}>
          Get Started
        </Link>
        <Link
          href={GITHUB_REPO_URL}
          target="_blank"
          className={cn(
            buttonVariants({variant: 'outline'}),
            'rounded-full gap-2',
          )}>
          <GitHubLogoIcon />
          GitHub
        </Link>
      </motion.div>
      <EditorDemo />
      <motion.div
        initial={{opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4, delay: 0.8}}
        className="w-full flex items-center justify-center">
        <Snippet value="npm install monacopilot" className="sm:w-fit w-full" />
      </motion.div>
    </section>
  );
};

const Cursor = () => <span className="absolute">|</span>;

export default Hero;
