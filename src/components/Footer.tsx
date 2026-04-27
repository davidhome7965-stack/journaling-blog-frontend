import Link from 'next/link';
import LucideIcon from './LucideIcon';
import { categories } from '@/lib/techniques';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.25)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--cv)' }} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--fth)' }}>Journaling Techniques</span>
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--ftt)' }}>
              The complete guide to every method that actually works. Backed by research.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="fi"><LucideIcon name="Twitter" size={16} /></a>
              <a href="#" className="fi"><LucideIcon name="Instagram" size={16} /></a>
              <a href="#" className="fi"><LucideIcon name="Linkedin" size={16} /></a>
              <a href="#" className="fi"><LucideIcon name="Youtube" size={16} /></a>
            </div>
          </div>

          {/* Techniques */}
          <div>
            <h4 className="fh">Techniques</h4>
            {categories.map(p => (
              <a key={p.id} href="/#types" className="fl">
                Part {p.id}: {p.title} <span style={{ opacity: .4 }}>({p.range})</span>
              </a>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="fh">Resources</h4>
            <a href="/#benefits" className="fl">Benefits of Journaling</a>
            <a href="/#stats" className="fl">Research &amp; Studies</a>
            <a href="/#mental" className="fl">Mental Health</a>
            <a href="/#physical" className="fl">Physical Health</a>
            <a href="/#cognitive" className="fl">Cognitive Benefits</a>
            <a href="/#guide" className="fl">Getting Started</a>
            <Link href="/blog" className="fl">Blog</Link>
          </div>

          {/* Connect */}
          <div>
            <h4 className="fh">Connect</h4>
            <a href="#" className="fl">About Us</a>
            <a href="#" className="fl">Contact</a>
            <a href="#" className="fl">Newsletter</a>
            <a href="#" className="fl">Privacy Policy</a>
            <a href="#" className="fl">Terms of Use</a>
          </div>
        </div>

        <div className="ftbt flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light" style={{ color: 'var(--ftt)' }}>
            &copy; 2026 journalingtechniques.com — All research cited with original sources.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-light" style={{ color: 'var(--ftt)' }}>Made with</span>
            <LucideIcon name="Heart" size={12} style={{ color: 'var(--cr)', fill: 'var(--cr)' }} />
            <span className="text-xs font-light" style={{ color: 'var(--ftt)' }}>for journalers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}