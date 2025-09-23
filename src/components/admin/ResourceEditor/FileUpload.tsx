import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, Download } from 'lucide-react';

interface FileUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label: string;
}

export const FileUpload = ({ currentUrl, onUpload, label }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const { toast } = useToast();

  // Supabase: Upload file to storage bucket
  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setProgress(0);

      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `uploads/resources/files/${fileName}`;

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
        console.error('Supabase Storage: Error uploading file:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
        return;
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(data.path);

      setFileName(file.name);
      setFileSize(file.size);
      onUpload(urlData.publicUrl);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
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
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "File Too Large",
          description: "Please select a file under 50MB",
          variant: "destructive",
        });
        return;
      }

      uploadFile(file);
    }
  };

  const removeFile = () => {
    onUpload('');
    setFileName('');
    setFileSize(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return <FileText className="w-6 h-6" />;
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {currentUrl ? (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(currentUrl)}
              <div>
                <p className="font-medium text-sm">
                  {fileName || currentUrl.split('/').pop() || 'Uploaded File'}
                </p>
                {fileSize > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(fileSize)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-3">
            Drop a file here or click to upload
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Supports PDF, DOC, DOCX, XLS, XLSX and more (max 50MB)
          </p>
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            disabled={uploading}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf"
          />
          <Button
            variant="outline"
            asChild
            disabled={uploading}
          >
            <label htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Select File'}
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