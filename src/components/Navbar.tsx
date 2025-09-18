import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavbarProps {
  onContactModalOpen: () => void;
}

const Navbar = ({ onContactModalOpen }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Health Systems Strengthening", href: "#services" },
    { name: "Financial Analysis & Economics", href: "#services"},
    { name: "Customized Research & Surveys", href: "#services" },
    { name: "Monitoring & Evaluation (M&E)", href: "#services" },
    { name: "Human Resource Management & Capacity Building", href: "#services" },
    { name: "Policy & Advocacy Development", href: "#services" },
    { name: "Project Management", href: "#services" },
  ];

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Resources", href: "#resources" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Lesar Consults"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            
            {/* What We Do Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center nav-link text-sm font-medium">
                What We Do <ChevronDown className="ml-1 h-4 w-4" />
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

            <Button
              onClick={onContactModalOpen}
              className="btn-primary"
            >
              Request a Proposal
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden bg-background border-t border-border shadow-card transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } fixed top-16 right-0 w-full h-screen overflow-y-auto z-40`}>
        <div className="px-4 py-4 space-y-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block nav-link text-base font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile What We Do Dropdown */}
          <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-base font-medium nav-link">
              What We Do
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                isServicesOpen ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2 mt-2">
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setIsServicesOpen(false);
                  }}
                >
                  {service.name}
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          <Button
            onClick={() => {
              onContactModalOpen();
              setIsOpen(false);
            }}
            className="btn-primary w-full mt-4"
          >
            Request a Proposal
          </Button>
        </div>
      </div>

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