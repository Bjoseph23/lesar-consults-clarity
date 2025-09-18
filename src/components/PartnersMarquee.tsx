import { useEffect, useRef, useState } from "react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const dragStateRef = useRef<{ down: boolean; startX: number; scrollLeft: number } | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(18); // faster default
  const [paused, setPaused] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);

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

  // compute translation distance: width of the first repeated set
  const computeDistance = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return 0;
    const firstSet = marquee.children[0] as HTMLElement | undefined;
    if (!firstSet) return 0;
    const rect = firstSet.getBoundingClientRect();
    return Math.round(rect.width);
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    const container = containerRef.current;
    if (!marquee || !container) return;

    // handle reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = () => {
      const prefersReduced = mq.matches;
      if (prefersReduced) {
        marquee.style.animationPlayState = "paused";
        setPaused(true);
      } else {
        marquee.style.animationPlayState = "running";
        setPaused(false);
      }
    };
    handleReducedMotion();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleReducedMotion);
    } else if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(handleReducedMotion);
    }

    // compute --marquee-translate and set as CSS var
    const applyDistance = () => {
      const distance = computeDistance();
      container.style.setProperty("--marquee-translate", `-${distance}px`);
      // force repaint
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      marquee.offsetHeight;
    };

    applyDistance();

    // update on resize (debounced)
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applyDistance();
        resizeTimer = null;
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handleReducedMotion);
      } else if (typeof (mq as any).removeListener === "function") {
        (mq as any).removeListener(handleReducedMotion);
      }
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, []);

  // Keep animation duration in sync with state and respect paused
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.setProperty("animation-duration", `${animationSpeed}s`);
    container.style.setProperty("animation-play-state", paused || userInteracting ? "paused" : "running");
  }, [animationSpeed, paused, userInteracting]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  // helpers to enable/disable user interaction mode (pauses animation and allows horizontal scrolling)
  const enterUserInteraction = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setUserInteracting(true);
    // ensure paused
    const container = containerRef.current;
    if (container) {
      container.style.overflowX = "auto";
      container.style.cursor = "grab";
      container.scrollLeft = container.scrollLeft; // no-op to ensure layout
    }
  };

  const scheduleExitUserInteraction = (delay = 2000) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setUserInteracting(false);
      const container = containerRef.current;
      if (container) {
        container.style.overflowX = "hidden";
        container.style.cursor = "";
      }
      resetTimerRef.current = null;
    }, delay);
  };

  // pointer drag handlers for marqueeRef
  useEffect(() => {
    const marquee = marqueeRef.current;
    const container = containerRef.current;
    if (!marquee || !container) return;

    const pointerDown = (e: PointerEvent) => {
      // only left button / touch
      // begin drag
      (e.target as Element).setPointerCapture?.(e.pointerId);
      enterUserInteraction();
      dragStateRef.current = {
        down: true,
        startX: e.clientX,
        scrollLeft: container.scrollLeft,
      };
      container.style.cursor = "grabbing";
    };

    const pointerMove = (e: PointerEvent) => {
      if (!dragStateRef.current || !dragStateRef.current.down) return;
      const dx = e.clientX - dragStateRef.current.startX;
      container.scrollLeft = dragStateRef.current.scrollLeft - dx;
    };

    const pointerUp = (e: PointerEvent) => {
      if (dragStateRef.current) {
        dragStateRef.current.down = false;
      }
      container.style.cursor = "";
      scheduleExitUserInteraction();
    };

    // For touch devices we also want to let native scrolling occur; but pointer events cover both
    marquee.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);

    // also pause on hover (desktop)
    const handleMouseEnter = () => {
      enterUserInteraction();
    };
    const handleMouseLeave = () => {
      scheduleExitUserInteraction();
    };
    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marquee.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // arrow click: scroll the container left or right smoothly and enter interaction mode briefly
  const scrollByAmount = (delta: number) => {
    const container = containerRef.current;
    if (!container) return;
    enterUserInteraction();
    // smooth scroll
    container.scrollBy({ left: delta, behavior: "smooth" });
    scheduleExitUserInteraction(1200); // resume sooner after arrow click
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

          {/* Left Arrow (extreme left) */}
          <button
            onClick={() => scrollByAmount(-200)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200 hidden md:inline-flex"
            aria-label="Scroll logos left"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right Arrow (extreme right) */}
          <button
            onClick={() => scrollByAmount(200)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-all duration-200 hidden md:inline-flex"
            aria-label="Scroll logos right"
          >
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Marquee Container */}
          <div className="px-16">
            {/* containerRef is where we place the animation; marqueeRef holds the duplicated sets */}
            <div
              ref={containerRef}
              className="overflow-hidden"
              style={{
                animationDuration: `${animationSpeed}s`,
                // overflowX toggled when user interacts
              }}
            >
              <div
                ref={marqueeRef}
                className="flex will-change-transform"
                // animation applied via CSS below
              >
                {/* First set of logos */}
                <div className="flex items-center gap-12 min-w-max justify-start partners-marquee-inner">
                  {partners.map((partner, index) => (
                    <div
                      key={`set1-${index}`}
                      className="flex-shrink-0"
                      aria-label={`${partner.name} logo`}
                    >
                      <img
                        src={`/logos/${partner.file}`}
                        alt={partner.name}
                        className={`${
                          partner.featured ? "h-16 md:h-20" : "h-9 md:h-12"
                        } object-contain filter grayscale opacity-90 mx-3`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex items-center gap-12 min-w-max justify-start partners-marquee-inner">
                  {partners.map((partner, index) => (
                    <div
                      key={`set2-${index}`}
                      className="flex-shrink-0"
                      aria-label={`${partner.name} logo`}
                    >
                      <img
                        src={`/logos/${partner.file}`}
                        alt={partner.name}
                        className={`${
                          partner.featured ? "h-16 md:h-20" : "h-9 md:h-12"
                        } object-contain filter grayscale opacity-90 mx-3`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline styles for marquee animation */}
        <style>{`
          /* container uses the CSS variable --marquee-translate (negative px) set from JS */
          @keyframes partners-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(var(--marquee-translate, -1000px));
            }
          }

          /* Apply animation to the flex wrapper (inside the overflow-hidden container) */
          .overflow-hidden > .flex {
            animation-name: partners-marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: var(--animation-duration, 18s);
            animation-play-state: running;
            will-change: transform;
          }

          /* Ensure when user interacts we can scroll horizontally */
          .overflow-hidden[style*="overflow-x: auto"] > .flex {
            /* pause handled via inline styles; allow overflow behavior */
          }

          @media (max-width: 768px) {
            .px-16 {
              padding-left: 1rem;
              padding-right: 1rem;
            }

            /* Show arrows on mobile too if desired: currently hidden via 'hidden md:inline-flex' */
          }
        `}</style>
      </section>
    </>
  );
};

export default PartnersMarquee;
