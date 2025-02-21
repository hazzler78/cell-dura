import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyAI from '@/components/WhyAI';
import Contact from '@/components/Contact';
import QuantumEntity from '@/components/QuantumEntity';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <WhyAI />
      <Contact />
      <QuantumEntity />
    </main>
  );
} 