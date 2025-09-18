import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onContactModalOpen: () => void;
}

const Navbar = ({ onContactModalOpen }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Lesar Consults" className="h-8 w-auto" />
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

            <Button onClick={onContactModalOpen} className="btn-primary">
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
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-card">
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.name}>
                    <p className="text-base font-medium py-2">{item.name}</p>
                    <div className="pl-2">
                      {services.map((service) => (
                        <a
                          key={service.name}
                          href={service.href}
                          className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
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
                  className="block nav-link text-base font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}

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
      )}

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
