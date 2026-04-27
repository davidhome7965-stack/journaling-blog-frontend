import RevealOnScroll from '../RevealOnScroll';
import LucideIcon from '../LucideIcon';

export default function WhatIsSection() {
  return (
    <section id="what-is" className="relative py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight hg leading-[0.95]">
            What Is Journaling &amp; Why Does It Work?
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RevealOnScroll delay="d1">
            <div className="cd rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl iv flex items-center justify-center mb-5"><LucideIcon name="Feather" size={20} /></div>
              <h3 className="text-base font-medium mb-3" style={{ color: 'var(--tp)' }}>The Practice</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>Writing down thoughts, feelings, experiences regularly — barely scratches the surface of what it does inside your brain.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay="d2">
            <div className="cd rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl iv flex items-center justify-center mb-5"><LucideIcon name="Brain" size={20} /></div>
              <h3 className="text-base font-medium mb-3" style={{ color: 'var(--tp)' }}>The Neuroscience</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>Activates the <span style={{ color: 'var(--ts)' }}>prefrontal cortex</span> while reducing <span style={{ color: 'var(--ts)' }}>amygdala</span> activity — calms anxiety, activates rational thinking.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay="d3">
            <div className="cd rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl iv flex items-center justify-center mb-5"><LucideIcon name="Microscope" size={20} /></div>
              <h3 className="text-base font-medium mb-3" style={{ color: 'var(--tp)' }}>Pennebaker&apos;s Research</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>Decades at UT Austin — writing about difficult experiences organizes chaotic thoughts — replicated hundreds of times.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay="d4">
            <div className="cd rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl iv flex items-center justify-center mb-5"><LucideIcon name="Settings" size={20} /></div>
              <h3 className="text-base font-medium mb-3" style={{ color: 'var(--tp)' }}>The Mechanism</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>Structured approaches to <span style={{ color: 'var(--ts)' }}>changing how your brain processes</span> emotions — not just ways to fill a page.</p>
            </div>
          </RevealOnScroll>
        </div>
        <RevealOnScroll className="mt-16">
          <div className="rounded-r-2xl pl-8 pr-8 py-8 md:pl-12 md:py-10 gp" style={{ borderLeft: '3px solid var(--bq)' }}>
            <p className="text-base md:text-lg font-light leading-relaxed italic mb-4" style={{ color: 'var(--ts)' }}>
              &ldquo;Writing about emotional experiences helps process traumatic events by organizing chaotic thoughts and releasing pent-up emotions, leading to improved mental clarity and resilience.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full iv flex items-center justify-center"><LucideIcon name="User" size={16} /></div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--tp)' }}>Dr. James Pennebaker</p>
                <p className="text-xs" style={{ color: 'var(--tm)' }}>University of Texas at Austin</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}