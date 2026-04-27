'use client';

import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/BlogSidebar';
import { BlogPost } from '@/types';
import { formatDate, readingTime } from '@/lib/utils';
import LucideIcon from '@/components/LucideIcon';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  recentPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts, recentPosts }: BlogPostClientProps) {
  const time = readingTime(post.content);

  // Decode HTML entities
  function decodeHtml(html: string) {
    if (!html) return '';
    return html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  const rawContent = decodeHtml(post.content);

  // Extract images safely using DOM parser
  const blocks: { type: 'text' | 'image'; content: string; src?: string; alt?: string }[] = [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawContent;
  const imgElements = tempDiv.querySelectorAll('img');

  let lastIndex = 0;
  imgElements.forEach((img) => {
    const imgHtml = img.outerHTML;
    const imgIndex = rawContent.indexOf(imgHtml, lastIndex);
    if (imgIndex !== -1) {
      const textBefore = rawContent.slice(lastIndex, imgIndex);
      if (textBefore.trim()) {
        blocks.push({ type: 'text', content: textBefore.trim() });
      }
      blocks.push({
        type: 'image',
        content: imgHtml,
        src: img.src,
        alt: img.alt || post.title,
      });
      lastIndex = imgIndex + imgHtml.length;
    }
  });

  const remainingText = rawContent.slice(lastIndex);
  if (remainingText.trim()) {
    blocks.push({ type: 'text', content: remainingText.trim() });
  }
  if (blocks.length === 0) {
    blocks.push({ type: 'text', content: rawContent });
  }

  const hasImages = blocks.some((b) => b.type === 'image');

  return (
    <>
      <BlogNavbar />
      <main className="relative z-10 min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Two column grid: content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: blog content */}
            <article className="lg:col-span-8">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-light mb-10 nvl px-3 py-2 rounded-full"
              >
                <LucideIcon name="ArrowLeft" size={16} /> Back to Blog
              </Link>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{
                        background: 'var(--cvb)',
                        color: 'var(--cv)',
                        border: '1px solid var(--cvd)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6"
                style={{ color: 'var(--tp)' }}
              >
                {post.title}
              </h1>

              {/* Author & meta */}
              <div
                className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 pb-8"
                style={{ borderBottom: '1px solid var(--bc)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full iv flex items-center justify-center">
                    <span className="text-xs font-semibold" style={{ color: 'var(--cv)' }}>
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--tp)' }}>
                    {post.author}
                  </p>
                </div>
                <span style={{ color: 'var(--bc)' }}>·</span>
                <span className="text-sm" style={{ color: 'var(--tm)' }}>
                  {formatDate(post.createdAt)}
                </span>
                <span style={{ color: 'var(--bc)' }}>·</span>
                <span className="text-sm" style={{ color: 'var(--tm)' }}>
                  {time} min read
                </span>
              </div>

              {/* Blog content with images */}
              <div className="space-y-0">
                {blocks.map((block, index) => {
                  if (block.type === 'image') {
                    const isFirst = index === 1;
                    return (
                      <div key={index} className={isFirst ? 'my-8 md:my-10' : 'my-6 md:my-8'}>
                        <div
                          className={`overflow-hidden ${isFirst ? 'rounded-2xl' : 'rounded-xl'}`}
                          style={{ border: '1px solid var(--bc)' }}
                        >
                          <img
                            src={block.src}
                            alt={block.alt}
                            className="w-full h-auto"
                            style={
                              isFirst ? { maxHeight: '460px', objectFit: 'cover' } : { objectFit: 'cover' }
                            }
                            loading="lazy"
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className="blog-content my-4 md:my-6"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  );
                })}
              </div>

              {/* Image gallery */}
              {hasImages && (
                <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--bc)' }}>
                  <h3 className="text-sm font-medium mb-5" style={{ color: 'var(--tm)' }}>
                    <LucideIcon name="Images" size={14} className="inline mr-1.5" />
                    Photos in this article
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {blocks
                      .filter((b) => b.type === 'image')
                      .map((img, i) => (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden aspect-[4/3]"
                          style={{ border: '1px solid var(--bc)' }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Bottom bar */}
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--bc)' }}>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs font-medium mr-2" style={{ color: 'var(--tm)' }}>
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tg">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="bsn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                  >
                    <LucideIcon name="ArrowLeft" size={16} /> All Articles
                  </Link>
                  <button
                    onClick={() => {
                      if (navigator.share)
                        navigator.share({ title: post.title, url: window.location.href });
                    }}
                    className="bsn inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
                  >
                    <LucideIcon name="Share2" size={16} /> Share
                  </button>
                </div>
              </div>
            </article>

            {/* RIGHT: Sidebar */}
            <aside className="lg:col-span-4">
              <BlogSidebar author={post.author} recentPosts={recentPosts} />
            </aside>
          </div>

          {/* More to read (Related Posts) */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-10" style={{ borderTop: '1px solid var(--bc)' }}>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: 'var(--tp)' }}>
                More to read
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <div className="gp rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <h3
                        className="font-medium mb-2 group-hover:text-indigo-500 transition"
                        style={{ color: 'var(--tp)' }}
                      >
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--tm)' }}>
                        {formatDate(relatedPost.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}