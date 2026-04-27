import { BlogPost, CreatePostInput, UpdatePostInput } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// हेल्पर फंक्शन – सभी API कॉल यहाँ से जाएँगी
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // टोकन लें (अगर मौजूद हो)
  const token = getToken();
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  });

  // 🔥 अगर 401 (Unauthorized) आया तो टोकन expire हो चुका है
  if (res.status === 401) {
    // localStorage से टोकन हटाएँ
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      // यूज़र को लॉगिन पेज पर भेजें (अगर वह पहले से वहाँ नहीं है)
      if (window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
    }
    throw new Error('Session expired. Please login again.');
  }

  if (!res.ok) {
    const e = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
    throw new Error(e.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// टोकन लेने का फंक्शन (क्लाइंट साइड पर ही काम करे)
function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') || '';
}

export const postAPI = {
  getAll: (): Promise<BlogPost[]> => fetchAPI('/posts'),

  getBySlug: (slug: string): Promise<BlogPost> => fetchAPI(`/posts/${slug}`),

  create: (data: CreatePostInput): Promise<BlogPost> => {
    return fetchAPI('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: UpdatePostInput): Promise<BlogPost> => {
    return fetchAPI(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string): Promise<{ message: string }> => {
    return fetchAPI(`/posts/${id}`, {
      method: 'DELETE',
    });
  },
};

export const authAPI = {
  login: (password: string): Promise<{ token: string }> =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
};