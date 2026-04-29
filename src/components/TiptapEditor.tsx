'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// इमेज अपलोड फंक्शन
const uploadImageFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return `${API_URL}${data.url}`;
};

// कस्टम इमेज हैंडलर (ड्रैग/ड्रॉप और पेस्ट के लिए)
import { Plugin, PluginKey } from '@tiptap/pm/state';

const imageUploadPlugin = (getToken: () => string | null) => {
  return new Plugin({
    key: new PluginKey('image-upload'),
    props: {
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) handleImageUpload(file, view, getToken);
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const hasFiles = event.dataTransfer?.files?.length;
        if (!hasFiles) return false;
        const images = Array.from(event.dataTransfer.files).filter(f => /image/i.test(f.type));
        if (images.length === 0) return false;
        event.preventDefault();
        images.forEach(file => handleImageUpload(file, view, getToken));
        return true;
      },
    },
  });
};

const handleImageUpload = async (file: File, view: any, getToken: () => string | null) => {
  const token = getToken();
  if (!token) return;
  // एक अस्थायी प्लेसहोल्डर इमेज डालें
  const placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-size="12" text-anchor="middle" dy=".3em" fill="%23999"%3EUploading...%3C/text%3E%3C/svg%3E';
  const { state } = view;
  const tr = state.tr.replaceSelectionWith(
    state.schema.nodes.image.create({ src: placeholderSrc, alt: 'Uploading...' })
  );
  view.dispatch(tr);
  const pos = findImageNodePosition(view.state.doc, placeholderSrc);
  try {
    const imageUrl = await uploadImageFile(file, token);
    const transaction = view.state.tr.setNodeAttribute(pos, 'src', imageUrl);
    transaction.setMeta('addToHistory', false);
    view.dispatch(transaction);
  } catch (err) {
    // अपलोड फेल होने पर प्लेसहोल्डर हटाएँ
    const deleteTr = view.state.tr.delete(pos, pos + 1);
    view.dispatch(deleteTr);
    alert('इमेज अपलोड विफल, कृपया पुनः प्रयास करें');
  }
};

const findImageNodePosition = (doc: any, src: string) => {
  let pos = -1;
  doc.descendants((node: any, offset: number) => {
    if (node.type.name === 'image' && node.attrs.src === src) {
      pos = offset;
      return false;
    }
    return true;
  });
  return pos;
};

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TiptapEditor = ({ content, onChange, placeholder = 'Write your blog post content here...' }: TiptapEditorProps) => {
  const getToken = () => localStorage.getItem('admin_token');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      const plugin = imageUploadPlugin(getToken);
      editor.registerPlugin(plugin);
    }
  }, [editor]);

  // मैन्युअल इमेज अपलोड बटन के लिए
  const handleManualUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        const token = getToken();
        if (!token) return;
        try {
          // दिखाएँ कि अपलोड हो रहा है
          editor.chain().focus().insertContent({
            type: 'image',
            attrs: { src: 'data:image/svg+xml,%3Csvg...%3E', alt: 'Uploading...' }
          }).run();
          const imageUrl = await uploadImageFile(file, token);
          // आखिरी डाली गई इमेज को अपडेट करें (सरल तरीका: पूरे कंटेंट से रिप्लेस)
          const html = editor.getHTML();
          const newHtml = html.replace(/data:image\/svg\+xml,%3Csvg[^>]*%3E/, imageUrl);
          editor.commands.setContent(newHtml);
        } catch (err) {
          alert('अपलोड विफल');
        }
      }
    };
    input.click();
  };

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper" style={{ border: '1px solid var(--bc)', borderRadius: '12px', padding: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', borderBottom: '1px solid var(--bc)', paddingBottom: '8px' }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>Numbered</button>
        <button type="button" onClick={handleManualUpload}>📷 Upload Image</button>
      </div>
      <EditorContent editor={editor} style={{ minHeight: '300px' }} />
      <style jsx>{`
        button { padding: '4px 8px'; background: 'var(--bgch)'; border: '1px solid var(--bc)'; border-radius: '6px'; cursor: pointer; }
        button.active { background: 'var(--cvb)'; color: 'var(--cv)'; border-color: 'var(--cvd)'; }
        :global(.ProseMirror) { min-height: 300px; outline: none; }
        :global(.ProseMirror img) { max-width: 100%; height: auto; }
        :global(.ProseMirror p.is-editor-empty:first-child::before) { content: attr(data-placeholder); float: left; color: #adb5bd; pointer-events: none; height: 0; }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
