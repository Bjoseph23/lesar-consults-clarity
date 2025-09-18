import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const resetTimerRef = useRef<number | null>(null);
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
      } else {
        // ensure it runs if user toggles preference off
        marquee.style.animationPlayState = 'running';
      }
    };

    handleReducedMotion();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Some browsers require addEventListener; fall back to addListener if missing
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener('change', handleReducedMotion);
    } else if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(handleReducedMotion);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener('change', handleReducedMotion);
      } else if (typeof (mq as any).removeListener === "function") {
        (mq as any).removeListener(handleReducedMotion);
      }
    };
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      // directly update the CSS animation duration
      marqueeRef.current.style.animationDuration = `${animationSpeed}s`;
      // ensure it is playing when speed is changed
      marqueeRef.current.style.animationPlayState = 'running';
    }
  }, [animationSpeed]);

  useEffect(() => {
    return () => {
      // cleanup any pending timers on unmount
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    // clear previous timer if any
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    // reset after 2s (2000ms)
    resetTimerRef.current = window.setTimeout(() => {
      setAnimationSpeed(30);
      resetTimerRef.current = null;
    }, 2000);
  };

  const handleSpeedLeft = () => {
    // Make left arrow speed up marquee (lower duration) — ensure min 5s
    setAnimationSpeed(prev => Math.max(5, prev - 5));
    // ensure CSS animation is running
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running';
    scheduleReset();
  };

  const handleSpeedRight = () => {
    // Make right arrow slow marquee (increase duration) — ensure max is kept reasonable
    setAnimationSpeed(prev => Math.min(60, prev + 5));
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running';
    scheduleReset();
  };

  return (
    <>
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary">
          Our Partners:
        </h2>
      </div>
      
      <section className="bg-cream/60 py-12 overflow-hidden" aria-label="Our partners and funders">

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
            <div className="flex items-center gap-12 min-w-max justify-start">
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
            <div className="flex items-center gap-12 min-w-max justify-start ml-6">
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
    </>
  );
};

export default PartnersMarquee;
