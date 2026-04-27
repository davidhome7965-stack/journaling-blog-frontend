// src/components/hero/BenefitsSection.tsx
import RevealOnScroll from '../RevealOnScroll';
import LucideIcon from '../LucideIcon';

const benefitsData = [
  {
    id: 'mental',
    title: 'Mental & Emotional',
    icon: 'HeartPulse',
    iconBg: 'iv',
    textColor: 'var(--cv)',
    points: [
      '20–45% Symptom Reduction across multiple clinical studies.',
      'As Effective as CBT (2006 study) — as effective as cognitive-behavioral therapy.',
      '56.3% in One Month — versus 31.3% in control groups.',
      'Breaks Rumination — externalizes trapped feelings into analyzable words.',
      'Emotional Regulation — 2025 analysis confirmed significant improvement.',
    ],
  },
  {
    id: 'physical',
    title: 'Physical Health',
    icon: 'Activity',
    iconBg: 'ie',
    textColor: 'var(--ce)',
    points: [
      'Faster Wound Healing — NZ study: wrote about feelings, healed faster.',
      'Fewer Sick Days — immune system gets stronger.',
      'Lower Blood Pressure — cortisol drops up to 23%.',
      'Better Sleep — clears mind, fewer disruptions.',
      'Reduced Chronic Pain — fewer inhibited-activity days.',
    ],
  },
  {
    id: 'cognitive',
    title: 'Cognitive & Productivity',
    icon: 'Lightbulb',
    iconBg: 'ia',
    textColor: 'var(--ca)',
    points: [
      'Improved Memory — writing consolidates information more deeply.',
      'Greater Clarity — the fog lifts with pen to paper.',
      'Better Decisions — examine assumptions, identify patterns.',
      'Increased Creativity — bypasses inner critic for original thinking.',
    ],
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight hg leading-[0.95] mb-10">
            The Benefits of Journaling
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit, idx) => (
            <RevealOnScroll key={benefit.id} delay={`d${idx + 1}`}>
              <div className="cd rounded-2xl p-6 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-xl ${benefit.iconBg} flex items-center justify-center mb-5`}>
                  <LucideIcon name={benefit.icon} size={24} style={{ color: benefit.textColor }} />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--tp)' }}>
                  {benefit.title}
                </h3>
                <ul className="space-y-3 flex-1">
                  {benefit.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--ts)' }}>
                      <span className="text-indigo-500 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}