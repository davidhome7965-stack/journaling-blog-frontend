'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { useState, useCallback, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Get token from localStorage
const getToken = () => localStorage.getItem('admin_token');

// Upload image to backend
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const token = getToken();
  const res = await fetch(`${API_URL}/upload/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return `${API_URL}${data.url}`;
};

// Custom image extension with upload handling
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    };
  },
});

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = 'Write your blog post content here...' }: TiptapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      CustomImage.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Update editor when external content changes (for edit mode)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Handle image upload from file
  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;
    setIsUploading(true);
    try {
      // Show loading placeholder
      editor.chain().focus().insertContent({
        type: 'image',
        attrs: { src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="100" y="110" font-size="16" text-anchor="middle" fill="%23999"%3EUploading...%3C/text%3E%3C/svg%3E' },
      }).run();
      
      const imageUrl = await uploadImage(file);
      
      // Find the last inserted image and replace its src
      const { state } = editor;
      let pos = -1;
      state.doc.descendants((node, position) => {
        if (node.type.name === 'image' && node.attrs.src.includes('Uploading')) {
          pos = position;
          return false;
        }
        return true;
      });
      if (pos !== -1) {
        editor.commands.setNodeAttribute(pos, 'src', imageUrl);
      } else {
        // Fallback: insert at cursor position
        editor.chain().focus().insertContent({ type: 'image', attrs: { src: imageUrl } }).run();
      }
    } catch (err) {
      console.error(err);
      alert('Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [editor]);

  // Handle paste events for images
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) handleImageUpload(file);
        break;
      }
    }
  }, [handleImageUpload]);

  // Handle drag & drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  }, [handleImageUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // File input click
  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) await handleImageUpload(file);
    };
    input.click();
  };

  if (!editor) return null;

  // Toolbar button styling
  const buttonClass = (isActive: boolean) => ({
    padding: '6px 10px',
    background: isActive ? 'var(--cvb)' : 'var(--bgch)',
    color: isActive ? 'var(--cv)' : 'var(--tp)',
    border: '1px solid var(--bc)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.2s',
  });

  return (
    <div 
      style={{ 
        border: '1px solid var(--bc)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        background: 'var(--bgc)'
      }}
      onPaste={handlePaste}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '6px', 
        padding: '10px', 
        borderBottom: '1px solid var(--bc)',
        background: 'var(--bgch)'
      }}>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={buttonClass(editor.isActive('bold'))}>
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={buttonClass(editor.isActive('italic'))}>
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={buttonClass(editor.isActive('strike'))}>
          Strike
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={buttonClass(editor.isActive('heading', { level: 1 }))}>
          H1
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={buttonClass(editor.isActive('heading', { level: 2 }))}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={buttonClass(editor.isActive('heading', { level: 3 }))}>
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={buttonClass(editor.isActive('bulletList'))}>
          List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={buttonClass(editor.isActive('orderedList'))}>
          Ordered
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={buttonClass(editor.isActive('blockquote'))}>
          Quote
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} style={buttonClass(editor.isActive('codeBlock'))}>
          Code
        </button>
        <button type="button" onClick={() => {
          const url = window.prompt('Enter URL:');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} style={buttonClass(editor.isActive('link'))}>
          Link
        </button>
        <button type="button" onClick={triggerFileUpload} style={buttonClass(false)}>
          📷 Upload Image
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} style={buttonClass(false)}>
          Clear
        </button>
      </div>

      {/* Uploading indicator */}
      {isUploading && (
        <div style={{ padding: '8px', background: 'var(--crb)', color: 'var(--cr)', fontSize: '12px', textAlign: 'center' }}>
          Uploading image...
        </div>
      )}

      {/* Editor content */}
      <EditorContent 
        editor={editor} 
        style={{ 
          minHeight: '300px', 
          padding: '12px',
          outline: 'none'
        }} 
      />

      <style jsx>{`
        :global(.ProseMirror) {
          min-height: 280px;
          outline: none;
        }
        :global(.ProseMirror img) {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 8px;
        }
        :global(.ProseMirror a) {
          color: var(--cv);
          text-decoration: underline;
        }
        :global(.ProseMirror blockquote) {
          border-left: 3px solid var(--cv);
          margin: 10px 0;
          padding-left: 15px;
          color: var(--tm);
          font-style: italic;
        }
        :global(.ProseMirror code) {
          background: var(--bgch);
          padding: 2px 5px;
          border-radius: 4px;
          font-family: monospace;
        }
        :global(.ProseMirror pre) {
          background: var(--bgch);
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
        }
        :global(.ProseMirror ul), :global(.ProseMirror ol) {
          padding-left: 20px;
        }
        :global(.ProseMirror p.is-editor-empty:first-child::before) {
          content: attr(data-placeholder);
          float: left;
          color: var(--tm);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
