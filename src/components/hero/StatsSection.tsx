import RevealOnScroll from '../RevealOnScroll';
import AnimatedCounter from '../AnimatedCounter';

const stats = [
  { target: 45, suffix: '%', label: 'Anxiety & depression reduction' },
  { target: 56.3, suffix: '%', label: 'Better mental health in one month' },
  { target: 23, suffix: '%', label: 'Drop in cortisol levels' },
  { target: 9, suffix: '%', label: 'Anxiety reduction (2022 review)' },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-5 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll className="text-center mb-14">
          {/* <span className="slb mb-4 block">By The Numbers</span> */}
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight" style={{ color: 'var(--tp)' }}>What Research Shows</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={`d${i + 1}`}>
              <div className="cd rounded-2xl p-6 md:p-8 text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} className="sn text-4xl md:text-5xl font-semibold tracking-tight mb-2" />
                <p className="text-xs md:text-sm font-light" style={{ color: 'var(--tm)' }}>{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}