// src/components/Editor.tsx
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef } from 'react';
import { ReactQuillProps } from 'react-quill-new';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

interface EditorProps extends ReactQuillProps {
  forwardedRef?: ForwardedRef<any>;
}

const Editor = forwardRef<any, EditorProps>((props, ref) => {
  const { forwardedRef, ...rest } = props;
  return <ReactQuill ref={forwardedRef || ref} {...rest} />;
});

Editor.displayName = 'Editor';

export default Editor;