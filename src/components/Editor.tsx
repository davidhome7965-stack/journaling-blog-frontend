// @ts-nocheck
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Editor = forwardRef((props, ref) => {
  return <ReactQuill ref={ref} {...props} />;
});

Editor.displayName = 'Editor';

export default Editor;