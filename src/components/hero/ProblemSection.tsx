import RevealOnScroll from '../RevealOnScroll';

export default function ProblemSection() {
  return (
    <section className="relative">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="gp rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 pointer-events-none" style={{ background: 'var(--gw1)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <span className="slb mb-6 block">The Real Problem</span>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-6" style={{ color: 'var(--ts)' }}>
                The reason journaling didn&apos;t stick was <span className="font-medium" style={{ color: 'var(--tp)' }}>not a lack of discipline</span>. It was a lack of the <span className="font-medium" style={{ color: 'var(--tl)' }}>right technique</span>.
              </p>
              <p className="text-base font-light leading-relaxed" style={{ color: 'var(--tm)' }}>
                Whether you want to manage anxiety, boost productivity, unlock creativity, or understand yourself better — there is a technique designed for exactly that.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}