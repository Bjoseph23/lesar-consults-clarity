import { useEffect, useRef } from "react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: "USAID", file: "usaid-logo.png" },
    { name: "World Bank", file: "worldbank-logo.png" },
    { name: "UNICEF", file: "unicef-logo.png" },
    { name: "Nairobi County", file: "nairobi-county-logo.png" },
    { name: "Ministry of Health", file: "ministry-of-health-logo.png" },
    { name: "AMREF", file: "amref-logo.png" },
    { name: "Kenya Red Cross", file: "redcross-logo.png" },
    { name: "DFID", file: "dfid-logo.png" },
    { name: "Wellcome", file: "welcome-logo.png" },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const handleReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        marquee.style.animationPlayState = 'paused';
      }
    };

    handleReducedMotion();
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleReducedMotion);

    return () => {
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return (
    <section className="bg-cream py-8 overflow-hidden" aria-label="Our partners and funders">
      <div className="relative">
        <div className="sr-only">Logos of partners and funders</div>
        <div 
          ref={marqueeRef}
          className="flex animate-marquee hover:pause-animation focus-within:pause-animation"
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {/* First set of logos */}
          <div className="flex items-center gap-8 min-w-full">
            {partners.map((partner, index) => (
              <div
                key={`set1-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                tabIndex={0}
                title={partner.name}
                aria-label={`${partner.name} logo`}
              >
                <img
                  src={`/logos/${partner.file}`}
                  alt={partner.name}
                  className="h-9 md:h-12 object-contain filter grayscale opacity-90 
                           group-hover:scale-103 group-focus:scale-103 transition-transform duration-200
                           mx-5"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-8 min-w-full">
            {partners.map((partner, index) => (
              <div
                key={`set2-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                tabIndex={0}
                title={partner.name}
                aria-label={`${partner.name} logo`}
              >
                <img
                  src={`/logos/${partner.file}`}
                  alt={partner.name}
                  className="h-9 md:h-12 object-contain filter grayscale opacity-90 
                           group-hover:scale-103 group-focus:scale-103 transition-transform duration-200
                           mx-5"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;