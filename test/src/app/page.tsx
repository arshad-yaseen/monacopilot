'use client';

import Link from '@/app/components/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 py-32 px-6">
      <h1 className="sm:text-6xl text-5xl font-bold inline-block tracking-tighter text-center">
        Test onboarding is working
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300 max-w-[600px] text-center text-pretty">
        This is a playground for testing Next Tour. Here you can test and verify
        the tour is completely working as expected.
      </p>
      <div className="max-w-[600px] grid grid-cols-3 gap-4">
        <Link href={'/basic'}>Basic one</Link>
        <Link href={'/'}>Dynamic one</Link>
        <Link href={'/scroll-to-target'}>Scroll to target</Link>
        <Link href={'/'}>Multi-route</Link>
        <Link href={'/'}>Delayed target</Link>
        <Link href={'/'}>Pause and continue</Link>
      </div>
    </main>
  );
}
