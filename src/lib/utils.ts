import slugify from 'slugify';

export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'en',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function truncate(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}