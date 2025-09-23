import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Resource {
  id: string;
  title: string;
  type: string;
  file_url: string | null;
}

interface GatedDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource;
}

interface FormData {
  name: string;
  email: string;
  organization: string;
  message: string;
}

const GatedDownloadModal = ({ isOpen, onClose, resource }: GatedDownloadModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create lead in Supabase
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          organization: formData.organization || null,
          interested_in: resource.type,
          resource_id: resource.id,
          message: formData.message || null
        }]);

      if (error) throw error;

      // For now, set a placeholder download URL
      // In a real implementation, you would generate a signed URL or return the actual file URL
      setDownloadUrl(resource.file_url || 'https://example.com/placeholder-download.pdf');
      
      toast.success("Thank you! Your download is ready.");
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', organization: '', message: '' });
    setDownloadUrl(null);
    onClose();
  };

  if (downloadUrl) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2 text-green-600" />
              Download Ready
            </DialogTitle>
            <DialogDescription>
              Your download is now available. Click the button below to start the download.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-1">{resource.title}</h4>
              <p className="text-sm text-green-600">
                Thank you for your interest! We've sent a confirmation email to your inbox.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Now
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Download Resource</DialogTitle>
          <DialogDescription>
            Please provide your details to access this resource. We'll send you updates about similar content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Resource Info */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-foreground mb-1">{resource.title}</h4>
            <p className="text-sm text-muted-foreground capitalize">{resource.type.replace('_', ' ')}</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              placeholder="Your organization (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your interest in this resource (optional)"
              rows={3}
            />
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground bg-muted/20 rounded p-3">
            By submitting this form, you agree to receive updates about similar resources. 
            We respect your privacy and won't share your information with third parties.
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Get Download
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GatedDownloadModal;