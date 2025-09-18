import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Refs to track touch/pointer movement and avoid closing when user scrolls
  const touchStartYRef = useRef<number | null>(null);
  const touchMovedRef = useRef(false);

  // Scroll handler that respects the mobile panel state.
  useEffect(() => {
    const handleScroll = () => {
      // If mobile menu is open, don't allow scroll to "toggle" the header off.
      // Keep header in scrolled/blurred state while menu is open for visual consistency.
      if (isOpen) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY > 50);
    };

    // Use passive true for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // call once to initialize
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]); // depends on isOpen so it sees latest value

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Trap focus into panel when open (basic)
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const firstFocusable = panelRef.current.querySelector<HTMLElement>(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }, [isOpen]);

  // Lock body scroll when panel is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle || "";
    }
    return () => {
      document.body.style.overflow = originalStyle || "";
    };
  }, [isOpen]);

  const services = [
    { name: "Health Systems Strengthening", href: "#services" },
    { name: "Financial Analysis & Economics", href: "#services" },
    { name: "Customized Research & Surveys", href: "#services" },
    { name: "Monitoring & Evaluation (M&E)", href: "#services" },
    { name: "Human Resource Management & Capacity Building", href: "#services" },
    { name: "Policy & Advocacy Development", href: "#services" },
    { name: "Project Management", href: "#services" },
  ];

  // Navigation includes Services as the third item after Team
  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Services", href: "#services", isDropdown: true },
    { name: "Resources", href: "#resources" },
    { name: "Projects", href: "#projects" },
  ];

  // Overlay touch/pointer handlers
  const onOverlayPointerDown = (e: React.PointerEvent) => {
    touchMovedRef.current = false;
    touchStartYRef.current = e.clientY;
  };
  const onOverlayPointerMove = (e: React.PointerEvent) => {
    if (touchStartYRef.current === null) return;
    const delta = Math.abs(e.clientY - touchStartYRef.current);
    if (delta > 10) touchMovedRef.current = true;
  };
  const onOverlayPointerUp = (e: React.PointerEvent) => {
    // Only close if it was a tap (no movement)
    if (!touchMovedRef.current) {
      setIsOpen(false);
    }
    touchStartYRef.current = null;
    touchMovedRef.current = false;
  };

  // Touch-only fallback (some mobile browsers)
  const onOverlayTouchStart = (e: React.TouchEvent) => {
    touchMovedRef.current = false;
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };
  const onOverlayTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const delta = Math.abs((e.touches[0]?.clientY ?? 0) - (touchStartYRef.current ?? 0));
    if (delta > 10) touchMovedRef.current = true;
  };
  const onOverlayTouchEnd = () => {
    if (!touchMovedRef.current) {
      setIsOpen(false);
    }
    touchStartYRef.current = null;
    touchMovedRef.current = false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/70 backdrop-blur-lg shadow-card/20" : "bg-transparent"}`}
      style={{ WebkitBackdropFilter: isScrolled ? "saturate(120%) blur(8px)" : undefined, backdropFilter: isScrolled ? "saturate(120%) blur(8px)" : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <img src="/logo.png" alt="Lesar Consults" className="h-12 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.isDropdown) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center nav-link text-sm font-medium">
                      {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-popover border border-border shadow-elegant">
                      {services.map((service) => (
                        <DropdownMenuItem key={service.name} asChild>
                          <a
                            href={service.href}
                            className="flex items-center px-4 py-3 text-sm hover:bg-muted transition-colors"
                          >
                            {service.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <a key={item.name} href={item.href} className="nav-link text-sm font-medium">
                  {item.name}
                </a>
              );
            })}

            <Button 
              onClick={() => window.location.href = '/contact'} 
              className="btn-primary"
              aria-expanded={false}
            >
              Request a Proposal
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onPointerDown={onOverlayPointerDown}
        onPointerMove={onOverlayPointerMove}
        onPointerUp={onOverlayPointerUp}
        onTouchStart={onOverlayTouchStart}
        onTouchMove={onOverlayTouchMove}
        onTouchEnd={onOverlayTouchEnd}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-full w-full max-w-xs z-50 bg-background shadow-elevate transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <img src="/logo.png" alt="Lesar Consults" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="px-4 py-6 space-y-6 overflow-y-auto h-[calc(100%-72px)]">
          {navigation.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.name}>
                  <p className="text-base font-semibold mb-2">{item.name}</p>
                  <div className="space-y-2 pl-2">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block text-sm text-foreground hover:text-primary transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            );
          })}

          <div className="mt-4">
            <Button
              onClick={() => {
                window.location.href = '/contact';
                setIsOpen(false);
              }}
              className="btn-primary w-full"
            >
              Request a Proposal
            </Button>
          </div>

          <div className="pt-6 border-t border-border text-sm text-muted-foreground">
            <p className="mb-2">Contact</p>
            <p>lesarconsults@gmail.com</p>
            <p className="mt-2">P.O. Box 43239-80100</p>
          </div>
        </nav>
      </aside>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>
    </nav>
  );
};

export default Navbar;
