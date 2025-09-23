import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Plus,
  Type,
  Image,
  List,
  ListOrdered,
  Quote,
  Minus,
  FileText,
  AlertCircle,
  Code
} from 'lucide-react';
import { useState } from 'react';

interface BlockMenuProps {
  editor: Editor | null;
  onImageUpload: (file: File) => Promise<string | null>;
}

export const BlockMenu = ({ editor, onImageUpload }: BlockMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = await onImageUpload(file);
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    };
    input.click();
    setIsOpen(false);
  };

  const addBlock = (type: string) => {
    switch (type) {
      case 'paragraph':
        editor.chain().focus().insertContent('<p></p>').run();
        break;
      case 'heading1':
        editor.chain().focus().insertContent('<h1></h1>').run();
        break;
      case 'heading2':
        editor.chain().focus().insertContent('<h2></h2>').run();
        break;
      case 'heading3':
        editor.chain().focus().insertContent('<h3></h3>').run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'blockquote':
        editor.chain().focus().insertContent('<blockquote><p></p></blockquote>').run();
        break;
      case 'codeBlock':
        editor.chain().focus().insertContent('<pre><code></code></pre>').run();
        break;
      case 'divider':
        editor.chain().focus().setHorizontalRule().run();
        break;
      case 'callout':
        editor.chain().focus().insertContent('<div class="callout bg-blue-50 border-l-4 border-blue-400 p-4 my-4"><p></p></div>').run();
        break;
    }
    setIsOpen(false);
  };

  const blockOptions = [
    { id: 'paragraph', label: 'Paragraph', icon: Type },
    { id: 'heading1', label: 'Heading 1', icon: Type },
    { id: 'heading2', label: 'Heading 2', icon: Type },
    { id: 'heading3', label: 'Heading 3', icon: Type },
    { id: 'image', label: 'Image', icon: Image, action: addImage },
    { id: 'bulletList', label: 'Bullet List', icon: List },
    { id: 'orderedList', label: 'Numbered List', icon: ListOrdered },
    { id: 'blockquote', label: 'Quote', icon: Quote },
    { id: 'codeBlock', label: 'Code Block', icon: Code },
    { id: 'divider', label: 'Divider', icon: Minus },
    { id: 'callout', label: 'Callout Box', icon: AlertCircle },
  ];

  return (
    <div className="absolute left-0 top-4 -ml-12 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full w-8 h-8 p-0 shadow-md"
            title="Add block"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="grid gap-1">
            {blockOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.id}
                  variant="ghost"
                  className="justify-start h-8 px-2 text-sm"
                  onClick={option.action || (() => addBlock(option.id))}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};