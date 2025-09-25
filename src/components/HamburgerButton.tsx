import { Button } from "@/components/ui/button";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Animated hamburger menu button that transforms into an X when open
 * 
 * Customization options:
 * - Adjust animation duration by changing transition-all duration (currently 300ms)
 * - Modify bar thickness by changing h-0.5 class
 * - Change bar color via stroke/bg color classes
 * - Adjust spacing by modifying space-y classes
 */
const HamburgerButton = ({ isOpen, onClick, className }: HamburgerButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`p-3 ${className}`}
    >
      <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        {/* Top bar - rotates 45° and moves down when open */}
        <span
          className={`
            block h-0.5 w-6 bg-current rounded-sm 
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'rotate-45 translate-y-1.5 opacity-100' 
              : 'rotate-0 translate-y-0 opacity-100'
            }
          `}
        />
        
        {/* Middle bar - fades out and scales down when open */}
        <span
          className={`
            block h-0.5 w-6 bg-current rounded-sm mt-1
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
            }
          `}
        />
        
        {/* Bottom bar - rotates -45° and moves up when open */}
        <span
          className={`
            block h-0.5 w-6 bg-current rounded-sm mt-1
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? '-rotate-45 -translate-y-1.5 opacity-100' 
              : 'rotate-0 translate-y-0 opacity-100'
            }
          `}
        />
      </div>
    </Button>
  );
};

export default HamburgerButton;