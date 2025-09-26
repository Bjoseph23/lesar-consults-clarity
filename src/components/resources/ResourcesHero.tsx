import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useDesktopFocus } from "@/hooks/useDesktopFocus";

interface ResourcesHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  types: { value: string; label: string }[];
  years: number[];
}

const ResourcesHero = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
  types,
  years
}: ResourcesHeroProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { elementRef: heroRef, isVisible } = useScrollAnimation();
  const shouldAutoFocus = useDesktopFocus();

  // Sample keywords for autocomplete
  const keywords = [
    'mental health',
    'strategic planning',
    'monitoring and evaluation',
    'health systems',
    'Nairobi County',
    'case study',
    'strategic plan',
    'community health',
    'primary healthcare',
    'health policy',
    'project management',
    'data analysis',
    'stakeholder engagement'
  ];

  // Focus search input on load (desktop only)
  useEffect(() => {
    if (shouldAutoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [shouldAutoFocus]);

  // Handle search input with debounced suggestions
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length > 1) {
        const filtered = keywords.filter(keyword =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        setSearchSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <section 
      ref={heroRef}
      className={`py-20 bg-gradient-to-br from-primary/5 to-accent/5 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Knowledge Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Access our comprehensive collection of research, insights, and strategic frameworks 
            from projects across health systems strengthening in Africa
          </p>
        </div>

        {/* Search Section */}
        <div className="space-y-6">
          {/* Main Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search resources, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-4 py-4 text-lg h-14 bg-background border-2 border-border focus:border-primary rounded-lg shadow-sm"
                aria-label="Search resources"
              />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-2 z-50">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center">
                      <Search className="w-4 h-4 mr-3 text-muted-foreground" />
                      {suggestion}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {/* Topic Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Topic:</span>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 bg-background border-border">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedType !== 'all' || selectedYear !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedYear('all');
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;