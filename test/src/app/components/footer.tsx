'use client';

import {usePathname} from 'next/navigation';

import Button from '@/app/components/button';
import {useTourControls} from 'next-tour';

const Footer = () => {
  const {startTour} = useTourControls();
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="w-full flex justify-center items-center bg-white dark:bg-neutral-900 gap-4 py-6 fixed bottom-0 border-t border-t-neutral-200">
      <Button onClick={() => startTour('tour')}>Start Tour</Button>
    </footer>
  );
};

export default Footer;
