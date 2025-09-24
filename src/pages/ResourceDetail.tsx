import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTAInline from "@/components/CTAInline";
import ResourceCard from "@/components/resources/ResourceCard";
import SocialShare from "@/components/resources/SocialShare";
import GatedDownloadModal from "@/components/resources/GatedDownloadModal";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, Tag, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content_html: string;
  categories: string[];
  tags: string[];
  type: 'article' | 'case_study' | 'report' | 'tool' | 'download';
  thumbnail_url: string | null;
  file_url: string | null;
  author: string | null;
  published_at: string;
  year: number | null;
  featured: boolean;
  seo: any;
}

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [suggestedResources, setSuggestedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  const { elementRef: contentRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (slug) {
      fetchResource();
    }
  }, [slug]);

  useEffect(() => {
    // Scroll to top when resource changes
    window.scrollTo(0, 0);
  }, [resource]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      
      // Fetch main resource
      const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (resourceError) {
        console.error('Resource fetch error:', resourceError);
        throw resourceError;
      }
      
      console.log('Fetched resource data:', resourceData);
      
      if (resourceData) {
        setResource(resourceData as Resource);

        // Fetch suggested resources based on shared tags
        if (resourceData?.tags?.length > 0) {
          const { data: suggestedData, error: suggestedError } = await supabase
            .from('resources')
            .select('*')
            .neq('id', resourceData.id)
            .overlaps('tags', resourceData.tags)
            .limit(4);
          
          if (suggestedError) {
            console.error('Suggested resources error:', suggestedError);
          } else {
            setSuggestedResources((suggestedData || []) as Resource[]);
          }
        }
      } else {
        console.log('No resource found for slug:', slug);
      }
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resource?.type === 'download' && !resource.file_url) {
      // Gated download - open modal
      setIsDownloadModalOpen(true);
    } else if (resource?.file_url) {
      // Direct download
      window.open(resource.file_url, '_blank');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-foreground mb-4">Resource Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The resource you're looking for doesn't exist or has been moved.
              </p>
              <Button asChild>
                <Link to="/resources">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: resource.title }
  ];

  const currentUrl = `https://lesarconsults.com/resources/${resource.slug}`;

  return (
    <>
      <Helmet>
        <title>{resource.seo?.title || resource.title} | Lesar Consults</title>
        <meta name="description" content={resource.seo?.description || resource.summary} />
        <link rel="canonical" href={resource.seo?.canonical || currentUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={resource.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        {resource.thumbnail_url && (
          <meta property="og:image" content={resource.thumbnail_url} />
        )}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={resource.summary} />
        {resource.thumbnail_url && (
          <meta name="twitter:image" content={resource.thumbnail_url} />
        )}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": resource.title,
            "description": resource.summary,
            "author": {
              "@type": "Organization",
              "name": resource.author || "Lesar Consults"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Lesar Consults"
            },
            "datePublished": resource.published_at,
            "url": currentUrl,
            ...(resource.thumbnail_url && {
              "image": resource.thumbnail_url
            })
          })}
        </script>

        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lesarconsults.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": "https://lesarconsults.com/resources"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": resource.title,
                "item": currentUrl
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16 md:pt-20">
          <article className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbItems} />

              {/* Article Header */}
              <header ref={contentRef} className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : ''}`}>
                {/* Type Badge */}
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {getTypeLabel(resource.type)}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                  {resource?.title || 'No title available'}
                </h1>

                {/* Summary */}
                {resource.summary && (
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                    {resource.summary}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  {resource.author && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {resource.author}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(resource.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Categories */}
                {resource.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.categories.map((category) => (
                      <Badge 
                        key={category} 
                        variant="outline" 
                        className={getCategoryColor(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Download Button for Downloads */}
                {resource.type === 'download' && (
                  <div className="mb-6">
                    <Button onClick={handleDownload} size="lg" className="btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resource
                    </Button>
                  </div>
                )}
              </header>

              {/* Thumbnail */}
              {resource.thumbnail_url && (
                <div className="mb-8">
                  <img 
                    src={resource.thumbnail_url} 
                    alt={resource.title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-sm"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: resource.content_html }}
              />

              {/* Tags */}
              {resource.tags.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share */}
              <SocialShare 
                url={currentUrl}
                title={resource.title}
                description={resource.summary}
              />
            </div>
          </article>

          {/* CTA Section */}
          <CTAInline 
            title="Interested in Similar Projects?"
            description="Let's discuss how we can help with your specific needs in health systems and strategic planning."
            primaryButton={{
              text: "Start a Conversation",
              link: "/contact"
            }}
            variant="accent"
          />

          {/* Suggested Resources */}
          {suggestedResources.length > 0 && (
            <section className="py-16 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 text-center">
                  Related Resources
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {suggestedResources.map((suggestedResource, index) => (
                    <ResourceCard 
                      key={suggestedResource.id} 
                      resource={suggestedResource} 
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
        <ScrollTop />

        {/* Gated Download Modal */}
        <GatedDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          resource={resource}
        />
      </div>
    </>
  );
};

export default ResourceDetail;