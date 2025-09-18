import { useEffect, useRef, useState } from "react";

const PartnersMarquee = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // refs for animation loop
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const distanceRef = useRef<number>(0);

  // user interaction / pause control
  const userInteractingRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);

  // speed: seconds per full loop (lower = faster)
  const [loopSeconds] = useState<number>(18);

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

  // compute width of first repeated set (distance to scroll)
  const computeDistance = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return 0;
    const firstSet = marquee.children[0] as HTMLElement | undefined;
    if (!firstSet) return 0;
    return Math.round(firstSet.getBoundingClientRect().width);
  };

  // normalize scrollLeft to within [0, distance)
  const normalizeScrollLeft = (distance: number) => {
    const container = containerRef.current;
    if (!container || !distance) return;
    const cur = container.scrollLeft;
    const mod = ((cur % distance) + distance) % distance; // safe modulo
    container.scrollLeft = mod;
  };

  // schedule resume (short delay after user interaction)
  const scheduleResume = (delay = 900) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    resumeTimerRef.current = window.setTimeout(() => {
      userInteractingRef.current = false;
      resumeTimerRef.current && clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }, delay);
  };

  // arrow-driven scroll: perform smooth scroll and briefly mark user interaction
  const scrollByAmount = (delta: number) => {
    const container = containerRef.current;
    if (!container) return;
    // flag user interaction to avoid auto-scroll fighting the smooth scroll
    userInteractingRef.current = true;
    container.scrollBy({ left: delta, behavior: "smooth" });
    scheduleResume(900); // resume auto-scroll shortly after smooth scroll finishes
  };

  // animation loop: updates container.scrollLeft using pixels per ms
  useEffect(() => {
    const container = containerRef.current;
    const marquee = marqueeRef.current;
    if (!container || !marquee) return;

    // respect reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = mq.matches;

    // compute distance initially
    const applyDistance = () => {
      const distance = computeDistance();
      distanceRef.current = Math.max(1, distance); // avoid division by zero
      // ensure scrollLeft is in range
      normalizeScrollLeft(distanceRef.current);
    };
    applyDistance();

    // RAF step
    const step = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!prefersReduced && !userInteractingRef.current) {
        const distance = distanceRef.current;
        if (distance > 0) {
          // pixels per ms to complete one loop in loopSeconds
          const pxPerMs = distance / (loopSeconds * 1000);
          let next = container.scrollLeft + pxPerMs * dt;

          // wrap-around seamlessly using duplicate set
          if (next >= distance) {
            next = next - distance;
          } else if (next < 0) {
            next = next + distance;
          }
          container.scrollLeft = next;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    // handle resize: recompute distance and adjust scrollLeft proportionally
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const oldDistance = distanceRef.current || 1;
        applyDistance();
        // preserve relative position
        const containerCur = container.scrollLeft;
        const ratio = (oldDistance ? containerCur / oldDistance : 0);
        container.scrollLeft = ratio * distanceRef.current;
        resizeTimer = null;
      }, 120);
    };
    window.addEventListener("resize", handleResize);

    // pointer/touch/wheel interactions: mark as userInteracting and schedule resume
    const onPointerDown = () => {
      userInteractingRef.current = true;
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };
    const onPointerUp = () => {
      scheduleResume(800);
    };
    const onWheel = () => {
      userInteractingRef.current = true;
      scheduleResume(800);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchend", onPointerUp);

    return () => {
      // cleanup
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchend", onPointerUp);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopSeconds]);

  // recompute distance on mount and when partner list changes
  useEffect(() => {
    const applyDistanceOnce = () => {
      const distance = computeDistance();
      distanceRef.current = Math.max(1, distance);
      normalizeScrollLeft(distanceRef.current);
    };
    // small delay to allow images to load & layout to settle
    const t = window.setTimeout(applyDistanceOnce, 120);
    return () => clearTimeout(t);
  }, [partners.length]);

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary">Our Partners:</h2>
      </div>

      <section className="bg-cream/60 py-12" aria-label="Our partners and funders">
        <div className="relative max-w-7xl mx-auto">
          <div className="sr-only">Logos of partners and funders</div>

          {/* Left Arrow */}
          <button
            onClick={() => scrollByAmount(-250)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200 hidden md:inline-flex"
            aria-label="Scroll logos left"
            type="button"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollByAmount(250)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200 hidden md:inline-flex"
            aria-label="Scroll logos right"
            type="button"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="px-16">
            <div
              ref={containerRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 px-4"
              // container is always scrollable by user; scrollbar is hidden by CSS below
            >
              <div ref={marqueeRef} className="flex will-change-transform">
                {/* first set */}
                <div className="flex items-center gap-12 min-w-max justify-start">
                  {partners.map((partner, i) => (
                    <div key={`s1-${i}`} className="flex-shrink-0" aria-label={`${partner.name} logo`}>
                      <img
                        src={`/logos/${partner.file}`}
                        alt={partner.name}
                        className={`${partner.featured ? "h-16 md:h-20" : "h-9 md:h-12"} object-contain filter grayscale opacity-90 mx-3`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* duplicated set */}
                <div className="flex items-center gap-12 min-w-max justify-start">
                  {partners.map((partner, i) => (
                    <div key={`s2-${i}`} className="flex-shrink-0" aria-label={`${partner.name} logo`}>
                      <img
                        src={`/logos/${partner.file}`}
                        alt={partner.name}
                        className={`${partner.featured ? "h-16 md:h-20" : "h-9 md:h-12"} object-contain filter grayscale opacity-90 mx-3`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          /* Hide scrollbars but keep scrolling enabled */
          .overflow-x-auto {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
          .overflow-x-auto::-webkit-scrollbar {
            display: none; /* Safari/WebKit */
          }
          
          /* small responsive padding */
          @media (max-width: 768px) {
            .px-16 {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default PartnersMarquee;
