import {Space_Grotesk} from 'next/font/google';

import '@/app/globals.css';

const font = Space_Grotesk({subsets: ['latin']});

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
