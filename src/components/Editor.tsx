import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Editor = forwardRef<any, any>((props, ref) => {
  // @ts-expect-error - react-quill-new type definitions incorrectly omit 'ref'
  return <ReactQuill ref={ref} {...props} />;
});

Editor.displayName = 'Editor';

export default Editor;