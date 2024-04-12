import type {Metadata} from 'next';
import {Space_Grotesk} from 'next/font/google';

import '@/app/globals.css';

const font = Space_Grotesk({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Next Tour Test',
  description: 'Test for Next Tour',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-screen flex justify-center ${font.className}`}>
        {children}
      </body>
    </html>
  );
}
