/* Replace only the Desktop Services dropdown (inside the navigation mapping) with this block */

{/* Services dropdown (clickable + hover to open on desktop) */}
<div key="Services" className="relative group">
  {/* Clickable Services link - navigates to /services */}
  <Link
    to="/services"
    className="flex items-center navbar-link text-sm font-medium transition-all duration-200"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Services <ChevronDown className="ml-1 h-4 w-4" />
  </Link>

  {/* Dropdown panel - shown on hover (desktop) using group-hover and hidden on small screens */}
  <div
    className="absolute left-0 mt-3 w-80 bg-white border border-border shadow-sm z-50 opacity-0 pointer-events-none transform translate-y-1 transition-all duration-200
               group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
               lg:block"
    role="menu"
    aria-label="Services submenu"
  >
    <div className="py-2">
      {services.map((service) => (
        <Link
          key={service.name}
          to={service.href}
          className="flex flex-col px-4 py-3 text-sm hover:bg-primary/90 transition-colors"
          role="menuitem"
          onClick={() => {
            /* ensure any mobile drawer is closed when navigating */
            setIsOpen(false);
          }}
        >
          <span className="font-medium text-navy hover:text-white transition-colors">
            {service.name}
          </span>
          <span className="text-xs text-navy/70 mt-1">
            {service.teaser}
          </span>
        </Link>
      ))}
    </div>
  </div>
</div>
