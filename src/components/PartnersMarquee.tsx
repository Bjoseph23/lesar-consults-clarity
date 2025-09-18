import { useEffect, useRef, useState } from "react";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(18); // faster default
  const [paused, setPaused] = useState(false);

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
      // set CSS variable on marquee container
      container.style.setProperty("--marquee-translate", `-${distance}px`);
      // force repaint so animation uses updated value
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      marquee.offsetHeight;
    };

    // initial apply
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
    // set CSS variable used by the CSS rule
    container.style.setProperty("--animation-duration", `${animationSpeed}s`);
    container.style.setProperty("animation-play-state", paused ? "paused" : "running");
  }, [animationSpeed, paused]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  // Interaction handlers for manual scroll/drag
  const handlePointerDown = () => {
    // pause animation and allow horizontal scroll
    setPaused(true);
    const container = containerRef.current;
    if (container) {
      container.style.overflowX = "auto";
      container.style.cursor = "grabbing";
    }
  };

  const handlePointerUp = () => {
    // resume animation and hide scrollbar
    setPaused(false);
    const container = containerRef.current;
    if (container) {
      container.style.overflowX = "hidden";
      container.style.cursor = "grab";
    }
  };

  const handleMouseEnter = () => {
    // hint: pause on hover so desktop users can interact
    setPaused(true);
    const container = containerRef.current;
    if (container) {
      container.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    setPaused(false);
    const container = containerRef.current;
    if (container) {
      container.style.overflowX = "hidden";
      container.style.cursor = "default";
    }
  };

  return (
    <>
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary">
          Our Partners:
        </h2>
      </div>

      <section className="bg-cream/60 py-12" aria-label="Our partners and funders">
        <div className="relative max-w-7xl mx-auto">
          <div className="sr-only">Logos of partners and funders</div>

          {/* Marquee Container */}
          <div className="px-16">
            {/* containerRef is where we place the animation; marqueeRef holds the duplicated sets */}
            <div
              ref={containerRef}
              className="overflow-hidden"
              style={{
                // CSS variable defaults; JS will override --animation-duration and --marquee-translate
                // we keep overflow hidden by default
                // We are intentionally not setting animation-duration here; CSS uses --animation-duration var
              }}
              // user interactions
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={marqueeRef}
                className="flex will-change-transform"
                // no inline styles here — CSS below uses the variables
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

          /* Apply animation to the flex wrapper (the direct child of the overflow-hidden container) */
          .overflow-hidden > .flex {
            animation-name: partners-marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: var(--animation-duration, 18s);
            animation-play-state: running;
            will-change: transform;
            display: flex;
            align-items: center;
          }

          /* Show grabbing cursor affordance on desktop; switch to grabbing when pointer active */
          .overflow-hidden {
            cursor: grab;
          }
          .overflow-hidden:active {
            cursor: grabbing;
          }

          /* Small responsiveness to keep logos visible */
          @media (max-width: 768px) {
            .px-16 {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          /* hide scrollbar while not interacting */
          .overflow-hidden::-webkit-scrollbar {
            height: 8px;
          }
          /* when overflow is auto (during interaction) show a subtle scrollbar on desktop */
          .overflow-hidden[style*="overflow-x: auto"]::-webkit-scrollbar {
            height: 8px;
          }
        `}</style>
      </section>
    </>
  );
};

export default PartnersMarquee;
