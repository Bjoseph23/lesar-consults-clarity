import React, { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical, 
  RotateCcw, 
  Download,
  Upload,
  X
} from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File | null;
  resourceId: string;
  onSave: (thumbnailUrl: string, shouldInsertIntoContent?: boolean) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_RATIOS = [
  { label: 'Free', value: null },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 },
  { label: '3:4', value: 3 / 4 },
  { label: '9:16', value: 9 / 16 },
];

export const ImageEditor: React.FC<ImageEditorProps> = ({
  isOpen,
  onClose,
  imageFile,
  resourceId,
  onSave
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [quality, setQuality] = useState(0.8);
  const [altText, setAltText] = useState('');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [insertIntoContent, setInsertIntoContent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        setTargetWidth(img.naturalWidth);
        setTargetHeight(img.naturalHeight);
      };
      img.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape' && !uploading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, uploading, onClose]);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleWidthChange = (value: string) => {
    const width = parseInt(value) || 0;
    setTargetWidth(width);
    if (lockAspect && imageSize.width > 0) {
      const aspectRatio = imageSize.width / imageSize.height;
      setTargetHeight(Math.round(width / aspectRatio));
    }
  };

  const handleHeightChange = (value: string) => {
    const height = parseInt(value) || 0;
    setTargetHeight(height);
    if (lockAspect && imageSize.height > 0) {
      const aspectRatio = imageSize.width / imageSize.height;
      setTargetWidth(Math.round(height * aspectRatio));
    }
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setTargetWidth(imageSize.width);
    setTargetHeight(imageSize.height);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea,
    rotation: number = 0,
    flip: { horizontal: boolean; vertical: boolean } = { horizontal: false, vertical: false }
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const rotRad = (rotation * Math.PI) / 180;
    const { width: bBoxWidth, height: bBoxHeight } = {
      width: Math.abs(Math.cos(rotRad) * pixelCrop.width) + Math.abs(Math.sin(rotRad) * pixelCrop.height),
      height: Math.abs(Math.sin(rotRad) * pixelCrop.width) + Math.abs(Math.cos(rotRad) * pixelCrop.height),
    };

    canvas.width = targetWidth || bBoxWidth;
    canvas.height = targetHeight || bBoxHeight;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-bBoxWidth / 2, -bBoxHeight / 2);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      bBoxWidth,
      bBoxHeight
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to blob failed'));
          }
        },
        'image/jpeg',
        quality
      );
    });
  };

  const handleSave = async () => {
    if (!imageFile || !croppedAreaPixels || !imageUrl) {
      toast({
        title: "Error",
        description: "No image to save",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(10);

      // Create cropped image
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        rotation,
        { horizontal: flipH, vertical: flipV }
      );

      setUploadProgress(30);

      // Compress image if needed
      let finalBlob = croppedImage;
      if (croppedImage.size > 2 * 1024 * 1024) { // If larger than 2MB
        finalBlob = await imageCompression(new File([croppedImage], 'image.jpg'), {
          maxSizeMB: 2,
          maxWidthOrHeight: Math.max(targetWidth, targetHeight),
          useWebWorker: true,
        });
      }

      setUploadProgress(50);

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = 'jpg';
      const filename = `resources/${resourceId}/images/${timestamp}_thumbnail.${fileExtension}`;

      setUploadProgress(70);

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filename, finalBlob, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      setUploadProgress(90);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(filename);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      setUploadProgress(100);

      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });

      onSave(urlData.publicUrl, insertIntoContent);
      onClose();

    } catch (error: any) {
      console.error('Image upload error:', error);
      
      if (error.message?.includes('row-level security') || error.message?.includes('RLS')) {
        toast({
          title: "Permission Error",
          description: "Upload failed — permission denied. Please ensure the storage bucket and resources table allow uploads for admins.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Upload Failed",
          description: error.message || "An error occurred while uploading the image",
          variant: "destructive"
        });
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = async () => {
    if (!imageFile || !croppedAreaPixels || !imageUrl) return;

    try {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        rotation,
        { horizontal: flipH, vertical: flipV }
      );

      const url = URL.createObjectURL(croppedImage);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Image downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive"
      });
    }
  };

  if (!imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        aria-labelledby="image-editor-title"
        aria-describedby="image-editor-description"
      >
        <DialogHeader>
          <DialogTitle id="image-editor-title">Edit Image</DialogTitle>
          <p id="image-editor-description" className="sr-only">
            Edit and crop your image, adjust settings, and upload to resource
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview Area */}
            <div className="lg:col-span-2">
              <div className="relative h-64 md:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden">
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect || undefined}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  rotation={rotation}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Aspect Ratio */}
              <div>
                <Label>Aspect Ratio</Label>
                <Select value={aspect?.toString() || 'null'} onValueChange={(value) => 
                  setAspect(value === 'null' ? null : parseFloat(value))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ASPECT_RATIOS.map((ratio) => (
                      <SelectItem key={ratio.label} value={ratio.value?.toString() || 'null'}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Zoom */}
              <div>
                <Label>Zoom ({zoom.toFixed(1)}x)</Label>
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              {/* Size Controls */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lock-aspect"
                  checked={lockAspect}
                  onCheckedChange={(checked) => setLockAspect(checked as boolean)}
                />
                <Label htmlFor="lock-aspect">Lock aspect ratio</Label>
              </div>

              {/* Quality */}
              <div>
                <Label>Quality ({Math.round(quality * 100)}%)</Label>
                <Slider
                  value={[quality]}
                  onValueChange={([value]) => setQuality(value)}
                  min={0.6}
                  max={0.95}
                  step={0.05}
                  className="mt-2"
                />
              </div>

              <Separator />

              {/* Transform Controls */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleRotate(-90)}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Rotate Left
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRotate(90)}>
                  <RotateCw className="w-4 h-4 mr-1" />
                  Rotate Right
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFlipH(!flipH)}>
                  <FlipHorizontal className="w-4 h-4 mr-1" />
                  Flip H
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFlipV(!flipV)}>
                  <FlipVertical className="w-4 h-4 mr-1" />
                  Flip V
                </Button>
              </div>

              <Separator />

              {/* Alt Text */}
              <div>
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input
                  id="alt-text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image..."
                />
              </div>

              {/* Alignment */}
              <div>
                <Label>Alignment</Label>
                <Select value={alignment} onValueChange={(value: any) => setAlignment(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Insert into content */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insert-content"
                  checked={insertIntoContent}
                  onCheckedChange={(checked) => setInsertIntoContent(checked as boolean)}
                />
                <Label htmlFor="insert-content">Insert into content</Label>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={uploading}>
              <Upload className="w-4 h-4 mr-1" />
              {uploading ? 'Uploading...' : 'Save & Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};