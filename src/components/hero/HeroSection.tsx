// src/components/hero/HeroSection.tsx
'use client';

import LucideIcon from '../LucideIcon';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-10 tracking-wide"
          style={{
            background: 'rgba(99, 102, 241, 0.1)',
            color: 'var(--tl)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <span style={{ color: 'var(--cv)' }}>●</span>
          48+ RESEARCH-BACKED TECHNIQUES
        </div>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] mb-8"
          style={{ color: 'var(--tp)' }}
        >
          <span className="font-semibold" style={{ color: 'var(--tp)' }}>Journaling </span>
          {/* Creative styling for "Techniques" */}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Techniques
          </span>
        </h1>
        <p className="text-base sm:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--tm)' }}>
          The complete guide to every method that actually works. Backed by peer-reviewed research. Organized by what you need right now.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#types"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold"
            style={{ background: 'var(--bt)', color: 'var(--bb)', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            EXPLORE ALL 48 TECHNIQUES
            <LucideIcon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#benefits" className="bsn inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium">
            FIND YOUR TECHNIQUE
          </a>
        </div>
      </div>
    </section>
  );
}