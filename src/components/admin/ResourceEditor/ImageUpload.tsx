import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label: string;
}

export const ImageUpload = ({ currentUrl, onUpload, label }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Supabase: Upload image to storage bucket
  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setProgress(0);

      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `uploads/resources/images/${fileName}`;

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const { data, error } = await supabase.storage
        .from('resources')
        .upload(filePath, file, { upsert: false });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        console.error('Supabase Storage: Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        return;
      }

      // Get public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(data.path);

      onUpload(urlData.publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      uploadImage(file);
    }
  };

  const removeImage = () => {
    onUpload('');
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {currentUrl ? (
        <div className="relative">
          <img
            src={currentUrl}
            alt={label}
            className="w-full h-32 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-3">
            Drop an image here or click to upload
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            disabled={uploading}
          />
          <Button
            variant="outline"
            asChild
            disabled={uploading}
          >
            <label htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Select Image'}
            </label>
          </Button>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
};