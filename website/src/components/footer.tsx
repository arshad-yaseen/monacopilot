'use client';

import React from 'react';
import Link from 'next/link';

import {
  CREATOR_NAME,
  CREATOR_TWITTER_URL,
  GROQ_HOMEPAGE_URL,
} from '@/app/constants';
import ThemeToggle from '@/components/theme-toggle';

const Footer = () => {
  return (
    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <p className="text-center text-sm leading-loose md:text-left">
          Built with ❤️ by{' '}
          <Link
            href={CREATOR_TWITTER_URL}
            target="_blank"
            rel="noreferrer"
            className="font-normal underline underline-offset-4">
            {CREATOR_NAME}
          </Link>
          . Code completion is made faster by{' '}
          <Link
            href={GROQ_HOMEPAGE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-normal underline underline-offset-4">
            Groq
          </Link>
        </p>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Footer;
