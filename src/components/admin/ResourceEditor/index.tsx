import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EditorToolbar } from './EditorToolbar';
import { BlockMenu } from './BlockMenu';
import { ImageUpload } from './ImageUpload';
import { FileUpload } from './FileUpload';
import { SaveConfirmModal } from './SaveConfirmModal';
import { PublishConfirmModal } from './PublishConfirmModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ArrowLeft, Eye, Save, Upload, Trash2 } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface ResourceEditorProps {
  resourceId: string;
}

interface ResourceData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content_html: string;
  content_json?: any;
  categories: string[];
  tags: string[];
  type: string;
  thumbnail_url?: string;
  file_url?: string;
  author: string;
  published_at?: string;
  year?: number;
  featured: boolean;
  seo: {
    title?: string;
    description?: string;
    canonical?: string;
  };
  created_at: string;
  updated_at: string;
}

const AVAILABLE_CATEGORIES = [
  'health', 'mental-health', 'strategy', 'policy', 'research', 
  'training', 'capacity-building', 'monitoring-evaluation'
];

const RESOURCE_TYPES = [
  { value: 'article', label: 'Article' },
  { value: 'case_study', label: 'Case Study' },
  { value: 'report', label: 'Report' },
  { value: 'tool', label: 'Tool' },
  { value: 'download', label: 'Download' }
];

export const ResourceEditor = ({ resourceId }: ResourceEditorProps) => {
  const [resource, setResource] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Supabase: TipTap editor configuration with extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your content...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: resource?.content_html || '',
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true);
      const text = editor.getText();
      setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-4',
      },
    },
  });

  // Supabase: Load resource data from database
  const loadResource = useCallback(async () => {
    try {
      setLoading(true);
      
      // Handle "new" resource creation
      if (resourceId === 'new') {
        const newResource: ResourceData = {
          id: `new-${Date.now()}`,
          slug: '',
          title: '',
          summary: '',
          content_html: '',
          categories: [],
          tags: [],
          type: 'article',
          author: 'Lesar Consults',
          featured: false,
          seo: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setResource(newResource);
        editor?.commands.setContent('');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', resourceId)
        .maybeSingle();

      if (error) {
        console.error('Supabase: Error loading resource:', error);
        toast({
          title: "Error",
          description: "Failed to load resource",
          variant: "destructive",
        });
        return;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Resource not found",
          variant: "destructive",
        });
        navigate('/admin/resources');
        return;
      }

      setResource({
        ...data,
        seo: typeof data.seo === 'string' ? JSON.parse(data.seo) : (data.seo as any) || {}
      });
      editor?.commands.setContent(data.content_html || '');
      setLastSaved(new Date(data.updated_at));
    } catch (error) {
      console.error('Error loading resource:', error);
      toast({
        title: "Error",
        description: "Failed to load resource",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [resourceId, editor, toast, navigate]);

  useEffect(() => {
    loadResource();
  }, [loadResource]);

  // Supabase: Save resource to database
  const saveResource = async (shouldPublish = false) => {
    if (!resource || !editor) return;

    try {
      setSaving(true);
      const content_html = editor.getHTML();
      const content_json = editor.getJSON();
      
      // Generate ID and slug for new resources
      let updateData = { ...resource };
      if (resourceId === 'new') {
        updateData.id = `resource-${Date.now()}`;
        if (!updateData.slug) {
          updateData.slug = updateData.title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
        }
      }

      updateData = {
        ...updateData,
        content_html,
        content_json,
        updated_at: new Date().toISOString(),
        ...(shouldPublish && !updateData.published_at ? { published_at: new Date().toISOString() } : {}),
      };

      const { error } = await supabase
        .from('resources')
        .upsert(updateData)
        .eq('id', updateData.id);

      if (error) {
        console.error('Supabase: Error saving resource:', error);
        toast({
          title: "Error",
          description: "Failed to save resource",
          variant: "destructive",
        });
        return false;
      }

      // Update local state for new resources
      if (resourceId === 'new' && updateData.id !== resource.id) {
        setResource(updateData);
        navigate(`/admin/resources/${updateData.id}/edit`, { replace: true });
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast({
        title: "Success",
        description: shouldPublish ? "Resource published" : "Resource saved",
      });
      return true;
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: "Error",
        description: "Failed to save resource",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Supabase: Delete resource from database
  const deleteResource = async () => {
    if (!resource) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resource.id);

      if (error) {
        console.error('Supabase: Error deleting resource:', error);
        toast({
          title: "Error",
          description: "Failed to delete resource",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Resource deleted",
      });
      navigate('/admin/resources');
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    }
  };

  // Supabase: Upload image to storage
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `uploads/resources/images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('resources')
        .upload(filePath, file, { upsert: false });

      if (error) {
        console.error('Supabase Storage: Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const addTag = () => {
    if (newTag.trim() && resource && !resource.tags.includes(newTag.trim())) {
      setResource({
        ...resource,
        tags: [...resource.tags, newTag.trim()]
      });
      setNewTag('');
      setHasUnsavedChanges(true);
    }
  };

  const removeTag = (tag: string) => {
    if (resource) {
      setResource({
        ...resource,
        tags: resource.tags.filter(t => t !== tag)
      });
      setHasUnsavedChanges(true);
    }
  };

  const updateField = (field: keyof ResourceData, value: any) => {
    if (resource) {
      setResource({ ...resource, [field]: value });
      setHasUnsavedChanges(true);
    }
  };

  const readingTime = Math.ceil(wordCount / 200);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
          <Button asChild>
            <RouterLink to="/admin/resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </RouterLink>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <RouterLink to="/admin/resources">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </RouterLink>
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowSaveModal(true)}
            disabled={saving || !hasUnsavedChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            onClick={() => setShowPublishModal(true)}
            disabled={saving}
          >
            <Upload className="w-4 h-4 mr-2" />
            {resource.published_at ? 'Update' : 'Publish'}
          </Button>
          <Button 
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <div className="flex items-center gap-4">
          <span>Status: {resource.published_at ? 'Published' : 'Draft'}</span>
          {lastSaved && (
            <span>Last saved: {lastSaved.toLocaleString()}</span>
          )}
          <span>Words: {wordCount}</span>
          <span>Reading time: ~{readingTime} min</span>
        </div>
        {hasUnsavedChanges && (
          <span className="text-orange-600">Unsaved changes</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meta Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={resource.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Resource title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={resource.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  placeholder="resource-slug"
                />
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={resource.summary || ''}
                  onChange={(e) => updateField('summary', e.target.value)}
                  placeholder="Brief summary of the resource"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={resource.type} onValueChange={(value) => updateField('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={resource.author}
                  onChange={(e) => updateField('author', e.target.value)}
                  placeholder="Lesar Consults"
                />
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={resource.year || ''}
                  onChange={(e) => updateField('year', parseInt(e.target.value) || null)}
                  placeholder="2025"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={resource.featured}
                  onCheckedChange={(checked) => updateField('featured', checked)}
                />
                <Label>Featured</Label>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {AVAILABLE_CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={resource.categories.includes(category)}
                      onChange={(e) => {
                        const categories = e.target.checked
                          ? [...resource.categories, category]
                          : resource.categories.filter(c => c !== category);
                        updateField('categories', categories);
                      }}
                    />
                    <Label className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button size="sm" onClick={addTag}>Add</Button>
              </div>
            </CardContent>
          </Card>

          {/* File Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                currentUrl={resource.thumbnail_url}
                onUpload={(url) => updateField('thumbnail_url', url)}
                label="Thumbnail"
              />
              {resource.type === 'download' && (
                <FileUpload
                  currentUrl={resource.file_url}
                  onUpload={(url) => updateField('file_url', url)}
                  label="Download File"
                />
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  value={resource.seo.title || ''}
                  onChange={(e) => updateField('seo', { ...resource.seo, title: e.target.value })}
                  placeholder="SEO optimized title"
                />
              </div>
              <div>
                <Label htmlFor="seo-description">Meta Description</Label>
                <Textarea
                  id="seo-description"
                  value={resource.seo.description || ''}
                  onChange={(e) => updateField('seo', { ...resource.seo, description: e.target.value })}
                  placeholder="Meta description for search engines"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="seo-canonical">Canonical URL</Label>
                <Input
                  id="seo-canonical"
                  value={resource.seo.canonical || ''}
                  onChange={(e) => updateField('seo', { ...resource.seo, canonical: e.target.value })}
                  placeholder="https://lesarconsults.com/resources/..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
              <EditorToolbar editor={editor} onImageUpload={uploadImage} />
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg min-h-[600px] relative">
                <EditorContent editor={editor} />
                <BlockMenu editor={editor} onImageUpload={uploadImage} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <SaveConfirmModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={() => {
          saveResource(false);
          setShowSaveModal(false);
        }}
      />

      <PublishConfirmModal
        open={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={() => {
          saveResource(true);
          setShowPublishModal(false);
        }}
        isPublished={!!resource.published_at}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteResource();
          setShowDeleteModal(false);
        }}
        resourceTitle={resource.title}
      />
    </div>
  );
};