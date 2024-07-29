import {Roboto_Mono, Space_Grotesk} from 'next/font/google';

const mono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const font = {
  mono,
};
