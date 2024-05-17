import {Roboto_Mono, Space_Grotesk} from 'next/font/google';

const sans = Space_Grotesk({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const font = {
  sans,
  mono,
};
