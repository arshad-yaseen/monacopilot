'use client';

import {PropsWithChildren} from 'react';

import {ThemeProvider as ThemeProviderBase} from 'next-themes';

const ThemeProvider = ({children}: PropsWithChildren) => {
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;

  return (
    <ThemeProviderBase
      attribute="class"
      defaultTheme={isNight ? 'dark' : 'light'}
      disableTransitionOnChange>
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
