import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import ResourcesHero from "@/components/resources/ResourcesHero";
import CategoryScroller from "@/components/resources/CategoryScroller";
import ResourceFilters from "@/components/resources/ResourceFilters";
import ResourceCard from "@/components/resources/ResourceCard";
import SortFilterModal from "@/components/resources/SortFilterModal";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  tags: string[];
  type: 'article' | 'case_study' | 'report' | 'tool' | 'download';
  thumbnail_url: string | null;
  author: string | null;
  published_at: string;
  year: number | null;
  featured: boolean;
}

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const { elementRef: gridRef, isVisible } = useScrollAnimation();

  // Available categories and years for filters
  const categories = ['All', 'Health', 'Mental Health', 'Monitoring & Evaluation', 'Finance', 'Business'];
  const years = [2025, 2024, 2023, 2022, 2021];
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'case_study', label: 'Case Studies' },
    { value: 'report', label: 'Reports' },
    { value: 'tool', label: 'Tools & Data' },
    { value: 'download', label: 'Downloads' }
  ];

  // Fetch resources from Supabase
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setResources((data || []) as Resource[]);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = [...resources];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(query) ||
        resource.summary?.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
        resource.author?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource =>
        resource.categories.some(cat => 
          cat.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase().replace(/\s+/g, '-')
        )
      );
    }

    // Multi-category filter (sidebar)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(resource =>
        selectedCategories.some(cat =>
          resource.categories.some(resCat =>
            resCat.toLowerCase().replace(/\s+/g, '-') === cat.toLowerCase().replace(/\s+/g, '-')
          )
        )
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(resource => resource.year === parseInt(selectedYear));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        break;
      case 'a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [resources, searchQuery, selectedCategory, selectedCategories, selectedType, selectedYear, sortBy]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (selectedYear) params.set('year', selectedYear);
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
    
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedType, sortBy, selectedYear, selectedCategories, setSearchParams]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Resources - Knowledge Hub | Lesar Consults</title>
        <meta name="description" content="Access our comprehensive collection of health systems research, case studies, reports, and strategic frameworks from recent projects across Africa." />
        <meta name="keywords" content="health systems, research, case studies, reports, strategic planning, monitoring evaluation, mental health, Nairobi, Africa" />
        <link rel="canonical" href="https://lesarconsults.com/resources" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Resources - Knowledge Hub | Lesar Consults" />
        <meta property="og:description" content="Access our comprehensive collection of health systems research, case studies, reports, and strategic frameworks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lesarconsults.com/resources" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources - Knowledge Hub | Lesar Consults" />
        <meta name="twitter:description" content="Access our comprehensive collection of health systems research, case studies, reports, and strategic frameworks." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <ResourcesHero 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            types={types}
            years={years}
          />

          {/* Category Scroller */}
          <CategoryScroller 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <ResourceFilters
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    categories={categories.filter(cat => cat !== 'All')}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    years={years}
                  />
                </div>

                {/* Mobile Sort & Filter Bar */}
                <div className="lg:hidden mb-6">
                  <div className="flex items-center justify-center bg-gradient-to-r from-background via-muted/30 to-background border rounded-lg p-1">
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors rounded-md"
                    >
                      Sort & Filter
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-9">
                  {/* Results Count */}
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      {loading ? 'Loading...' : `${filteredResources.length} resources found`}
                    </p>
                  </div>

                  {/* Resource Grid */}
                  <div ref={gridRef} className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    {loading ? (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        ))}
                      </div>
                    ) : filteredResources.length > 0 ? (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredResources.map((resource, index) => (
                          <ResourceCard 
                            key={resource.id} 
                            resource={resource} 
                            index={index}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No resources found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollTop />

        {/* Mobile Sort & Filter Modal */}
        <SortFilterModal
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories.filter(cat => cat !== 'All')}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
          resultsCount={filteredResources.length}
        />
      </div>
    </>
  );
};

export default Resources;