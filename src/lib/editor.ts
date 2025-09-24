import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';

/**
 * Centralized TipTap editor configuration to prevent duplicate extension issues
 * This configuration is used by the ResourceEditor component
 */
export const createEditorConfig = (content: string = '', onUpdate?: (editor: Editor) => void) => ({
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      // Disable Link from StarterKit to prevent duplicate extension warning
      link: false,
    }),
    Link.configure({
      openOnClick: false,
      linkOnPaste: true,
      HTMLAttributes: { 
        rel: 'noopener noreferrer',
        class: 'editor-link text-primary hover:text-primary/80 underline',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'editor-image max-w-full h-auto rounded-lg shadow-sm',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: 'Start writing your content...',
    }),
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: 'bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded',
      },
    }),
  ],
  content,
  onUpdate: onUpdate ? ({ editor }: { editor: Editor }) => onUpdate(editor) : undefined,
  editorProps: {
    attributes: {
      class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-4 border rounded-md',
    },
  },
});