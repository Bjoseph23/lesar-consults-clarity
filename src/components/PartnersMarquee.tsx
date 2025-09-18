import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [animationSpeed, setAnimationSpeed] = useState(30);

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
        marquee.style.animationPlayState = 'paused';
      }
    };

    handleReducedMotion();
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleReducedMotion);

    return () => {
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationDuration = `${animationSpeed}s`;
    }
  }, [animationSpeed]);

  const handleSpeedLeft = () => {
    setAnimationSpeed(prev => Math.max(5, prev - 5)); // Speed up (lower duration)
    setTimeout(() => {
      setAnimationSpeed(30); // Reset to normal speed after 2 seconds
    }, 2000);
  };

  const handleSpeedRight = () => {
    setAnimationSpeed(prev => Math.max(5, prev - 5)); // Speed up (lower duration)
    setTimeout(() => {
      setAnimationSpeed(30); // Reset to normal speed after 2 seconds
    }, 2000);
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
          onClick={handleSpeedLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200"
          aria-label="Speed up marquee left"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleSpeedRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200"
          aria-label="Speed up marquee right"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Marquee Container */}
        <div className="px-16">
          <div 
            ref={marqueeRef}
            className="flex animate-marquee"
            style={{ animationDuration: `${animationSpeed}s` }}
          >
            {/* First set of logos */}
            <div className="flex items-center gap-12 min-w-full justify-between">
              {partners.map((partner, index) => (
                <div
                  key={`set1-${index}`}
                  className="flex-shrink-0"
                  aria-label={`${partner.name} logo`}
                >
                  <img
                    src={`/logos/${partner.file}`}
                    alt={partner.name}
                    className={`${partner.featured ? 'h-16 md:h-20' : 'h-9 md:h-12'} object-contain filter grayscale opacity-90 mx-3`}
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
                  className="flex-shrink-0"
                  aria-label={`${partner.name} logo`}
                >
                  <img
                    src={`/logos/${partner.file}`}
                    alt={partner.name}
                    className={`${partner.featured ? 'h-16 md:h-20' : 'h-9 md:h-12'} object-contain filter grayscale opacity-90 mx-3`}
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