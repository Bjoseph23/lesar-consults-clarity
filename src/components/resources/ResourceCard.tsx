import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Animate cards when they enter viewport
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150); // Stagger animation

    return () => clearTimeout(timer);
  }, [index]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'mental health':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'monitoring & evaluation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'finance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'business':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'case_study':
        return 'Case Study';
      case 'article':
        return 'Article';
      case 'report':
        return 'Report';
      case 'tool':
        return 'Tool';
      case 'download':
        return 'Download';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'case_study':
        return 'bg-accent/10 text-accent';
      case 'article':
        return 'bg-primary/10 text-primary';
      case 'report':
        return 'bg-secondary/10 text-secondary-foreground';
      case 'tool':
        return 'bg-muted text-muted-foreground';
      case 'download':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Link 
      to={`/resources/${resource.slug}`}
      className="group block h-full"
    >
      <article 
        className={cn(
          "bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer",
          "transform transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] bg-muted overflow-hidden">
          {resource.thumbnail_url ? (
            <img 
              src={resource.thumbnail_url} 
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-subtle">
              <div className="text-muted-foreground text-sm">Resource Thumbnail</div>
            </div>
          )}
          
          {/* Type Badge Overlay */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className={cn("text-xs font-medium shadow-sm", getTypeColor(resource.type))}
            >
              {getTypeLabel(resource.type)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          {resource.categories.length > 0 && (
            <div className="mb-3">
              <Badge 
                variant="outline" 
                className={cn("text-xs font-medium", getCategoryColor(resource.categories[0]))}
              >
                {resource.categories[0]}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {resource.title}
          </h3>

          {/* Summary */}
          {resource.summary && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
              {resource.summary}
            </p>
          )}

          {/* Meta & CTA */}
          <div className="flex items-center justify-between mt-auto">
            {/* Date & Author */}
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {new Date(resource.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short'
                })}
              </span>
              {resource.author && (
                <>
                  <span className="mx-2">•</span>
                  <span className="truncate max-w-24">{resource.author}</span>
                </>
              )}
            </div>
            
            {/* Read More CTA */}
            <div className="text-primary hover:text-primary/80 text-sm font-medium group/btn flex items-center">
              Read more
              <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ResourceCard;