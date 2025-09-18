import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const partners = [
    { name: "USAID", file: "usaid-logo.png", featured: false },
    { name: "World Bank", file: "worldbank-logo.png", featured: true },
    { name: "UNICEF", file: "unicef-logo.png", featured: false },
    { name: "Nairobi County", file: "nairobi-county-logo.png", featured: true },
    { name: "Ministry of Health", file: "ministry-of-health-logo.png", featured: true },
    { name: "AMREF", file: "amref-logo.png", featured: true },
    { name: "Kenya Red Cross", file: "redcross-logo.png", featured: true },
    { name: "DFID", file: "dfid-logo.png", featured: false },
    { name: "Wellcome", file: "welcome-logo.png", featured: false },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const handleReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsPaused(true);
      }
    };

    handleReducedMotion();
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleReducedMotion);

    return () => {
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleReducedMotion);
    };
  }, []);

  const handleScrollLeft = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationDirection = 'reverse';
      setTimeout(() => {
        if (marqueeRef.current) {
          marqueeRef.current.style.animationDirection = 'normal';
        }
      }, 1000);
    }
  };

  const handleScrollRight = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationDuration = '15s';
      setTimeout(() => {
        if (marqueeRef.current) {
          marqueeRef.current.style.animationDuration = '30s';
        }
      }, 1000);
    }
  };

  return (
    <section className="bg-cream/60 py-12 overflow-hidden" aria-label="Our partners and funders">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary">
          Our Partners:
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="sr-only">Logos of partners and funders</div>
        
        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Scroll partners left"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Scroll partners right"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Marquee Container */}
        <div className="px-16">
          <div 
            ref={marqueeRef}
            className={`flex ${isPaused ? '' : 'animate-marquee'} hover:pause-animation focus-within:pause-animation`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* First set of logos */}
            <div className="flex items-center gap-12 min-w-full justify-between">
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
                    className={`${partner.featured ? 'h-16 md:h-20' : 'h-9 md:h-12'} object-contain filter grayscale opacity-90 
                             group-hover:scale-103 group-focus:scale-103 transition-transform duration-200
                             mx-3`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop - with gap to prevent overlap */}
            <div className="flex items-center gap-12 min-w-full justify-between ml-12">
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
                    className={`${partner.featured ? 'h-16 md:h-20' : 'h-9 md:h-12'} object-contain filter grayscale opacity-90 
                             group-hover:scale-103 group-focus:scale-103 transition-transform duration-200
                             mx-3`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;