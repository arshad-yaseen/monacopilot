'use client';

import Features from '@/app/components/features';
import Footer from '@/app/components/footer';
import Hero from '@/app/components/hero';
import ProudlyOpenSource from '@/app/components/prodly-os';

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
