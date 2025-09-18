import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PartnersMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(30);
  const [paused, setPaused] = useState(false);
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();

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
      // also force repaint so animation uses updated value
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
    container.style.setProperty("animation-duration", `${animationSpeed}s`);
    container.style.setProperty("animation-play-state", paused ? "paused" : "running");
  }, [animationSpeed, paused]);

  // removed button logic — but keep the reset timer utility in case you want to reuse
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Section Title */}
      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary">
          Our Partners:
        </h2>
      </div>

      <section ref={sectionRef} className={`bg-cream/60 py-12 overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} aria-label="Our partners and funders">
        <div className="relative max-w-7xl mx-auto">
          <div className="sr-only">Logos of partners and funders</div>

          {/* Marquee Container */}
          <div className="px-16">
            {/* containerRef is where we place the animation; marqueeRef holds the duplicated sets */}
            <div
              ref={containerRef}
              className="overflow-hidden"
              // CSS variables used by the internal keyframes (see style tag below)
              style={{
                // default animation-duration will be overridden by useEffect
                animationDuration: `${animationSpeed}s`,
              }}
            >
              <div
                ref={marqueeRef}
                className="flex will-change-transform"
                // keep the original classes; animation is defined in the style tag below and uses --marquee-translate
                style={{
                  // NOTE: actual animation applied via the CSS rule below that targets .partners-marquee-inner
                }}
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
          .partners-marquee-inner {
            /* nothing here — each inner set holds logos */
          }

          /* animate the parent flex that contains the two sets */
          /* The animation moves from 0 to the negative width of one set (var --marquee-translate) */
          @keyframes partners-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(var(--marquee-translate, -1000px));
            }
          }

          /* Apply animation to the flex wrapper (the direct child of the overflow-hidden container) */
          .partners-marquee-inner:first-child {
            /* no-op */
          }
          /* We put the animation on the flex itself via the inline container wrapper rules */
          div[style] > div[ref] {
            /* no-op for TSX parsing; kept intentionally blank */
          }

          /* Instead target the marquee wrapper via a more general selector: */
          .overflow-hidden > .flex {
            animation-name: partners-marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: var(--animation-duration, 30s);
            animation-play-state: running;
          }

          /* Small responsiveness to keep logos visible */
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
