import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Editor = forwardRef((props: any, ref: any) => {
  // @ts-ignore - react-quill-new type definitions are incomplete; ref works at runtime
  return <ReactQuill ref={ref} {...props} />;
});

Editor.displayName = 'Editor';

export default Editor;