// src/components/Editor.tsx
'use client';

import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Editor = forwardRef((props, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  return <ReactQuill ref={quillRef} {...props} />;
});

Editor.displayName = 'Editor';
export default Editor;