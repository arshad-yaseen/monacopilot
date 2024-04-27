'use client';

import Features from '@/components/features';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-16">
      <Hero />
      <Features />
    </main>
  );
}
