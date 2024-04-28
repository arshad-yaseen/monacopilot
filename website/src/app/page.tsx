'use client';

import Features from '@/components/features';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import ProudlyOpenSource from '@/components/prodly-os';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 pt-16">
      <Hero />
      <Features />
      <ProudlyOpenSource />
      <Footer />
    </main>
  );
}
