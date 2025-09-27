import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Edit3, RotateCw, Trash2, Replace } from 'lucide-react';
import { ImageEditor } from './ImageEditor';

interface ImageUploadCardProps {
  currentImageUrl?: string;
  resourceId: string;
  onImageUpdate: (thumbnailUrl: string, shouldInsertIntoContent?: boolean) => void;
  onImageRemove: () => void;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  currentImageUrl,
  resourceId,
  onImageUpdate,
  onImageRemove
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPEG, PNG, WebP)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setShowEditor(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Remove image from this resource? This won\'t delete the image from storage.')) {
      onImageRemove();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Card className="bg-white/95 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
        {currentImageUrl ? (
          // Show existing image with toolbar
          <div className="relative group">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={currentImageUrl}
                alt="Resource thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Toolbar overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1 bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0"
                  onClick={triggerFileInput}
                  title="Replace image"
                >
                  <Replace className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0"
                  onClick={triggerFileInput}
                  title="Edit image"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                  onClick={handleRemoveImage}
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Show upload area
          <div
            className={`p-8 text-center transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:bg-gray-50/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Image
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop an image here, or click to browse
            </p>
            
            <Button onClick={triggerFileInput} variant="outline">
              Choose Image
            </Button>
            
            <p className="text-xs text-gray-500 mt-3">
              Supports JPEG, PNG, WebP • Max 10MB
            </p>
          </div>
        )}
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Image Editor Modal */}
      <ImageEditor
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setSelectedFile(null);
        }}
        imageFile={selectedFile}
        resourceId={resourceId}
        onSave={(thumbnailUrl, shouldInsertIntoContent) => {
          onImageUpdate(thumbnailUrl, shouldInsertIntoContent);
          setShowEditor(false);
          setSelectedFile(null);
        }}
      />
    </>
  );
};