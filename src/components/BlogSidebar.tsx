'use client';
import Link from 'next/link';
import { BlogPost } from '@/types';
import LucideIcon from './LucideIcon';

interface BlogSidebarProps {
  author: string;
  recentPosts: BlogPost[];
}

export default function BlogSidebar({ author, recentPosts }: BlogSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-32">
      {/* Author Bio */}
      <div className="gp rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-full iv flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-semibold" style={{ color: 'var(--cv)' }}>
            {author.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--tp)' }}>
          {author}
        </h3>
        <p className="text-sm" style={{ color: 'var(--tm)' }}>
          {author} journaling techniques, mental health, and productivity.
        </p>
      </div>

      {/* Categories (static for now, you can make dynamic later) */}
      <div className="gp rounded-2xl p-6">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--tp)' }}>
          <LucideIcon name="FolderTree" size={18} /> Categories
        </h3>
        <ul className="space-y-2">
          <li><Link href="/blog?category=mental-health" className="text-sm nvl block">Mental Health</Link></li>
          <li><Link href="/blog?category=productivity" className="text-sm nvl block">Productivity</Link></li>
          <li><Link href="/blog?category=self-discovery" className="text-sm nvl block">Self-Discovery</Link></li>
          <li><Link href="/blog?category=beginner-guides" className="text-sm nvl block">Beginner Guides</Link></li>
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="gp rounded-2xl p-6">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--tp)' }}>
          <LucideIcon name="Clock" size={18} /> Recent Posts
        </h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="text-sm nvl block hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}