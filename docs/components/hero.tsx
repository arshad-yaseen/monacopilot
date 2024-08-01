import {useState} from 'react';
import Link from 'next/link';

import EditorDemo from '@/components/editor-demo';
import {buttonVariants} from '@/components/ui/button';
import Snippet from '@/components/ui/snippet';
import {GITHUB_REPO_URL} from '@/constants';
import {cn} from '@/utils/misc';
import {GitHubLogoIcon} from '@radix-ui/react-icons';

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center container">
      <h1 className="md:text-6xl text-5xl font-semibold tracking-tighter text-center relative">
        AI auto-completion <br /> for Monaco Editor
      </h1>
      <p className="text-muted-foreground mt-4 mb-6 text-center">
        AI auto-completion plugin for Monaco Editor, inspired by GitHub Copilot
      </p>
      <div className="flex gap-2">
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
      </div>
      <EditorDemo />
      <div className="w-full flex items-center justify-center">
        <Snippet value="npm install monacopilot" className="sm:w-fit w-full" />
      </div>
    </section>
  );
};

const Cursor = () => <span className="absolute">|</span>;

export default Hero;
