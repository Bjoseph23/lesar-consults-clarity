import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Monitor } from 'lucide-react';

const MobileBlock = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Monitor className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Desktop Only
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            The admin dashboard is designed for desktop use only. 
            Please open this page on a desktop or laptop computer for the best experience.
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
          className="w-full"
        >
          Return to Main Site
        </Button>
      </div>
    </div>
  );
};

export default MobileBlock;