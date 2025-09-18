import { useEffect, useRef, useState } from "react";

const PartnersMarquee = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // refs for RAF loop
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const setWidthRef = useRef<number>(0);

  // user interaction flags
  const userInteractingRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);

  // speed: seconds per single set width loop (lower = faster). Reduced slightly to 28s for a bit faster scroll.
  const [loopSeconds] = useState<number>(28);

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
    { name: "University of Nairobi", file: "uon-logo.png", featured: true },
  ];

  // Preload images (first renders) so next logos are ready when arrows scroll
  useEffect(() => {
    partners.forEach(p => {
      const img = new Image();
      img.src = `/logos/${p.file}`;
    });
  }, [partners]);

  // compute width of a single repeated set
  const computeSetWidth = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return 0;
    const firstSet = marquee.children[0] as HTMLElement | undefined;
    if (!firstSet) return 0;
    return Math.round(firstSet.getBoundingClientRect().width);
  };

  // normalize scrollLeft into [0, setWidth)
  const normalizeScroll = (setWidth: number) => {
    const container = containerRef.current;
    if (!container || !setWidth) return;
    const cur = container.scrollLeft;
    const mod = ((cur % setWidth) + setWidth) % setWidth;
    container.scrollLeft = mod;
  };

  // schedule resume auto-loop shortly after interaction
  const scheduleResume = (delay = 300) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    resumeTimerRef.current = window.setTimeout(() => {
      userInteractingRef.current = false;
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    }, delay);
  };

  // arrow scroll helper — uses smooth scroll and prevents long stall
  const scrollByAmount = (delta: number) => {
    const container = containerRef.current;
    if (!container) return;
    userInteractingRef.current = true;
    // smooth scroll by delta px
    container.scrollBy({ left: delta, behavior: "smooth" });
    // resume auto loop shortly after smooth scroll finishes
    scheduleResume(600);
  };

  useEffect(() => {
    const container = containerRef.current;
    const marquee = marqueeRef.current;
    if (!container || !marquee) return;

    // respect reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReduced = mq.matches;
    const handleReduced = () => {
      prefersReduced = mq.matches;
      if (prefersReduced) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        // reset lastTsRef so RAF delta doesn't jump
        lastTsRef.current = null;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(loop);
        }
      }
    };
    // the loop function declared later — hoist via let binding
    // prepare set width and normalize scroll pos
    const applySetWidth = () => {
      const w = computeSetWidth();
      setWidthRef.current = Math.max(1, w);
      normalizeScroll(setWidthRef.current);
    };

    applySetWidth();

    // RAF step (declared here so handleReduced can reference it)
    const loop = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      // safety guard
      const setW = setWidthRef.current;
      if (!prefersReduced && !userInteractingRef.current && setW > 0) {
        // px per ms to complete one set in loopSeconds
        const pxPerMs = setW / (loopSeconds * 1000);
        let next = container.scrollLeft + pxPerMs * dt;

        // when we pass TWO set widths (we render 3 sets), subtract ONE set width
        const threshold = setW * 2;
        if (next >= threshold) {
          next = next - setW;
        } else if (next < 0) {
          next = next + setW;
        }

        // apply
        if (!Number.isNaN(next) && isFinite(next)) {
          container.scrollLeft = next;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // start RAF if not reduced motion
    if (!prefersReduced && !rafRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }

    // visibilitychange handling: pause when hidden, resume when visible
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        lastTsRef.current = null;
      } else {
        // recalc width (in case layout changed while hidden)
        applySetWidth();
        lastTsRef.current = null;
        if (!prefersReduced && !rafRef.current) {
          rafRef.current = requestAnimationFrame(loop);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // handle resize (debounced)
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const oldW = setWidthRef.current || 1;
        applySetWidth();
        const ratio = container.scrollLeft / oldW;
        container.scrollLeft = ratio * setWidthRef.current;
        resizeTimer = null;
      }, 120);
    };
    window.addEventListener("resize", handleResize);

    // interactions: pointer/touch/wheel set userInteracting and schedule resume
    const onPointerDown = () => {
      userInteractingRef.current = true;
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };
    const onPointerUp = () => scheduleResume(400);
    const onWheel = () => {
      userInteractingRef.current = true;
      scheduleResume(400);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchend", onPointerUp);

    // attach mq change listener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleReduced);
    } else if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(handleReduced);
    }

    return () => {
      // cleanup RAF and listeners
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchend", onPointerUp);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handleReduced);
      } else if (typeof (mq as any).removeListener === "function") {
        (mq as any).removeListener(handleReduced);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopSeconds]);

  // ensure set width is computed after images load (give small delay)
  useEffect(() => {
    const t = window.setTimeout(() => {
      const w = computeSetWidth();
      setWidthRef.current = Math.max(1, w);
      normalizeScroll(setWidthRef.current);
    }, 220);
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
            <div ref={containerRef} className="overflow-x-auto overflow-y-hidden -mx-4 px-4">
              <div ref={marqueeRef} className="flex will-change-transform">
                {/* render three sets to provide buffer for seamless wrap */}
                {[0, 1, 2].map(setIndex => (
                  <div key={setIndex} className="flex items-center gap-12 min-w-max justify-start">
                    {partners.map((partner, i) => (
                      <div key={`s${setIndex}-${i}`} className="flex-shrink-0" aria-label={`${partner.name} logo`}>
                        <img
                          src={`/logos/${partner.file}`}
                          alt={partner.name}
                          className={`${partner.featured ? "h-20 md:h-24" : "h-12 md:h-16"} object-contain filter grayscale opacity-90 mx-3`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                ))}
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
