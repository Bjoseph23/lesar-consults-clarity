import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, ToggleLeft, ToggleRight, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: string;
  featured: boolean;
  published_at: string;
  author: string;
  categories: string[];
  _count?: { downloads: number };
}

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Get download counts for each resource
      const resourcesWithCounts = await Promise.all(
        (data || []).map(async (resource) => {
          const { count } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('resource_id', resource.id);
          
          return {
            ...resource,
            _count: { downloads: count || 0 }
          } as Resource;
        })
      );

      setResources(resourcesWithCounts);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Error loading resources');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ featured: !currentFeatured })
        .eq('id', id);
      
      if (error) throw error;
      
      setResources(prev => 
        prev.map(resource => 
          resource.id === id 
            ? { ...resource, featured: !currentFeatured }
            : resource
        )
      );
      
      toast.success(`Resource ${!currentFeatured ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Error updating resource');
    }
  };

  const deleteResource = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setResources(prev => prev.filter(resource => resource.id !== id));
      toast.success('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Error deleting resource');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'case_study':
        return 'bg-green-100 text-green-800';
      case 'report':
        return 'bg-purple-100 text-purple-800';
      case 'tool':
        return 'bg-orange-100 text-orange-800';
      case 'download':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <>
      <Helmet>
        <title>Resources | Admin - Lesar Consults</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Resources</h1>
              <p className="text-muted-foreground">
                Manage your published resources and content
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/resources/new/edit">
                <Plus className="h-4 w-4 mr-2" />
                New Resource
              </Link>
            </Button>
          </div>

          {/* Resources Grid */}
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Card key={resource.id} className="group bg-white/95 border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base line-clamp-2 mb-2">
                          {resource.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getTypeColor(resource.type)}>
                            {getTypeLabel(resource.type)}
                          </Badge>
                          {resource.featured && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.summary}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>
                        {new Date(resource.published_at).toLocaleDateString()}
                      </span>
                      {resource.type === 'download' && (
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {resource._count?.downloads || 0} downloads
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                          asChild
                        >
                          <Link to={`/resources/${resource.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          asChild
                        >
                          <Link to={`/admin/resources/${resource.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => deleteResource(resource.id, resource.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleFeatured(resource.id, resource.featured)}
                      >
                        {resource.featured ? (
                          <ToggleRight className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/95 border-white/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Resources Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't created any resources yet. Get started by creating your first resource.
                </p>
                <Button asChild>
                  <Link to="/admin/resources/new/edit">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Resource
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminResources;