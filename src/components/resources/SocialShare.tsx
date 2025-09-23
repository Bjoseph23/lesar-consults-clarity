import { Share, Twitter, Linkedin, Facebook, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      className: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      className: 'hover:bg-blue-50 hover:text-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'hover:bg-blue-50 hover:text-blue-800'
    }
  ];

  return (
    <div className="border-t border-b border-border py-6 my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Share className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Share this resource</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Social Share Buttons */}
          {shareLinks.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              size="sm"
              className={`p-2 ${platform.className}`}
              onClick={() => window.open(platform.url, '_blank', 'width=600,height=400')}
              aria-label={`Share on ${platform.name}`}
            >
              <platform.icon className="w-4 h-4" />
            </Button>
          ))}
          
          {/* Copy Link Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-50 hover:text-gray-700"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;