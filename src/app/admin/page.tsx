'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { BlogPost } from '@/types';
import { postAPI, authAPI } from '@/lib/api';
import { generateSlug, stripHtml, truncate, formatDate } from '@/lib/utils';
import LucideIcon from '@/components/LucideIcon';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

// Quill formats
const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'blockquote', 'code-block', 'link', 'image'
];

type View = 'login' | 'list' | 'form';

export default function AdminPage() {
  const [view, setView] = useState<View>('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', author: '', tags: '' });
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef<any>(null);
  const quillEditorRef = useRef<any>(null); // Direct editor reference
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await postAPI.getAll();
      setPosts(data);
    } catch {
      setError('Failed to load posts');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setView('list');
      fetchPosts();
    }
  }, [fetchPosts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authAPI.login(password);
      localStorage.setItem('admin_token', data.token);
      setView('list');
      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setView('login');
    setPassword('');
  };

  const handleTitleChange = (title: string) => {
    setForm(f => ({ ...f, title, slug: generateSlug(title) }));
  };

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', author: '', tags: '' });
    setEditingId(null);
  };

  // ✅ Image upload handler - uses direct editor reference
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/upload/image`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        const imageUrl = `${API_URL}${data.url}`;

        // Use the stored editor instance
        const editor = quillEditorRef.current;
        if (!editor) {
          throw new Error('Editor not initialized');
        }

        let range = editor.getSelection(true);
        if (!range) {
          // If no selection, insert at end
          range = { index: editor.getLength(), length: 0 };
        }
        editor.insertEmbed(range.index, 'image', imageUrl);
        editor.setSelection(range.index + 1, 0);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Image upload failed. Please try again.');
      } finally {
        setIsUploading(false);
      }
    };
  };

  // Quill modules with custom image handler
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content || form.content === '<p><br></p>') {
      setError('Content is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        author: form.author || 'Admin',
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (editingId) {
        await postAPI.update(editingId, payload);
      } else {
        await postAPI.create(payload);
      }
      resetForm();
      setView('list');
      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post._id);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      tags: post.tags.join(', '),
    });
    setView('form');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Kya aap sure ho ki ye post delete karna hai?')) return;
    try {
      await postAPI.delete(id);
      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  // ========== LOGIN VIEW ==========
  if (view === 'login') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="gp rounded-3xl p-8 md:p-12 w-full max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl iv flex items-center justify-center">
              <LucideIcon name="Lock" size={20} />
            </div>
            <h1 className="text-xl font-medium" style={{ color: 'var(--tp)' }}>Admin Login</h1>
          </div>
          <p className="text-sm font-light mb-8" style={{ color: 'var(--tm)' }}>
            Enter your password to access the admin panel.
          </p>
          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm font-light mb-4 outline-none focus:ring-2"
              style={{ background: 'var(--bgch)', border: '1px solid var(--bc)', color: 'var(--tp)' }}
              placeholder="Enter admin password"
              required
            />
            {error && <p className="text-sm mb-4" style={{ color: 'var(--cr)' }}>{error}</p>}
            <button type="submit" className="bpn w-full px-6 py-3 rounded-xl text-sm font-medium">
              Sign In
            </button>
          </form>
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--bc)' }}>
            <a href="/" className="text-sm nvl px-3 py-2 rounded-full inline-flex items-center gap-2">
              <LucideIcon name="ArrowLeft" size={14} /> Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ========== FORM VIEW (Create/Edit) ==========
  if (view === 'form') {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => { resetForm(); setView('list'); }} className="nvl px-3 py-2 rounded-full">
              <LucideIcon name="ArrowLeft" size={16} />
            </button>
            <h1 className="text-2xl font-medium" style={{ color: 'var(--tp)' }}>
              {editingId ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>
          <button onClick={handleLogout} className="bsn px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <LucideIcon name="LogOut" size={14} /> Logout
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl text-sm flex items-center gap-2" style={{ background: 'var(--crb)', color: 'var(--cr)', border: '1px solid var(--crd)' }}>
              <LucideIcon name="AlertCircle" size={16} /> {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-light outline-none focus:ring-2"
                style={{ background: 'var(--bgch)', border: '1px solid var(--bc)', color: 'var(--tp)' }}
                placeholder="e.g. How Gratitude Journaling Changed My Life"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Slug * (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm font-light outline-none focus:ring-2"
                style={{ background: 'var(--bgch)', border: '1px solid var(--bc)', color: 'var(--tp)' }}
                placeholder="auto-generated-from-title"
                required
              />
              <p className="text-xs mt-1.5" style={{ color: 'var(--tm)' }}>
                URL will be: /blog/{form.slug || 'your-slug'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm font-light outline-none focus:ring-2"
                style={{ background: 'var(--bgch)', border: '1px solid var(--bc)', color: 'var(--tp)' }}
                placeholder="Admin"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm font-light outline-none focus:ring-2"
                style={{ background: 'var(--bgch)', border: '1px solid var(--bc)', color: 'var(--tp)' }}
                placeholder="journaling, mental-health, anxiety"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: 'var(--ts)' }}>Content * (Rich Text)</label>
            {mounted && (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--bc)' }}>
                {isUploading && (
                  <div className="text-sm py-2 px-3 bg-gray-100 text-gray-600">
                    Uploading image...
                  </div>
                )}
                {/* @ts-ignore - react-quill-new supports ref but types are incomplete */}
                <ReactQuill
                  ref={(el) => {
                    if (el) {
                      quillRef.current = el;
                      // Store the actual Quill editor instance
                      quillEditorRef.current = el.getEditor();
                    }
                  }}
                  theme="snow"
                  value={form.content}
                  onChange={val => setForm(f => ({ ...f, content: val }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog post content here..."
                  style={{ background: 'var(--bgc)', minHeight: '300px' }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--bc)' }}>
            <button type="submit" disabled={saving} className="bpn px-8 py-3.5 rounded-xl text-sm font-medium disabled:opacity-50 inline-flex items-center gap-2">
              <LucideIcon name={saving ? 'Loader' : (editingId ? 'Save' : 'Send')} size={16} />
              {saving ? 'Saving...' : (editingId ? 'Update Post' : 'Publish Post')}
            </button>
            <button type="button" onClick={() => { resetForm(); setView('list'); }} className="bsn px-6 py-3.5 rounded-xl text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ========== LIST VIEW ==========
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium mb-1" style={{ color: 'var(--tp)' }}>All Posts</h1>
          <p className="text-sm" style={{ color: 'var(--tm)' }}>{posts.length} total posts</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/blog" target="_blank" className="bsn px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <LucideIcon name="ExternalLink" size={14} /> View Blog
          </a>
          <button onClick={() => { resetForm(); setView('form'); }} className="bpn px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <LucideIcon name="Plus" size={16} /> New Post
          </button>
          <button onClick={handleLogout} className="bsn px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <LucideIcon name="LogOut" size={14} /> Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl text-sm mb-6 flex items-center gap-2" style={{ background: 'var(--crb)', color: 'var(--cr)', border: '1px solid var(--crd)' }}>
          <LucideIcon name="AlertCircle" size={16} /> {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="gp rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-2xl iv flex items-center justify-center mx-auto mb-4">
            <LucideIcon name="FileText" size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--tp)' }}>No posts yet</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--tm)' }}>Create your first blog post to get started.</p>
          <button onClick={() => { resetForm(); setView('form'); }} className="bpn px-6 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <LucideIcon name="Plus" size={16} /> Create First Post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post._id} className="gp rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium mb-1 truncate" style={{ color: 'var(--tp)' }}>{post.title}</h3>
                <p className="text-sm font-light truncate mb-2" style={{ color: 'var(--tm)' }}>
                  {truncate(stripHtml(post.content), 100)}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--tm)' }}>
                  <span>{post.author}</span>
                  <span>{formatDate(post.createdAt)}</span>
                  <span>/blog/{post.slug}</span>
                  {post.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      {post.tags.slice(0, 2).map(t => (
                        <span key={t} className="tg">{t}</span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="nvl px-3 py-2 rounded-lg text-xs inline-flex items-center gap-1.5"
                >
                  <LucideIcon name="Eye" size={14} /> View
                </a>
                <button
                  onClick={() => handleEdit(post)}
                  className="nvl px-3 py-2 rounded-lg text-xs inline-flex items-center gap-1.5"
                  style={{ color: 'var(--cv)' }}
                >
                  <LucideIcon name="Pencil" size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="nvl px-3 py-2 rounded-lg text-xs inline-flex items-center gap-1.5"
                  style={{ color: 'var(--cr)' }}
                >
                  <LucideIcon name="Trash2" size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
