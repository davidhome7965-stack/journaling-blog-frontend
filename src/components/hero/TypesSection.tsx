'use client';

import RevealOnScroll from '../RevealOnScroll';
import LucideIcon from '../LucideIcon';
import TechniqueCard from '../TechniqueCard';
import { techniques } from '@/lib/techniques';

export default function TypesSection() {
  return (
    <section id="types" className="relative py-10 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight hg leading-[0.95] mb-6">
            Types of Journaling Techniques
          </h2>
        </RevealOnScroll>
        <RevealOnScroll className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ background: 'var(--cvb)', color: 'var(--cv)', border: '1px solid var(--cvd)' }}>
            <LucideIcon name="Layers" size={14} /> 48 Techniques
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start" style={{ overflowAnchor: 'none' }}>
          {techniques.map(t => (
            <TechniqueCard key={t.id} technique={t} />
          ))}
        </div>
      </div>
    </section>
  );
}