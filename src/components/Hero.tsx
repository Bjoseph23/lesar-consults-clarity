import React, { useRef } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onContactModalOpen: () => void;
}

const Hero = ({ onContactModalOpen }: HeroProps) => {
  // updated to include all 9 partners in the requested order
  const partners = [
    "USAID",
    "WORLD BANK",
    "UNICEF",
    "NAIROBI COUNTY",
    "MINISTRY OF HEALTH",
    "AMREF",
    "KENYA RED CROSS",
    "DFID",
    "WELCOME",
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  // ref to the partner row so arrows can scroll it
  const partnersRef = useRef<HTMLDivElement | null>(null);

  const scrollPartners = (direction: "left" | "right") => {
    const el = partnersRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.5, 200); // scroll half the visible width or at least 200px
    const left = direction === "left" ? -scrollAmount : scrollAmount;
    el.scrollBy({ left, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-subtle pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 text-balance">
            Demystifying opinions in health systems, economics and analytics
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Premier data, research and analytics consultancy firm serving as a hub
            of innovation and excellence to deliver evidence-based solutions
            across East Africa and beyond.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onContactModalOpen}
              className="btn-primary text-lg px-8 py-4"
              size="lg"
            >
              Request a Proposal
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="outline"
              className="btn-secondary text-lg px-8 py-4"
              size="lg"
            >
              View Our Work
            </Button>
          </div>

          {/* Trust Line and Partners */}
          <div className="animate-slide-up">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by leading international organizations and government
              agencies
            </p>

            {/* Partner Logos Row with arrows */}
            <div className="relative flex items-center">
              {/* Left arrow */}
              <button
                aria-label="Scroll partners left"
                onClick={() => scrollPartners("left")}
                className="absolute left-0 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md -ml-2"
                type="button"
              >
                {/* simple arrow svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                ref={partnersRef}
                className="w-full overflow-x-auto scrollbar-hide px-8 py-2"
                role="list"
                aria-label="Partner logos"
              >
                <div className="flex gap-8 items-center">
                  {partners.map((partner, index) => (
                    <div
                      key={partner}
                      role="listitem"
                      className="text-sm font-medium text-muted-foreground bg-card px-4 py-2 rounded-lg border border-border hover:border-primary/20 transition-colors cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      tabIndex={0}
                      title={partner}
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                aria-label="Scroll partners right"
                onClick={() => scrollPartners("right")}
                className="absolute right-0 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md -mr-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
