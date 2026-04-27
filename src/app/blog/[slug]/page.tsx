import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { postAPI } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import { BlogPost } from '@/types';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

// 🔹 Static params generation (SSG के लिए)
export async function generateStaticParams() {
  const posts = await postAPI.getAll();
  return posts.map((post) => ({ slug: post.slug }));
}

// 🔹 Related posts helper
function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
  // Match by common tags
  let related = allPosts.filter(
    (post) =>
      post._id !== currentPost._id && post.tags.some((tag) => currentPost.tags.includes(tag))
  );

  // If not enough, fill with recent posts
  if (related.length < limit) {
    const recent = allPosts
      .filter((post) => post._id !== currentPost._id && !related.includes(post))
      .slice(0, limit - related.length);
    related = [...related, ...recent];
  }

  return related.slice(0, limit);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await postAPI.getBySlug(slug);
    return {
      title: `${post.title} | Journaling Techniques`,
      description: post.excerpt || stripHtml(post.content).slice(0, 160),
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  let allPosts: BlogPost[] = [];

  try {
    // Parallel fetch
    [post, allPosts] = await Promise.all([postAPI.getBySlug(slug), postAPI.getAll()]);
    if (!post) return notFound();
  } catch {
    return notFound();
  }

  const relatedPosts = getRelatedPosts(post, allPosts, 3);
  const recentPosts = allPosts
    .filter((p) => p._id !== post._id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} recentPosts={recentPosts} />;
}