import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselSlide {
  id: number;
  title: string;
  caption: string;
  image: string;
}

interface Image3DCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const Image3DCarousel = ({ slides, autoPlayInterval = 4000 }: Image3DCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 50);
      });
    }, 50);

    const slideInterval = setInterval(nextSlide, autoPlayInterval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isAutoPlaying, autoPlayInterval, nextSlide]);

  // Pause on hover/focus
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getSlidePosition = (index: number) => {
    const diff = index - currentSlide;
    const total = slides.length;

    if (diff === 0) return "center";
    if (diff === 1 || diff === -(total - 1)) return "right";
    if (diff === -1 || diff === (total - 1)) return "left";
    return "hidden";
  };

  const getSlideStyle = (position: string, isMobile: boolean = false) => {
    if (isMobile) {
      // On mobile, hide all except center completely (no overflow)
      switch (position) {
        case "center":
          return {
            transform: "translateX(0%) scale(1)",
            zIndex: 30,
            opacity: 1,
            pointerEvents: "auto" as const,
            cursor: "default",
            display: "block",
          };
        default:
          return {
            display: "none",
          };
      }
    }

    switch (position) {
      case "center":
        return {
          transform: "translateX(0%) scale(1)",
          zIndex: 30,
          opacity: 1,
          pointerEvents: "auto" as const,
          cursor: "default",
        };
      case "right":
        return {
          transform: "translateX(30%) scale(0.85)",
          zIndex: 20,
          opacity: 0.9,
          pointerEvents: "auto" as const,
          cursor: "pointer",
        };
      case "left":
        return {
          transform: "translateX(-30%) scale(0.85)",
          zIndex: 20,
          opacity: 0.9,
          pointerEvents: "auto" as const,
          cursor: "pointer",
        };
      default:
        return {
          display: "none",
        };
    }
  };

  return (
    <section className="py-16 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Our Impact in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how we're transforming health systems across East Africa
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Carousel container with navigation */}
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 overflow-hidden">
          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white shadow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white shadow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel content */}
          <div
            className="relative mx-auto overflow-hidden px-8 sm:px-12"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            role="region"
            aria-label="Image carousel"
            aria-live="polite"
          >
            <div className="relative h-80 md:h-96">
              <div className="relative w-full h-full flex items-center justify-center">
                {slides.map((slide, index) => {
                  const position = getSlidePosition(index);
                  const slideStyle = getSlideStyle(position, isMobile);

                  const isInteractive =
                    !isMobile && (position === "left" || position === "right");

                  return (
                    <div
                      key={slide.id}
                      className={`absolute transition-all duration-700 ease-out ${
                        isMobile
                          ? "w-full max-w-xs mx-auto"
                          : "w-2/3 max-w-lg"
                      } h-full`}
                      style={{
                        ...slideStyle,
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (isInteractive) goToSlide(index);
                        }}
                        onKeyDown={(e) => {
                          if (
                            isInteractive &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            goToSlide(index);
                          }
                        }}
                        role={isInteractive ? "button" : undefined}
                        tabIndex={isInteractive ? 0 : -1}
                        aria-label={
                          isInteractive
                            ? `Activate slide ${index + 1}`
                            : undefined
                        }
                        className={`relative w-full h-full rounded-2xl overflow-hidden ${
                          position === "center"
                            ? "shadow-2xl"
                            : "shadow-lg"
                        } ${isInteractive ? "cursor-pointer" : ""}`}
                        style={{
                          filter:
                            position !== "center"
                              ? "brightness(0.85) saturate(0.9)"
                              : "none",
                        }}
                      >
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                        {position === "center" && (
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
                              {slide.title}
                            </h3>
                            <p className="text-sm md:text-base opacity-90">
                              {slide.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary scale-125"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Image3DCarousel;
