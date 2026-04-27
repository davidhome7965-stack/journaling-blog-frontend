import RevealOnScroll from '../RevealOnScroll';
import LucideIcon from '../LucideIcon';
import FaqItem from '../FaqItem';

const faqs = [
  { q: 'How long should a journal entry be?', a: 'As long as it needs to be. Some of the most powerful entries are three sentences. Some are ten pages. The question is not length but honesty. A short, truthful entry will always produce more insight than a long, performative one.' },
  { q: 'Do I have to write every day?', a: 'No. Research shows consistency over time matters more than daily frequency. Three to four times per week produces significant benefits. What matters is writing regularly enough to build a reflective habit.' },
  { q: "What if I don't know what to write?", a: 'Use a prompt. Or simply write: "Right now I don\'t know what to write, and the reason is probably…" and let whatever follows surprise you. The blank page is a starting point, not a wall.' },
  { q: 'Is digital journaling as effective as paper?', a: 'Handwriting may have a slight edge for emotional processing due to different neural pathways. But digital journaling is far more effective than not journaling at all. Consistency always beats format.' },
  { q: 'Should I reread old entries?', a: 'Yes, periodically. Rereading reveals patterns, shows growth, and surfaces recurring themes. Entries from a year ago provide perspective nothing else can. For Morning Pages, don\'t reread until several weeks have accumulated.' },
  { q: 'Can journaling replace therapy?', a: 'No. Journaling is a powerful complement to therapy and a valuable standalone practice for general mental health. But for serious conditions, trauma, or crisis, professional support is not replaceable.' },
  { q: 'Which technique is best for beginners?', a: 'Gratitude journaling. Simple, less than five minutes, immediate positive effects, and builds a foundation that makes other techniques easier to sustain. Do it consistently for 30 days, then explore.' },
];

export default function GuideSection() {
  return (
    <section id="guide" className="relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight hg leading-[0.95] mb-3">
            How to Start a Journaling Practice
          </h2>
          <p className="text-base font-light max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--tm)' }}>
            Every experienced journaler started exactly where you are now: staring at a blank notebook with good intentions and no idea what to write.
          </p>
        </RevealOnScroll>

        {/* Step 1 */}
        <RevealOnScroll className="mb-6">
          <div className="gp rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl iv flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold" style={{ color: 'var(--cv)' }}>01</span></div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight" style={{ color: 'var(--tp)' }}>Choose Your Format First</h3>
            </div>
            <p className="text-base font-light leading-relaxed mb-8" style={{ color: 'var(--ts)' }}>Before you think about what to write, decide where to write. The best format is whichever one you will actually use consistently.</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl p-6" style={{ background: 'var(--bgch)', border: '1px solid var(--bc)' }}>
                <div className="flex items-center gap-3 mb-4"><LucideIcon name="PenTool" size={20} style={{ color: 'var(--cv)' }} /><h4 className="text-sm font-medium" style={{ color: 'var(--tp)' }}>Paper Journaling</h4></div>
                <ul className="space-y-2.5">
                  {['Feels more personal and private', 'Handwriting activates different neural pathways', 'Tactile experience slows you down — beneficial for emotional processing', 'No notifications, no distractions'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--cv)', opacity: .5 }} /><span className="text-sm font-light" style={{ color: 'var(--tm)' }}>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-6" style={{ background: 'var(--bgch)', border: '1px solid var(--bc)' }}>
                <div className="flex items-center gap-3 mb-4"><LucideIcon name="Smartphone" size={20} style={{ color: 'var(--ce)' }} /><h4 className="text-sm font-medium" style={{ color: 'var(--tp)' }}>Digital Journaling</h4></div>
                <ul className="space-y-2.5">
                  {['Faster, more searchable, always accessible', 'Password-protected privacy', 'Apps like Day One, Reflectly, Notion offer prompts and mood tracking', 'Always readable — no handwriting issues'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--ce)', opacity: .5 }} /><span className="text-sm font-light" style={{ color: 'var(--tm)' }}>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Steps 2-4 */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {[
            { num: '02', cls: 'iv', color: 'var(--cv)', title: 'Start Smaller Than Necessary', desc: 'Three sentences. That\'s it. "What is on my mind right now?" That is a complete session. As the habit solidifies, you\'ll naturally write more.' },
            { num: '03', cls: 'ie', color: 'var(--ce)', title: 'One Technique for 30 Days', desc: 'Gratitude Monday, Morning Pages Tuesday, bullet Wednesday — none ever have time to work. One technique, 30 days, beats a month of variety.' },
            { num: '04', cls: 'ia', color: 'var(--ca)', title: 'Tie It to an Existing Habit', desc: 'Journal with morning coffee. Write before brushing teeth. Open it after your commute. The existing habit pulls the new one along.' },
          ].map((step, i) => (
            <RevealOnScroll key={i} delay={`d${i + 1}`}>
              <div className="cd rounded-2xl p-7">
                <div className={`w-10 h-10 rounded-xl ${step.cls} flex items-center justify-center mb-5`}><span className="text-sm font-semibold" style={{ color: step.color }}>{step.num}</span></div>
                <h3 className="text-base font-medium mb-3" style={{ color: 'var(--tp)' }}>{step.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>{step.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* Prompts */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">Prompts for Every Mood and Goal</h2>
        </RevealOnScroll>

        {[
          { icon: 'CloudLightning', cls: 'iv', title: 'Anxiety & Stress', prompts: ['What is the specific thing I am most worried about right now? How likely is it to actually happen?', 'If my best friend were feeling exactly what I am feeling, what would I tell them?', 'What is one thing I can control about this situation, and one thing I cannot?', 'Write about the worst case scenario in detail. Then write about how you would survive and recover from it.', 'What has gotten me through difficult times before? What strength in me handled it?'] },
          { icon: 'Search', cls: 'ie', title: 'Self-Discovery', prompts: ['What does a life well-lived look like to me, not to anyone else?', 'What am I pretending not to know about myself?', 'Which version of myself shows up when no one is watching?', 'What would I do if I knew I could not fail and no one would judge me?', 'What patterns keep repeating in my life? What might they be trying to teach me?'] },
          { icon: 'Heart', cls: 'ir', title: 'Grief & Loss', prompts: ['Write a letter to what or who you have lost. Say everything you never got to say.', 'What did this person, relationship, or experience give you that you are still carrying?', 'What does grief feel like in your body right now? Describe it physically, not emotionally.', 'What is one memory you want to hold onto forever?', 'What part of yourself is still intact, even after this loss?'] },
        ].map((section, i) => (
          <RevealOnScroll key={i} className="mb-4">
            <div className="gp rounded-2xl p-7 md:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-lg ${section.cls} flex items-center justify-center`}><LucideIcon name={section.icon} size={16} /></div>
                <h3 className="text-lg font-medium" style={{ color: 'var(--tp)' }}>{section.title}</h3>
              </div>
              <div className="space-y-3.5">
                {section.prompts.map((p, j) => (
                  <p key={j} className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}><span style={{ color: 'var(--ts)' }}>{j + 1}.</span> {p}</p>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            { icon: 'Target', cls: 'ia', title: 'Productivity & Goals', prompts: ['What does success look like for me in the next 90 days?', 'What is the one thing I keep putting off that would make everything else easier?', 'What would my future self thank me for doing today?', 'What belief about myself is holding back my progress?', "Write about a time you achieved something you weren't sure you could."] },
            { icon: 'Sun', cls: 'iv', title: 'Gratitude', prompts: ['Write about one small thing from today you almost missed being grateful for.', 'What challenge in your past are you now grateful happened?', 'What does your ordinary Tuesday contain that would feel like luxury to a previous version of you?', 'What ability or quality in yourself are you most grateful for today?', 'Write about a person who shaped you positively. What specifically?'] },
          ].map((section, i) => (
            <RevealOnScroll key={i}>
              <div className="gp rounded-2xl p-7 md:p-9">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg ${section.cls} flex items-center justify-center`}><LucideIcon name={section.icon} size={16} /></div>
                  <h3 className="text-lg font-medium" style={{ color: 'var(--tp)' }}>{section.title}</h3>
                </div>
                <div className="space-y-3.5">
                  {section.prompts.map((p, j) => (
                    <p key={j} className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}><span style={{ color: 'var(--ts)' }}>{j + 1}.</span> {p}</p>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* Best Time & Place */}
        <RevealOnScroll className="text-center mb-12">
          <span className="slb mb-4 block">When &amp; Where</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">Best Time and Place to Journal</h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            { icon: 'Sunrise', color: 'var(--ca)', title: 'Morning', desc: 'Mind is fresh, day hasn\'t accumulated stress. What you write shapes how you approach the hours ahead. More proactive and forward-looking.' },
            { icon: 'Sunset', color: 'var(--cp)', title: 'Evening', desc: 'Process the day, release residual stress, arrive at sleep with a clearer mind. Gratitude before bed improves sleep quality consistently.' },
            { icon: 'Zap', color: 'var(--cr)', title: 'On-Demand', desc: 'When overwhelmed, confused, angry, or exceptionally joyful. Captures something raw that scheduled writing often misses.' },
          ].map((item, i) => (
            <RevealOnScroll key={i}>
              <div className="cd rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-4"><LucideIcon name={item.icon} size={20} style={{ color: item.color }} /><h4 className="text-sm font-medium" style={{ color: 'var(--tp)' }}>{item.title}</h4></div>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll>
          <div className="rounded-2xl pl-8 pr-8 py-7 md:pl-10 gp" style={{ borderLeft: '3px solid var(--bq)' }}>
            <div className="flex items-start gap-3">
              <LucideIcon name="MapPin" size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cv)' }} />
              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--tp)' }}>Choosing Your Space</h4>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>Quiet, comfortable, no notifications, enough privacy for honesty. Many find that a regular spot becomes associated with the reflective state. Over time, going there becomes a signal to your brain to slow down.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* Digital vs Paper */}
        <RevealOnScroll className="text-center mb-12">
          <span className="slb mb-4 block">The Debate</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">Digital vs. Paper: Which Is Actually Better?</h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            { icon: 'PenTool', cls: 'iv', bgVar: 'var(--cvb)', color: 'var(--cv)', title: 'The Case for Paper', points: ['Neurological engagement — handwriting activates different neural pathways. Stronger connection between thought and expression.', 'Zero distractions — No notifications. No social media. Fully in the experience.', 'True privacy — A notebook in a drawer is fundamentally more secure than anything on a device.', 'Tactile ritual — Choosing a pen, feeling paper, hearing the scratch — enhances the reflective state.'] },
            { icon: 'Smartphone', cls: 'ie', bgVar: 'var(--ceb)', color: 'var(--ce)', title: 'The Case for Digital', points: ['Always accessible — Your phone is always with you. Capture insights immediately.', 'Searchable — Find every mention of a feeling, relationship, or project in seconds.', 'Guided features — Daily prompts, mood tracking, streak counters, reminders built in.', 'Always readable — Not everyone can read their own handwriting. Digital solves this.'] },
          ].map((side, i) => (
            <RevealOnScroll key={i}>
              <div className="cd rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${side.cls} flex items-center justify-center`}><LucideIcon name={side.icon} size={20} /></div>
                  <h3 className="text-lg font-medium" style={{ color: 'var(--tp)' }}>{side.title}</h3>
                </div>
                <ul className="space-y-4">
                  {side.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: side.bgVar }}><LucideIcon name="Check" size={12} style={{ color: side.color }} /></span>
                      <div><span className="text-sm font-light" style={{ color: 'var(--tm)' }}>{point}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll>
          <div className="rounded-2xl p-6 md:p-8 gp text-center">
            <p className="text-base font-light leading-relaxed" style={{ color: 'var(--ts)' }}>Consistency matters far more than medium. <span className="font-medium" style={{ color: 'var(--tp)' }}>An imperfect journaling habit is infinitely better than a perfect journaling plan that never happens.</span></p>
          </div>
        </RevealOnScroll>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* Common Mistakes */}
        <RevealOnScroll className="text-center mb-12">
          <span className="slb mb-4 block">Avoid These</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">Common Mistakes and How to Fix Them</h2>
        </RevealOnScroll>
        <div className="space-y-4 mb-4">
          {[
            { title: 'Treating Your Journal Like a To-Do List', desc: "Recording tasks is useful, but if that's all you do, you're missing most of what journaling is designed for. Your journal should contain your inner life — reactions, interpretations, questions, feelings.", fix: 'End every practical entry with "How I feel about all of this is…"' },
            { title: 'Writing What You Think You Should Feel', desc: "Journaling for an imagined audience kills the authenticity that makes it work. If your entries sound noble and presentable rather than true, you're writing for someone else.", fix: 'Start with "What I\'m not saying in this journal is…"' },
            { title: 'Quitting After Missing a Few Days', desc: 'Missing days is not failure. Five days a week for a year beats three intensive weeks then stopping entirely because you missed Tuesday.', fix: 'Write "I haven\'t written in a while, and here\'s where I am" and go.' },
            { title: 'Always Using the Same Technique', desc: 'If your practice feels flat or repetitive, using the exact same approach is part of the problem. Different techniques unlock different kinds of insight.', fix: 'Every month or two, try one technique you\'ve never used before.' },
            { title: 'Ruminating Instead of Processing', desc: 'Writing the same complaint over and over without moving toward insight is not therapeutic — it\'s just rumination on paper.', fix: 'Always add "What does this mean to me?" and "What can I do now?"' },
          ].map((mistake, i) => (
            <RevealOnScroll key={i}>
              <div className="gp rounded-2xl p-7 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--crb)', border: '1px solid var(--crd)' }}>
                    <span className="text-xs font-bold" style={{ color: 'var(--cr)' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium mb-2" style={{ color: 'var(--tp)' }}>{mistake.title}</h4>
                    <p className="text-sm font-light leading-relaxed mb-3" style={{ color: 'var(--tm)' }}>{mistake.desc}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--ceb)', color: 'var(--ce)', border: '1px solid var(--ced)' }}>
                      <LucideIcon name="Wrench" size={12} /> Fix: {mistake.fix}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* How to Stay Consistent */}
        <RevealOnScroll className="text-center mb-12">
          <span className="slb mb-4 block">The Hard Part</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">How to Stay Consistent</h2>
        </RevealOnScroll>
        <div className="space-y-3 mb-4">
          {[
            { title: 'Start with two minutes', desc: 'Not twenty. Not ten. Two. Set a timer. Once two minutes feels easy, move to five. Building slowly means you never face a commitment that feels too big.' },
            { title: 'Reduce friction to near zero', desc: 'Journal on your nightstand the night before. App on home screen. The fewer steps between you and the journal, the more likely you open it.' },
            { title: "Track your streak, but don't worship it", desc: 'A simple habit tracker creates visual motivation. But the moment a broken streak becomes a reason to quit, it\'s working against you.' },
            { title: 'Vary your technique when motivation drops', desc: 'When it feels like a chore, introduce a new approach from this guide. Novelty restores engagement.' },
            { title: 'Connect it to your identity', desc: 'Not "I am trying to journal" but "I am someone who reflects on my experiences." Identity-based habits are the most durable.' },
            { title: 'Be honest about what kind of journaler you are', desc: 'Some thrive daily. Others are naturally periodic — deeply a few times a week. Neither is wrong. The best practice fits your actual life.' },
          ].map((item, i) => (
            <RevealOnScroll key={i}>
              <div className="gp rounded-2xl p-6 md:p-8 flex items-start gap-5">
                <span className="text-3xl font-semibold sn flex-shrink-0 leading-none mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="text-base font-medium mb-2" style={{ color: 'var(--tp)' }}>{item.title}</h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>{item.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="lg-divider max-w-4xl mx-auto my-16" />

        {/* FAQ */}
        <RevealOnScroll className="text-center mb-12">
          <span className="slb mb-4 block">Questions</span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight hg leading-[0.95]">Frequently Asked Questions</h2>
        </RevealOnScroll>
        <div className="space-y-3 mb-4">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i}>
              <FaqItem question={faq.q} answer={faq.a} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Final Takeaway */}
        <RevealOnScroll className="mt-16 mb-20">
          <div className="gp rounded-3xl p-10 md:p-14 relative overflow-hidden text-center">
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, var(--gw1), transparent, var(--gw2))' }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 leading-tight" style={{ color: 'var(--tp)' }}>Final Takeaway</h2>
              <p className="text-base font-light leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: 'var(--ts)' }}>
                Journaling techniques are not about filling pages. They are about building a relationship with yourself that becomes one of the most reliable resources you have.
              </p>
              <p className="text-base font-light leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: 'var(--tm)' }}>
                You don&apos;t need a perfect notebook, a dedicated hour, or a particularly articulate way with words. You need a willingness to be honest, a commitment to showing up regularly even when it feels pointless, and the knowledge that every page you fill is a conversation with yourself that no one else can have for you.
              </p>
              <p className="text-lg font-medium" style={{ color: 'var(--tp)' }}>Pick one technique. Start tomorrow. Write three sentences. See what happens.</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}