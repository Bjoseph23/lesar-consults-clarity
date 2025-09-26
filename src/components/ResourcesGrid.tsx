import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ResourceCard from "@/components/resources/ResourceCard";

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

const ResourcesGrid = () => {
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { elementRef: gridRef, visibleItems } = useStaggeredAnimation(3, 150);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 3 resources from Supabase
  useEffect(() => {
    fetchLatestResources();
  }, []);

  const fetchLatestResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      setResources((data || []) as Resource[]);
    } catch (error) {
      console.error('Error fetching latest resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading skeleton while fetching
  if (loading) {
    return (
      <section ref={sectionRef} id="resources" className={`py-20 bg-background transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Latest Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, research findings, and strategic frameworks from our recent projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild className="btn-primary">
              <Link to="/resources">View All Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="resources" className={`py-20 bg-background transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Latest Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, research findings, and strategic frameworks from our recent projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No resources found.</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Button asChild className="btn-primary">
            <Link to="/resources">View All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;