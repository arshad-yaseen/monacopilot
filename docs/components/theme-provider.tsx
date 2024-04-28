"use client";

import { PropsWithChildren } from "react";

import { ThemeProvider as ThemeProviderBase } from "next-themes";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProviderBase
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
