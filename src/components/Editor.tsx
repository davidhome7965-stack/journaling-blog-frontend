// src/components/Editor.tsx
import dynamic from 'next/dynamic';
import { forwardRef, ForwardedRef } from 'react';
import type { ReactQuillProps } from 'react-quill-new';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

type EditorProps = ReactQuillProps & {
  forwardedRef?: ForwardedRef<any>;
};

const Editor = forwardRef<any, EditorProps>((props, ref) => {
  const { forwardedRef, ...rest } = props;
  // Use forwardedRef if provided, otherwise the regular ref
  return <ReactQuill ref={forwardedRef || ref} {...rest} />;
});

Editor.displayName = 'Editor';

export default Editor;