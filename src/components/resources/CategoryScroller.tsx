import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CategoryScrollerProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryScroller = ({ categories, selectedCategory, setSelectedCategory }: CategoryScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="py-8 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm",
                !canScrollLeft && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm",
                !canScrollRight && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Category Pills */}
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide md:px-8 scroll-smooth"
            onScroll={checkScrollPosition}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-pressed={isSelected}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="md:hidden flex justify-center mt-4 space-x-2">
            {canScrollLeft && (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            )}
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            {canScrollRight && (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryScroller;