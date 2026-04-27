import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import BlogNavbar from '@/components/BlogNavbar';
import { postAPI } from '@/lib/api';
import Link from 'next/link';
import LucideIcon from '@/components/LucideIcon';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog — Journaling Techniques',
  description: 'Articles about journaling techniques, mental health, productivity, and self-discovery.',
};

export const revalidate = 60;

export default async function BlogListPage() {
  let posts = [];
  try {
    posts = await postAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    // If API unavailable, show a friendly message
  }

  return (
    <>
      <BlogNavbar />
      {/* hero and rest of the page */}
      <section className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--cvb)', color: 'var(--cv)', border: '1px solid var(--cvd)' }}>
            <LucideIcon name="BookOpen" size={14} />
            BLOG
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 leading-tight" style={{ color: 'var(--tp)' }}>
            Articles & Guides
          </h1>
          <p className="text-base font-light max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--tm)' }}>
            Deep dives into journaling techniques, research insights, and practical guides for building a lasting practice.
          </p>
        </div>
      </section>

      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="gp rounded-3xl p-12 md:p-16 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl iv flex items-center justify-center mx-auto mb-6">
                  <LucideIcon name="FileText" size={24} />
                </div>
                <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--tp)' }}>No posts yet</h2>
                <p className="text-sm font-light mb-6" style={{ color: 'var(--tm)' }}>
                  Blog posts will appear here once published from the admin panel.
                </p>
                <Link href="/admin" className="bpn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium">
                  Go to Admin
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="ft relative z-10">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-full iv flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--cv)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--fth)' }}>Journaling Techniques</span>
              </div>
              <p className="text-sm font-light leading-relaxed mb-6" style={{ color: 'var(--ftt)' }}>
                The complete guide to every method that actually works. Backed by research.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="fi"><LucideIcon name="Twitter" size={16} /></a>
                <a href="#" className="fi"><LucideIcon name="Instagram" size={16} /></a>
                <a href="#" className="fi"><LucideIcon name="Linkedin" size={16} /></a>
                <a href="#" className="fi"><LucideIcon name="Youtube" size={16} /></a>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="fh">Quick Links</h4>
              <a href="/" className="fl">Homepage</a>
              <a href="/blog" className="fl">All Articles</a>
              <a href="/#types" className="fl">48 Techniques</a>
              <a href="/#guide" className="fl">Getting Started</a>
              <a href="/#benefits" className="fl">Benefits</a>
            </div>
            {/* Categories */}
            <div>
              <h4 className="fh">Categories</h4>
              <a href="/blog" className="fl">All Posts</a>
              <a href="/blog" className="fl">Mental Health</a>
              <a href="/blog" className="fl">Productivity</a>
              <a href="/blog" className="fl">Self-Discovery</a>
              <a href="/blog" className="fl">Beginner Guides</a>
            </div>
            {/* Connect */}
            <div>
              <h4 className="fh">Connect</h4>
              <a href="#" className="fl">About</a>
              <a href="#" className="fl">Contact</a>
              <a href="#" className="fl">Newsletter</a>
              <a href="#" className="fl">Privacy Policy</a>
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
    </>
  );
}