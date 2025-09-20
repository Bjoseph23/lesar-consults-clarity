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
        return prev + (100 / (autoPlayInterval / 50));
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
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getSlidePosition = (index: number) => {
    const diff = index - currentSlide;
    const total = slides.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(total - 1)) return 'right';
    if (diff === -1 || diff === (total - 1)) return 'left';
    return 'hidden';
  };

  const getSlideStyle = (position: string) => {
    switch (position) {
      case 'center':
        return {
          transform: 'translateX(0%) scale(1)',
          zIndex: 30,
          opacity: 1,
        };
      case 'right':
        return {
          transform: 'translateX(60%) scale(0.85)',
          zIndex: 10,
          opacity: 0.7,
        };
      case 'left':
        return {
          transform: 'translateX(-60%) scale(0.85)',
          zIndex: 10,
          opacity: 0.7,
        };
      default:
        return {
          transform: 'translateX(100%) scale(0.8)',
          zIndex: 0,
          opacity: 0,
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


        {/* Carousel container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          role="region"
          aria-label="Image carousel"
          aria-live="polite"
        >
          <div className="relative h-80 md:h-96 overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center">
              {slides.map((slide, index) => {
                const position = getSlidePosition(index);
                const slideStyle = getSlideStyle(position);
                
                return (
                  <div
                    key={slide.id}
                    className="absolute w-full h-full transition-all duration-700 ease-out"
                    style={{
                      ...slideStyle,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div 
                      className={`relative w-full h-full rounded-2xl overflow-hidden ${
                        position === 'center' ? 'shadow-2xl' : 'shadow-lg'
                      }`}
                      style={{
                        filter: position !== 'center' ? 'brightness(0.8) saturate(0.8)' : 'none',
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      {position === 'center' && (
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

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-border hover:bg-muted-foreground'
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