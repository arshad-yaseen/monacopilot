import type {Metadata} from 'next';

import './globals.css';

import ThemeProvider from '@/app/components/theme-provider';
import {font} from '@/app/utils/fonts';
import {cn} from '@/app/utils/misc';

export const metadata: Metadata = {
  title: 'Rich Monaco Editor',
  description:
    'Extended Monaco Editor with AI auto-completion, suggestions, and new themes for React.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.sans.variable, font.mono.variable, 'font-sans')}>
        <ThemeProvider>
          <div className="h-screen relative shadow-inner shadow-background">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:500px_400px] opacity-80"></div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
