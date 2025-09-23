import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Scroll handler: **do not** update isScrolled while menu is open
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        // Keep header in the "open" visual state while menu is open
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Trap focus into panel when open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const firstFocusable = panelRef.current.querySelector<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }, [isOpen]);

  // Lock body scroll when panel is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";else document.body.style.overflow = originalOverflow || "";
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isOpen]);
  const services = [{
    name: "Health Systems Strengthening",
    href: "/services/health-systems-strengthening",
    teaser: "Evidence-based strategies for health system transformation"
  }, {
    name: "Financial Analysis & Economics",
    href: "/services/financial-analysis-economics",
    teaser: "Comprehensive financial modeling and economic evaluation"
  }, {
    name: "Research & Surveys",
    href: "/services/customized-research-analysis-surveys",
    teaser: "Rigorous research and independent coverage assessments"
  }, {
    name: "Monitoring & Evaluation",
    href: "/services/monitoring-evaluation",
    teaser: "Comprehensive M&E systems and impact evaluation"
  }, {
    name: "HR & Capacity Building",
    href: "/services/hr-management-capacity-building",
    teaser: "Human resource management and strategic training"
  }, {
    name: "Policy & Advocacy",
    href: "/services/policy-advocacy-development",
    teaser: "Evidence-based policy development and advocacy campaigns"
  }, {
    name: "Project Management",
    href: "/services/project-management",
    teaser: "Comprehensive project management and delivery"
  }];
  const navigation = [{
    name: "Home",
    href: "/"
  }, {
    name: "About",
    href: "/about"
  }, {
    name: "Team",
    href: "/team"
  }, {
    name: "Resources",
    href: "/resources"
  }, {
    name: "Services",
    href: "/services",
    isDropdown: true
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Resources",
    href: "#resources"
  }];

  // Nav background when scrolled or open
  const navBgClass = isOpen || isScrolled ? "bg-white shadow-md" : "bg-transparent";
  return <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" onClick={() => window.location.reload()} className="flex items-center" aria-label="Lesar Consults home">
              <img src="/lesar-logoo.png" alt="Lesar Consults" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map(item => {
            if (item.isDropdown) {
              return <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Link to={item.href} className="flex items-center navbar-link text-base font-medium transition-all duration-200">
                        {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                      </Link>
                    </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-80 bg-white border border-border shadow-sm z-50">
                       {services.map(service => <DropdownMenuItem key={service.name} asChild>
                           <Link to={service.href} className="flex flex-col px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                             <div className="font-medium text-navy hover:text-dark-red transition-colors">
                               {service.name}
                             </div>
                             <div className="text-xs text-navy/70 mt-1">
                               {service.teaser}
                             </div>
                           </Link>
                         </DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>;
            }
            const isActive = item.href.startsWith('/') && location.pathname === item.href;
            const linkClasses = `navbar-link text-base font-medium transition-all duration-200 ${isActive ? 'navbar-link-active' : ''}`;
            return item.href.startsWith('/') ? <Link key={item.name} to={item.href} className={linkClasses}>
                  {item.name}
                </Link> : <a key={item.name} href={item.href} className={linkClasses}>
                  {item.name}
                </a>;
          })}

            {/* Request a Proposal - desktop: use Link as child to keep styles and avoid full page reload */}
            <Button asChild className="btn-primary cta-glisten">
              <Link to="/contact">
                Request a Proposal
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(prev => !prev)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} className="p-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Menu className={`h-7 w-7 absolute transition-all duration-300 transform ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                <X className={`h-7 w-7 absolute transition-all duration-300 transform ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay behind drawer (dims page content) */}
      <div aria-hidden={!isOpen} onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      {/* Fullscreen drawer container (guarantees full height independent of header) */}
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" className={`fixed inset-0 z-50 pointer-events-none`}>
        {/* Right-side drawer box but container is full viewport */}
        <aside className={`pointer-events-auto absolute top-0 right-0 h-full w-full sm:max-w-md bg-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <img src="/lesar-logoo.png" alt="Lesar Consults" className="h-10 w-auto" />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-3">
              <X className="h-7 w-7" />
            </Button>
          </div>

          <nav className="px-4 py-6 space-y-6 overflow-y-auto h-full min-h-screen">
            {navigation.map(item => {
            if (item.isDropdown) {
              return <div key={item.name}>
                    <p className="text-base font-semibold mb-2">{item.name}</p>
                    <div className="space-y-2 pl-2">
                      {services.map(service => <a key={service.name} href={service.href} className="block text-sm text-gray-700 hover:text-primary transition-colors py-2 px-3 rounded-md border border-border/20 hover:bg-muted/30" onClick={() => setIsOpen(false)}>
                          {service.name}
                        </a>)}
                    </div>
                  </div>;
            }
            const isActive = item.href.startsWith('/') && location.pathname === item.href;
            const mobileLinkClasses = `block text-base font-medium transition-colors py-3 px-4 rounded-lg border border-border/30 ${isActive ? 'text-primary bg-primary/5 border-primary/20' : 'text-gray-900 hover:text-primary hover:bg-muted/50'}`;
            return item.href.startsWith('/') ? <Link key={item.name} to={item.href} className={mobileLinkClasses} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link> : <a key={item.name} href={item.href} className={mobileLinkClasses} onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>;
          })}

            <div className="mt-4">
              {/* Request a Proposal - mobile: Link as child to preserve styling and close drawer on click */}
              <Button asChild className="btn-primary cta-glisten w-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Request a Proposal
                </Link>
              </Button>
            </div>

            
          </nav>
        </aside>
      </div>

      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-60">
        Skip to content
      </a>
    </nav>;
};
export default Navbar;