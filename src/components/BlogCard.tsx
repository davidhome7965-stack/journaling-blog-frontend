import Link from 'next/link';
import { BlogPost } from '@/types';
import { stripHtml, truncate, formatDate, readingTime } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const excerpt = post.excerpt || truncate(stripHtml(post.content), 120);
  const time = readingTime(post.content);

  // Check if post has image
  const imgMatch = post.content.match(/<img[^>]+src=["']([^"']+)["']/);
  const featureImage = imgMatch ? imgMatch[1] : null;

  return (
    <Link href={`/blog/${post.slug}`} className="cd rounded-2xl overflow-hidden block group">
      {/* Image */}
      {featureImage && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={featureImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--cvb)', color: 'var(--cv)', border: '1px solid var(--cvd)' }}>
            Blog
          </span>
          <span className="text-xs" style={{ color: 'var(--tm)' }}>{time} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium mb-2 leading-snug group-hover:underline decoration-2 underline-offset-4" style={{ color: 'var(--tp)', textDecorationColor: 'var(--tl)' }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm font-light leading-relaxed mb-5" style={{ color: 'var(--tm)' }}>
          {excerpt}
        </p>

        {/* Bottom meta */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--bc)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full iv flex items-center justify-center">
              <span className="text-[10px] font-semibold" style={{ color: 'var(--cv)' }}>{post.author.charAt(0)}</span>
            </div>
            <span className="text-xs" style={{ color: 'var(--tm)' }}>{post.author}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--tm)' }}>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}